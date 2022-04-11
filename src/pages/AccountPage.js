import { Grid } from "@mui/material";
import React from "react";
import useFavorite from "../hooks/useFavorite";
import MovieCard from "../components/MovieCard";
import useAuth from "../hooks/useAuth";

function AccountPage() {
  //const movies = Object.values(useFavorite().idList);
  const { movieIds } = useFavorite();
  console.log("movieIds", movieIds);
  const userName = useAuth().user.username;
  console.log(userName);
  return (
    <>
      <h1 className="favorite-title"> {userName}'s Favorite Movies List</h1>
      <Grid container spacing={2} mt={1}>
        {movieIds?.map((movie) => (
          <Grid item key={movie.id} xs={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AccountPage;
