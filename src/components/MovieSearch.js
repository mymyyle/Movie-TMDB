import React from "react";
import useData from "../hooks/useData";
import {  Stack } from "@mui/material";


function MovieSearch() {
  let {
    search: searchInput,
    setSearch: setSearchInput,
    submit: onSubmit,
  } = useData();

  return (
    <Stack direction="row" spacing={2}>
      <form onSubmit={onSubmit} className="search-form">
        <input
          name="searchQuery"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </Stack>
  );
}

export default MovieSearch;
