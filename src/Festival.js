import "./posterpage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useRef } from "react";
import { exportAsImage } from "./exportAsImage";
import ScaleLoader from "react-spinners/ScaleLoader";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export default function Festival() {
  const [artists, useArtists] = useState("");
  const [name, useName] = useState("");
  const [country, useCountry] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");
    fetchArtists(token);
    fetchUserData(token);
    // eslint-disable-next-line
  }, []);
  const fetchArtists = async (userToken) => {
    try {
      // eslint-disable-next-line
      if (!userToken) throw "No token available";
      const url =
        "https://api.spotify.com/v1/me/top/artists?limit=24&time_range=medium_term";
      const req = await fetch(url, {
        headers: {
          // prettier-ignore
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      // eslint-disable-next-line
      if (req.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchArtists(newToken);
        }
        return;
      }
      const result = await req.json();
      if (result["items"]) {
        const artistsNames = result.items.map((item) => item.name);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useArtists(artistsNames);
      }
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
          "Authorization": `Bearer ${userToken}`,
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
        return json["access_token"];
      }
    } catch (e) {
      console.error(e);
    }
  }

  function DisplayArtists(props) {
    return [...props.artistsArray].slice(2).map((item, idx) => {
      if (idx === props.artistsArray.length - 2) {
        return <span key={`${item}${idx}`}> {item} </span>;
      } else {
        return <span key={`${item}${idx}`}> {item}⠀ </span>;
      }
    });
  }

  function DisplayHeadliners(props) {
    return <h1> {[...props.artistsArray].slice(0, 2).join(" · ")} </h1>;
  }
  const exportRef = useRef();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  setTimeout(() => {
    const primaryContainer = document.getElementById("primary-container");
    primaryContainer.style.opacity = 1;
  }, 2000);
  return (
    <div className="general-container">
      {" "}
      {loading ? (
        <ScaleLoader color={"#0c9374"} loading={loading} size={200} />
      ) : (
        <section id="primary-container" className="primary-container">
          {" "}
          <div
            className="poster-container"
            id="poster-container"
            ref={exportRef}
          >
            {" "}
            <div className="festival-title">
              {" "}
              <h1>
                {" "}
                {name}
                'S <br />
                FEST{" "}
              </h1>{" "}
            </div>{" "}
            <div className="date-location">
              {" "}
              <span> 10 11 12 </span> <span> DEC 2022 </span>{" "}
              <span> {country} </span>{" "}
            </div>{" "}
            <div className="headliners">
              {" "}
              <DisplayHeadliners artistsArray={artists} />{" "}
            </div>{" "}
            <div className="space-line" />{" "}
            <div className="down-arrow">
              {" "}
              <i className="fa-solid fa-angles-down" />{" "}
            </div>{" "}
            <div className="artist-list">
              {" "}
              <DisplayArtists artistsArray={artists} />{" "}
            </div>{" "}
            <div className="footer">
              {" "}
              <span> {name} </span>{" "}
              <span> BY 4EROSOL | GET YOURS AT LINEUPFEST.HEROKUAPP.COM </span>{" "}
            </div>{" "}
          </div>{" "}
          <button
            className="download-button"
            id="download-button"
            type="button"
            onClick={() => exportAsImage(exportRef.current, name)}
          >
            {" "}
            DOWNLOAD IMAGE{" "}
          </button>{" "}
          <span className="info-by">
            {" "}
            Data provided by{" "}
            <span className="spotify-logo">
              {" "}
              <img
                src="https://i.ibb.co/164z2Jb/Spotify-Logo-RGB-Green.png"
                alt="spotify-logo"
              />{" "}
            </span>{" "}
          </span>{" "}
        </section>
      )}{" "}
    </div>
  );
}
