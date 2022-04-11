import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import apiConfig from "../app/apiConfig";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";
import noImage from "../no-image.png";

import { Box } from "@mui/system";

function ProductCard({ movie }) {
  const backgroundImage = apiConfig.originalImage(movie.backdrop_path);
  const posterImage = apiConfig.w500Image(movie.poster_path);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { movieIds, addMovie, removeMovie } = useFavorite();
  const isAddedInFavorite = movieIds?.includes(movie.id);

  return (
    <Card className="movie-card">
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="140"
          className="card-media"
          image={
            movie.poster_path
              ? posterImage
              : movie.backdrop_path
              ? backgroundImage
              : noImage
          }
          alt={movie.title}
        />
      </CardActionArea>
      <CardContent>
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          width="100%"
        >
          <Typography gutterBottom variant="body" component="div">
            {movie.title}
          </Typography>

          {isAuthenticated ? (
            <>
              {isAddedInFavorite ? (
                <IconButton
                  size="large"
                  sx={{ color: "black" }}
                  onClick={() => removeMovie(movie.id)}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  sx={{ color: "black" }}
                  onClick={() => addMovie(movie.id)}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
