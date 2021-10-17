import React, { useEffect, useState } from "react";
import Axios from "axios";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: space-evenly;
  border-bottom: 1px solid lightgray;
  align-content: center;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
  align-content: center;
  border: solid;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: White;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    /* opacity: 0.8; */
  }
`;
const MovieInfo = styled.span`
  display: flex;

  align-content: center;
  font-size: 16px;
  font-weight: 500;
  color: White;
  overflow: hidden;
  /* margin: 4px 0; */
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  background: black;
  height: 8px;
  width: 8px;
  padding: 8px;
  /* border-radius: 100%; */
  cursor: pointer;
`;
const CloseIcon = styled.img`
  object-fit: cover;
  height: 25px;
  width: 25px;

  /* border: 10px; */
  //border-color: white;
  &:hover {
    transform: scale(1.25);
    transition: all 1s ease-out;
    border: 2px;
  }
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=3231cf9b`
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}:  <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            {/* <MovieInfo>
              Plot: <span>{movieInfo?.PlotShort}</span>
            </MovieInfo> */}
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>
            <CloseIcon src="./closedec.svg" alt="close" />
          </Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
