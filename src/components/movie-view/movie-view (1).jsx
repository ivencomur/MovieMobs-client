import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  const handleImageError = (e) => {
    if (movie.FallbackImagePath && e.target.src !== movie.FallbackImagePath) {
      e.target.onerror = null;
      e.target.src = movie.FallbackImagePath;
    }
  };

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
            <span>{movie.Genre?.Name}</span>
        </div>
        <div className="movie-detail">
            <span>Director: </span>
            <span>{movie.Director?.Name}</span>
        </div>
       <div className="movie-detail">
            <span>Director Bio: </span>
            <span>{movie.Director?.Bio}</span>
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