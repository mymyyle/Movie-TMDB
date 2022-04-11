import React from "react";
import useData from "../hooks/useData";
import "../App.css";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];
function MovieSort() {
  let { sort: sortInput, setSort: setSortInput } = useData();

  return (
    <div>
      <select
        name="sortBy"
        value={sortInput}
        onChange={(e) => setSortInput(e.target.value)}
        className="sort-input"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MovieSort;
