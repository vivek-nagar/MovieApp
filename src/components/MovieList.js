import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

const CoverImage = styled.img`
  object-fit: cover;
  height: 220px;
  width: 160px;
  border: 10px;
  border-color: white;
  &:hover {
    transform: scale(1.1);
    transition: all 1s ease-out;
  }
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 5px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  align-items: center;
  text-align: center;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-transform: capitilize;
`;
const Close = styled.span`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  color: white;
  /* width: 180px; */
  /* background: white; */
  /* height: fit-content; */
  padding: 8px;
  /* border-radius: 50%; */
  cursor: pointer;
  opacity: 0.8;
`;
const FavImage = styled.img`
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
const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const FavouriteSnackBar = props.favouriteSnackBar;

  const [open, setOpen] = React.useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const handleClickEvent = () => {
    setOpen(true);
  };
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="MovieContainer">
          <CoverImage
            src={movie.Poster}
            alt="movie"
            onClick={() => {
              props.onMovieSelect(movie.imdbID);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          <Close onClick={() => props.handleFavouritesClick(movie)}>
            <div className="movieName">{movie.Title}</div>
            <Button
              style={{ outline: "none" }}
              onClick={() => {
                props.handleFavouritesClick(movie);
                handleClickEvent();
              }}
            >
              <FavImage src={FavouriteComponent} alt="remove/add_fav" />
            </Button>
            <Snackbar
              anchorOrigin={{
                horizontal: "center",
                vertical: "bottom",
              }}
              open={open}
              autoHideDuration={1000}
              message={`Movie ${FavouriteSnackBar} favirate`}
              onClose={handleToClose}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="primary"
                    onClick={handleToClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </Close>
        </div>
      ))}
    </>
  );
};

export default MovieList;
