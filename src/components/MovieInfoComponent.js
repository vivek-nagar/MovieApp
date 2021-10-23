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

  color: blue;
  border-radius: 16px;
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
          <div className="coInfoColumn">
            <div className="coMovieName">
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </div>
            <div clasName="coMovieInfo">
              <span> IMDB Rating:</span> <span>{movieInfo?.imdbRating}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Year: </span>
              <span>{movieInfo?.Year}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Language:</span> <span>{movieInfo?.Language}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Rated:</span> <span>{movieInfo?.Rated}</span>
            </div>
            <div clasName="coMovieInfo">
              <span> Released:</span> <span>{movieInfo?.Released}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Runtime: </span> <span>{movieInfo?.Runtime}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Genre:</span> <span>{movieInfo?.Genre}</span>
            </div>
            <div clasName="coMovieInfo">
              <span>Director:</span> <span>{movieInfo?.Director}</span>
            </div>
            <div clasName="coMovieInfo">
              <span> Actors: </span> <span>{movieInfo?.Actors}</span>
            </div>
            {/* <div clasName='coMovieInfo'>
              Plot: <span>{movieInfo?.PlotShort}</span>
            </div> */}
          </div>
          <Close onClick={() => props.onMovieSelect()}>
            <CloseIcon src="./closedec.svg" alt="close" />
          </Close>
        </>
      ) : (
        <span>"Loading..."</span>
      )}
    </Container>
  );
};
export default MovieInfoComponent;
