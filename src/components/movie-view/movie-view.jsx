import React from "react";
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    } else if (!movie.FallbackImagePath) {
      e.target.onerror = null;
    }
  };

  if (!movie) {
    return (
      <div>
        <p>We´re sorry, the movie data is not available.</p>
        <button className="back-button" onClick={onBackClick}>Back</button>
      </div>
    );
  }

  return (
    <div className="movie-view">
      <div>
        <img
          className="movie-poster"
          src={movie.ImagePath}
          alt={`Poster for ${movie.Title}`}
          onError={handleImageError}
         />
      </div>
      <div className="movie-details">
        <div className="movie-detail">
            <span>Title: </span>
            <span>{movie.Title}</span>
        </div>
        <div className="movie-detail">
            <span>Description: </span>
            <span>{movie.Description}</span>
        </div>
        <div className="movie-detail">
            <span>Genre: </span>
            <span>{movie.Genre?.Name || 'N/A'}</span>
        </div>
        <div className="movie-detail">
            <span>Director: </span>
            <span>{movie.Director?.Name || 'N/A'}</span>
        </div>
       <div className="movie-detail">
            <span>Director Bio: </span>
            <span>{movie.Director?.Bio || 'N/A'}</span>
        </div>
        <div className="movie-detail">
            <span>Featured: </span>
            <span>{movie.Featured ? "Yes" : "No"}</span>
        </div>
        <div className="movie-detail">
            <span>Cast: </span>
            {Array.isArray(movie.Cast) && movie.Cast.length > 0 ? (
                 <ul className="cast-list">
                    {movie.Cast.map((actor, index) => (
                        <li key={index}>{actor}</li>
                    ))}
                </ul>
            ) : (
                <span>N/A</span>
            )}
        </div>
      </div>
      <button className="back-button" onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    FallbackImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string
    }),
    Featured: PropTypes.bool,
    Cast: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
