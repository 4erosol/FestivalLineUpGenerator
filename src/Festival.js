/* eslint-disable */
import "./posterpage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useRef } from "react";
import { exportAsImage } from "./exportAsImage";
import choosePic from "./bkgrdSelector";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export default function Festival() {
  const [artists, useArtists] = useState("");
  const [name, useName] = useState("");
  const [country, useCountry] = useState("");
  const [bgImage, useBgImage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");
    fetchArtists(token);
    fetchUserData(token);
    useBgImage(choosePic());
  }, []);
  const fetchArtists = async (userToken) => {
    try {
      if (!userToken) throw "No token available";
      const url =
        "https://api.spotify.com/v1/me/top/artists?limit=24&time_range=long_term";
      const req = await fetch(url, {
        headers: {
          // prettier-ignore
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

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
        useName(json["display_name"]);

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

  return (
    <div className="general-container">
      <section id="primary-container" className="primary-container">
        {" "}
        <div
          className="poster-container"
          id="poster-container"
          style={{ backgroundImage: `url(${bgImage})` }}
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
        <div className="buttons">
          <button
            className="download-button"
            id="download-button"
            type="button"
            onClick={() => exportAsImage(exportRef.current, name)}
          >
            {" "}
            DOWNLOAD IMAGE{" "}
          </button>
          <button
            className="reload-button"
            id="reload-button"
            type="button"
            onClick={() => useBgImage(choosePic())}
          >
            {" "}
            CHANGE BACKGROUND{" "}
          </button>{" "}
        </div>
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
    </div>
  );
}
