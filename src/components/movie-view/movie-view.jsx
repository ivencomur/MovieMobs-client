import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={`Poster for ${movie.Title}`} style={{ maxWidth: '300px', height: 'auto' }} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre?.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director?.Name}</span>
      </div>
       <div>
        <span>Director Bio: </span>
        <span>{movie.Director?.Bio}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured ? "Yes" : "No"}</span>
      </div>
      <div>
        <span>Cast: </span>
        <span>{movie.Cast?.join(', ')}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};