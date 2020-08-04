import React, { useState, useEffect } from "react";
import axios from "../../axios";

import "./banner.css";
import requests from "../../request";

export default function Banner() {
  const [movie, setMovie] = useState("");

  useEffect(() => {
    async function makeRequest() {
      const response = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    makeRequest();
  }, []);

  const makePad = (str = movie?.overview) => {
    let n;
    try {
      n = str.split("").length;
    } catch (e) {}

    if (n > 150) {
      return str.substr(0, 150 - 1) + "...";
    } else {
      return str;
    }
  };

  return (
    <header
      className="app__banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${
          movie?.backdrop_path
        })`,
        backgroundPosition: "center center",
        backgroundSize: "cover"
      }}>
      {/* backgrounf-image */}
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My Playlist</button>
        </div>
        <h1 className="banner__description">{makePad(movie?.overview)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}
