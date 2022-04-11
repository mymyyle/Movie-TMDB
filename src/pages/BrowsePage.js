import { Alert, Box, Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import FilterGenres from "../components/FilterGenres";
import MovieSearch from "../components/MovieSearch";
import { FormProvider } from "../components/form";
import MovieSort from "../components/MovieSort";
import { useForm } from "react-hook-form";
import useData from "../hooks/useData";

const defaultValues = {
  sortBy: "",
  searchQuery: "",
};

function BrowsePage() {
  const methods = useForm({ defaultValues });
  const movies = useData().movies;
  const currentPage = useData().currentPage;
  const setCurrentPage = useData().setCurrentPage;
  const totalPage = useData().totalPage;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMoviesList = async () => {
    setLoading(true);

    try {
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMoviesList();
  }, [currentPage]);

  return (
    <Container sx={{ height: "100%", mt: 3 }}>
      <Stack spacing={2}>
        <Stack>
          <FilterGenres />
        </Stack>

        <Stack>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <MovieSearch />
            </Grid>
            <Grid item xs={4}>
              <FormProvider methods={methods}>
                <MovieSort />
              </FormProvider>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <MovieList
              movies={movies}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default BrowsePage;
