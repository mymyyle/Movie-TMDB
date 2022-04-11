import { createContext, useReducer, useEffect } from "react";

import useAuth from "../hooks/useAuth";

const initialState = {
  isInitialized: false,
  movieIds: [],
};

const FavoriteContext = createContext(initialState);

const INITIALIZATION = "INITIALIZATION";
const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";
const RESET_MOVIE = "RESET_MOVIE";
const LOCAL_STORAGE_USER_MOVIE_IDS = "userMovieIds";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZATION:
      return {
        ...state,
        isInitialized: true,
        movieIds: action.payload.movieIds,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movieIds: [...state.movieIds, action.payload.movieId],
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        movieIds: state.movieIds.filter((id) => id !== action.payload.movieId),
      };
    case RESET_MOVIE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    const localStorageUserMovieIds =
      localStorage.getItem(LOCAL_STORAGE_USER_MOVIE_IDS) || "{}";

    const userMovieIds = JSON.parse(localStorageUserMovieIds);

    if (user && userMovieIds[user.username]) {
      const userMovieIds = JSON.parse(localStorageUserMovieIds);
      dispatch({
        type: INITIALIZATION,
        payload: { movieIds: userMovieIds[user.username] },
      });
    } else {
      dispatch({
        type: INITIALIZATION,
        payload: { movieIds: [] },
      });
    }
  }, [user]);

  const addMovie = (movieId) => {
    dispatch({ type: ADD_MOVIE, payload: { movieId } });

    const localStorageMovieIds = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_MOVIE_IDS) || "{}"
    );

    const movieIds = localStorageMovieIds[user.username] || [];

    window.localStorage.setItem(
      LOCAL_STORAGE_USER_MOVIE_IDS,
      JSON.stringify({
        ...localStorageMovieIds,
        [user.username]: [...movieIds, movieId],
      })
    );
  };

  const removeMovie = (movieId) => {
    dispatch({ type: REMOVE_MOVIE, payload: { movieId } });

    const localStorageMovieIds = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_MOVIE_IDS) || "{}"
    );

    const movieIds = localStorageMovieIds[user.username] || [];

    window.localStorage.setItem(
      LOCAL_STORAGE_USER_MOVIE_IDS,
      JSON.stringify({
        ...localStorageMovieIds,
        [user.username]: movieIds.filter((id) => id !== movieId),
      })
    );
  };

  const resetMovie = () => {
    dispatch({ type: RESET_MOVIE });
  };

  return (
    <FavoriteContext.Provider
      value={{ ...state, addMovie, removeMovie, resetMovie }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
