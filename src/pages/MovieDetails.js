import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../app/tmdbApi";
import LoadingScreen from "../components/LoadingScreen";
import MovieTrailer from "../components/MovieTrailer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";

import useFavorite from "../hooks/useFavorite";
import useAuth from "../hooks/useAuth";

import "./MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  const { isAuthenticated } = useAuth();
  const { movieIds, addMovie, removeMovie } = useFavorite();

  const isAddedInFavorite = movieIds?.includes(movieId);

  useEffect(() => {
    const getMoveDetails = async () => {
      const response = await tmdbApi.getMovieDetails(movieId);
      setMovie(response);
    };
    getMoveDetails();
  }, []);

  if (!movie) return <LoadingScreen />;

  const movieImg = `https://image.tmdb.org/t/p/original${
    movie.backdrop_path || movie.poster_path
  }`;

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${movieImg})`,
        }}
      />
      <div className="movie-page">
        <div className="movie-details">
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="img"
            />
          </div>

          <div className="movie-content">
            <div className="movie-title">
              <h1 className="title" style={{ display: "inline-block" }}>
                {movie.title || movie.name}
              </h1>
              {isAuthenticated ? (
                <>
                  {isAddedInFavorite ? (
                    <IconButton
                      size="large"
                      sx={{ color: "white" }}
                      onClick={() => removeMovie(movieId)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      sx={{ color: "white" }}
                      onClick={() => addMovie(movieId)}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}
                </>
              ) : null}
            </div>

            <div className="genres">
              {movie.genres.map(({ name, id }) => (
                <span
                  key={id}
                  className="genres-item"
                  style={{ marginRight: "1rem" }}
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
        <MovieTrailer />
      </div>
    </>
  );
};

export default MovieDetails;
