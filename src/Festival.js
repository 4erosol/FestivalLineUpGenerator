import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export default function Festival() {
  const [artists, useArtists] = useState("");
  const [name, useName] = useState("");
  const [country, useCountry] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/home");
    fetchArtists(token);
    fetchUserData(token);
    // eslint-disable-next-line
  }, []);

  const fetchArtists = async (userToken) => {
    try {
      // eslint-disable-next-line
      if (!userToken) throw "No token available";
      const url =
        "https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term";
      const req = await fetch(url, {
        headers: {
          // prettier-ignore
          "Authorization":`Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(req.status);

      // eslint-disable-next-line
      if (req.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchArtists(newToken);
        }
      }
      const result = await req.json();

      const artistsNames = result.items.map((item) => item.name);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useArtists(artistsNames);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchUserData = async (userToken) => {
    try {
      const url = "https://api.spotify.com/v1/me";
      const req = await fetch(url, {
        method: "GET",
        headers: {
          // prettier-ignore
          "Authorization":`Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      const json = await req.json();
      if (json["display_name"]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useName(json["display_name"]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCountry(json["country"]);
      }
    } catch (e) {}
  };
  async function refreshToken() {
    try {
      const refresh = localStorage.getItem("refreshToken");
      let details = {
        grant_type: "refresh_token",
        refresh_token: refresh,
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
        return json["access_token"];
      }
    } catch (e) {
      console.error(e);
    }
  }
  function displayArtists(artistsArray) {
    return <p>{[...artistsArray].slice(2, artistsArray.lenght).join(" · ")}</p>;
  }

  function displayHeadliners(artistsArray) {
    const artistsFeatured = [...artistsArray].slice(0, 2);
    return <h1>{artistsFeatured.join(" · ")}</h1>;
  }
  console.log(name);

  {artistsArray.map(artists) => { return (<span> artists </span>) } };

  return (
    <section className="poster-container">
      <div className="festival-title">
        <h1>
          {name}'S <br />
          FEST
        </h1>
      </div>
      <div className="date-location">
        <span>10 11 12</span>
        <span>DEC 2022</span>
        <span> {country}</span>
      </div>
      <div className="headliners">{displayHeadliners(artists)}</div>
      <div className="space-line" />
      <div className="down-arrow">
        <i className="fa-solid fa-arrow-down" />
      </div>
      <div className="artist-list">{displayArtists(artists)}</div>
      <div className="footer">
        <span>{name}</span>
        <span>BY 4EROSOL | GET YOURS AT LINEUPFEST.HEROKUAPP.COM</span>
      </div>
    </section>
  );
}
