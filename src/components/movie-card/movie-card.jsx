import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
       <img src={movie.ImagePath} alt={`Poster for ${movie.Title}`} loading="lazy" />
       <h3>{movie.Title}</h3>
    </div>
  );
};