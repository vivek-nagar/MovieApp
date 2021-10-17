import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";

import MovieInfoComponent from "./components/MovieInfoComponent";

<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
></meta>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  height: 55px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
// const SearchBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 10px 10px;
//   border-radius: 6px;
//   margin-left: 20px;
//   width: 50%;
//   background-color: white;
// `;

// const SearchIcon = styled.img`
//   width: 32px;
//   height: 32px;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  justify-content: space-evenly;
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

    if(favourites.imdbID === movie.imdbID){
      console.log("hiii cvsd")
    }
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
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie.svg" />
          Movie App
        </AppName>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </Header>
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
          favouriteSnackBar="Added"
          onMovieSelect={onMovieSelect}
        />
      </MovieListContainer>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <MovieListContainer>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent="/remove.svg"
          favouriteSnackBar="Removed"
          onMovieSelect={onMovieSelect}
        />
      </MovieListContainer>
    </Container>
  );
};

export default App;
