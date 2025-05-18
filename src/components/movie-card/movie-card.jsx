import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    } else {
      e.target.style.display = 'none'; // Hide broken image icon if no fallback
    }
  };

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img
        src={movie.ImagePath || 'placeholder.jpg'} // Provide a default placeholder if ImagePath might be null/undefined
        alt={`Poster for ${movie.Title}`}
        onError={handleImageError}
        loading="lazy"
      />
      <h3>{movie.Title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string, 
    FallbackImagePath: PropTypes.string,
    
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};