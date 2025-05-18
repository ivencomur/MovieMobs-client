import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    } else {
      e.target.style.backgroundColor = "#f0f0f0"; // Placeholder color
      e.target.alt = "Image not available";
    }
  };

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img
        src={
          movie.ImagePath ||
          "https://via.placeholder.com/200x300.png?text=No+Image"
        }
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
