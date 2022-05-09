import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function Home() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  // const REDIRECT_URI = "https://lineupfest.herokuapp.com/";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";
  const SCOPE = "user-read-private user-top-read";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  let navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    let token = window.localStorage.getItem("token");
    if (token) navigate("/festival");

    if (!token && code) {
      exchangeCodeForToken(code);
    }
    // eslint-disable-next-line
  }, []);
  async function exchangeCodeForToken(code) {
    try {
      let details = {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      const req = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
        body: formBody,
      });
      const json = await req.json();
      if (json["access_token"]) {
        localStorage.setItem("token", json["access_token"]);
        localStorage.setItem("refreshToken", json["refresh_token"]);
        navigate("/festival");
      }
    } catch (e) {
      console.error(e);
    }
  }

  function redirect() {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  }

  setTimeout(() => {
    const mainContainer = document.getElementById("main-container");
    mainContainer.style.opacity = 1;
  }, 100);

  return (
    <section id="main-container" className="main-container">
      <div className="inner-container">
        <div className="contents">
          <h1 className="title">
            CREATE <br />
            YOUR PERFECT MUSIC FESTIVAL <br />
            LINEUP <br />
            BASED ON YOUR FAVORITE <br />
            ARTISTS!
          </h1>
          <button
            className="login-button"
            id="login-button"
            type="button"
            onClick={redirect}
          >
            Log in with Spotify
          </button>
        </div>
        <span>made by 4erosol | 2022</span>
      </div>
    </section>
  );
}
