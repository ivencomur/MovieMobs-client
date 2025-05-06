import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    } else if (!movie.FallbackImagePath) {
      e.target.onerror = null;
    }
  };

  if (!movie) {
    return null;
  }

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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    FallbackImagePath: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
