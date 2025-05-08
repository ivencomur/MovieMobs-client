import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      console.warn(`Image failed for ${movie.Title}, using fallback.`);
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    } else {
       console.error(`Image failed for ${movie.Title}, no fallback available.`);
       e.target.style.display = 'none';
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    FallbackImagePath: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    Featured: PropTypes.bool,
    Cast: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
