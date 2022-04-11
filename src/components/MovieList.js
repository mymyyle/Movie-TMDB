import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, setCurrentPage, totalPage, currentPage }) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Grid container spacing={2} mt={1}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default MovieList;
