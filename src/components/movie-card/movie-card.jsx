// src/components/movie-card/movie-card.jsx
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      {movie.Title}
    </div>
  );
};