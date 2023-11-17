import React, { useState, lazy, Suspense } from "react";
import { getMovies } from "../api";
import { useQuery } from "react-query";
const FilteredMovieList = lazy(() => import("../components/filteredMovieList"));
const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

  if (isLoading) {
    return <h3>Waiting for data </h3>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;
  const filterChange = (event) => {
    event.preventDefault();
    setSearchText(event.target.value.toLowerCase());
  };
  const filteredList = movies.filter((movie) => {
    const title = movie.title.toLowerCase();
    return title.search(searchText) !== -1;
  });

  return (
    <>
      <h1>Movie List</h1>
      <input type="text" placeholder="Search" onChange={filterChange} />
      <button
        className="actionbutton"
        onClick={(event) => setShowMovies(!showMovies)}
      >
        Show Movies
      </button>
      <Suspense fallback={<h1>Building list</h1>}>
        {showMovies ? <FilteredMovieList list={filteredList} /> : null}
      </Suspense>
    </>
  );
};

export default HomePage;
