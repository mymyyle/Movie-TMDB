import React, { useState, createContext, useEffect } from "react";
import tmdbApi from "../app/tmdbApi";

let movies = [];
const contextdata = {
  movies: movies,
  currentPage: "",
  totalPage: "",
  setCurrentPage: () => {},
  search: "",
  sort: "",
  filter: "",
  setSearch: () => {},
  setSort: () => {},
  setFilter: () => {},
};

// const searchURL =
//   "https://api.themoviedb.org/3/search/multi?api_key=7f43d469e4b124bca9e8aa24fe508eaf";

export const DataContext = createContext(contextdata);
const MAX_PAGES = 500;

function DataContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [searchDataInput, setSearchDataInput] = useState("");
  const [sortDataInput, setSortDataInput] = useState("");
  const [filterDataInput, setFilterDataInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);

  console.log("loading", loading);

  const getData = async (params = {}) => {
    try {
      const fetchParams = {
        page: currentPage,
        sort_by: sortDataInput,
        with_genres: filterDataInput,
        ...params,
      };
      setSearchDataInput("");
      const response = await tmdbApi.getMovies(fetchParams);
      setMovies(response.results);
      setTotalPage(
        response.total_pages > MAX_PAGES ? MAX_PAGES : response.total_pages
      );

      if (params.page && currentPage !== params.page) {
        setCurrentPage(params.page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isSearch ? searchFirm() : getData();
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, [sortDataInput, filterDataInput]);

  const searchFirm = async (params = {}) => {
    try {
      const fetchParams = {
        page: currentPage,
        query: searchDataInput,
        ...params,
      };
      setIsSearch(true);
      const response = await tmdbApi.getMovieSearch(fetchParams);
      console.log(response);
      setMovies(response.results);
      setTotalPage(
        response.total_pages > MAX_PAGES ? MAX_PAGES : response.total_pages
      );

      if (params.page && currentPage !== params.page) {
        setCurrentPage(params.page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    searchFirm();
  };

  return (
    <DataContext.Provider
      value={{
        movies: movies,
        currentPage: currentPage,
        totalPage: totalPage,
        setCurrentPage: setCurrentPage,
        search: searchDataInput,
        sort: sortDataInput,
        filter: filterDataInput,
        setSearch: setSearchDataInput,
        setSort: setSortDataInput,
        setFilter: setFilterDataInput,
        submit: handleSubmit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
