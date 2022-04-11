import React, { useEffect, useState } from "react";
import tmdbApi from "../app/tmdbApi";
import useData from "../hooks/useData";

const FilterGenres = () => {
  const [genres, setGenres] = useState();
  let { filter: filterInput, setFilter: setFilterInput } = useData();
  const [idSelected, setIdSelected] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await tmdbApi.getMovieGenres();
        setGenres(response.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="genres">
      <button
        key="clear-filter"
        value="clear-filter"
        onClick={() => {
          setFilterInput("");
          setIdSelected(null);
        }}
        className="genres-item"
      >
        All Genres
      </button>

      {genres?.map(({ name, id }) => (
        <button
          key={id}
          value={filterInput}
          onClick={() => {
            setFilterInput(id);
            setIdSelected(id);
          }}
          className={idSelected !== id ? "genres-item" : "genres-item selected"}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default FilterGenres;
