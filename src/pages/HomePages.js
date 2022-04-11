import React, { useState, useEffect } from "react";

import tmdbApi from "../app/tmdbApi";
import { Alert, Box, Container, Stack } from "@mui/material";

import LoadingScreen from "../components/LoadingScreen";
import MovieScroll from "../components/MovieScroll";
import MovieCarousel from "../components/MovieCarousel";

function HomePages() {
  const [moviesPop, setMoviesPop] = useState([]);
  const [moviesNPlaying, setMoviesNPlaying] = useState([]);
  const [moviesUC, setMoviesUC] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  useEffect(() => {
    const listPopular = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMoviePopular();
        setMoviesPop(response.results);
        setError1("");
      } catch (error) {
        setError1(error.message);
      }
      setLoading(false);
    };
    listPopular();
  }, []);

  useEffect(() => {
    const listNowPlaying = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMovieNPlaying();
        setMoviesNPlaying(response.results);
        setError2("");
      } catch (error) {
        setError2(error.message);
      }
      setLoading(false);
    };
    listNowPlaying();
  }, []);

  useEffect(() => {
    const listUpComing = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMovieUpComing();
        setMoviesUC(response.results);
        setError3("");
      } catch (error) {
        setError3(error.message);
      }
      setLoading(false);
    };
    listUpComing();
  }, []);

  useEffect(() => {
    const listTopRated = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMovieTopRated();
        setMoviesTop(response.results);
        setError4("");
      } catch (error) {
        setError4(error.message);
      }
      setLoading(false);
    };
    listTopRated();
  }, []);

  return (
    <Container
      sx={{ display: "flex", minHeight: "100vh", mt: 3, maxWidth: "100%" }}
    >
      <Stack sx={{ flexGrow: 1, maxWidth: "100%" }}>
        {/* <SearchContextProvider>
          <MovieSearch />
        </SearchContextProvider> */}

        {/* <SortContextProvider>
        <FormProvider methods={methods}>
          <MovieSort />
        </FormProvider>
      </SortContextProvider> */}

        <Box sx={{ position: "relative", height: 1 }} className="carousel">
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error4 ? (
                <Alert severity="error">{error4}</Alert>
              ) : (
                <Box>
                  <MovieCarousel movies={moviesTop} />
                </Box>
              )}
            </>
          )}
        </Box>

        <Box sx={{ position: "relative", height: 1 }} className="section">
          <h2 className="section-title"> Popular</h2>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error1 ? (
                <Alert severity="error">{error1}</Alert>
              ) : (
                <Box>
                  <MovieScroll movies={moviesPop} />
                </Box>
              )}
            </>
          )}
        </Box>

        <Box sx={{ position: "relative", height: 1 }} className="section">
          <h2 className="section-title">Now Playing</h2>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error2 ? (
                <Alert severity="error">{error2}</Alert>
              ) : (
                <Box>
                  <MovieScroll movies={moviesNPlaying} />
                </Box>
              )}
            </>
          )}
        </Box>

        <Box sx={{ position: "relative", height: 1 }} className="section">
          <h2 className="section-title">Up Coming</h2>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error3 ? (
                <Alert severity="error">{error3}</Alert>
              ) : (
                <Box>
                  <MovieScroll movies={moviesUC} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePages;
