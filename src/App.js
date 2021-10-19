import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import Heeader from "./header";
import "./index.css";

import MovieInfoComponent from "./components/MovieInfoComponent";

<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
></meta>;

// const Container = styled.div`
//   max-width: 100%;
//   margin-right: auto;
//   margin-left: auto;
//   padding-left: 15px;
//   padding-right: 15px;
//   background-color: black;
//   min-height: 100vh;
//   /* display: flex;
//   flex-direction: column;
//   background-color: black; */
// `;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// const Header = styled.div`
//   background-color: black;
//   color: white;
//   height: 55px;
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
//   align-items: center;
//   padding: 15px;
//   font-size: 25px;
//   font-weight: bold;
//   box-shadow: 0 3px 6px 0 #555;
// `;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: grid;
  /* grid-gap: 5px; */
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  /* display: flex; */
  /* flex-direction: row; */
  margin-right: 10px;
  margin-bottom: 10px;
  flex-wrap: nowrap;
  padding: 1rem;
`;
const Placeholder = styled.img`
  content: "No Search Result";
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const App = () => {
  <meta
    http-equiv="Content-Security-Policy"
    content="upgrade-insecure-requests"
  ></meta>;
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, onMovieSelect] = useState();
  const [darkMode, setDarkMOde] = useState(false);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${
      searchValue ? searchValue : "iron man"
    }&apikey=3231cf9b`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const onTextChange = (e) => {
    onMovieSelect("");
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="appContainer">
        <Heeader handelToggleDarkMode={setDarkMOde}>
          {/* <AppName>
            <MovieImage src="/movie.svg" />
            Movie App
          </AppName> */}
        </Heeader>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie}
            onMovieSelect={onMovieSelect}
          />
        )}
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Trending Now" />
        </div>
        <MovieListContainer>
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent="/add.svg"
            favouriteSnackBar="Added to"
            onMovieSelect={onMovieSelect}
          />
        </MovieListContainer>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Favorites" />
        </div>
        <MovieListContainer>
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent="/remove.svg"
            favouriteSnackBar="Removed from"
            onMovieSelect={onMovieSelect}
          />
        </MovieListContainer>
      </div>
    </div>
  );
};

export default App;
