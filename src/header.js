import React from "react";
import "./index.css";
import styled from "styled-components";

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const Heeader = ({ handelToggleDarkMode }) => {
  return (
    <div className="header">
      <MovieImage src="/movie.svg" />
      <h1>Movie App</h1>

      <button
        onClick={() =>
          handelToggleDarkMode((previousDarkmode) => !previousDarkmode)
        }
        className="save"
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Heeader;
