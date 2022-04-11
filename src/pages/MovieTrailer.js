import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../app/tmdbApi";

const MovieTrailer = () => {
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState();
  const iframeRef = useRef(null);

  useEffect(() => {
    const getTrailer = async () => {
      const params = { language: "en-US" };
      const response = await tmdbApi.getMovieVideos(movieId, params);

      const trailer = response.results.find(
        (movie) => movie.type === "Trailer"
      );
      setTrailer(trailer);
    };

    getTrailer();
  }, []);

  useEffect(() => {
    if (!trailer) {
      return;
    }

    const height = (iframeRef.current.offsetWidth * 10) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [trailer]);

  if (!trailer) return null;

  return (
    <div className="trailer-container">
      <h2 className="trailer-name">{trailer.name}</h2>

      <div className="trailer">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          ref={iframeRef}
          width="100%"
          title="video"
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
