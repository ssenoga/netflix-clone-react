import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./row.css";

import axios from "../../axios";
const movieTrailer = require("movie-trailer");

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLarger }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  useEffect(() => {
    async function makeRequest() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    makeRequest();
  }, [fetchUrl]);

  const handleClick = (m) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(m.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {} /*console.log(err) */);
    }
  };

  return (
    <div className="row">
      {/* title */}
      {/* container with a list of scrolling images */}
      <h2>{title}</h2>
      <div className="row__images">
        {movies.map((movie) => (
          <img
            onClick={handleClick(movie)}
            key={movie.id}
            src={
              base_url + (isLarger ? movie.poster_path : movie.backdrop_path)
            }
            alt={movie.name}
            className={`row__image ${isLarger && "row__imageLarge"}`}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube videoId={trailerUrl} opts={opts} onReady={this._onReady} />
      )}
    </div>
  );
}
