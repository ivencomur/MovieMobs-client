import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null; 
      e.target.src = movie.FallbackImagePath;
    } else {
      
      e.target.src = '/path/to/generic/placeholder.jpg';
    }
  };

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img
        src={movie.ImagePath}
        alt={`Poster for ${movie.Title}`}
        onError={handleImageError}
        loading="lazy"
      />
      <h3>{movie.Title}</h3>
    </div>
  );
};