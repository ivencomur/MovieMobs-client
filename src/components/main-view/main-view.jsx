import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://iecm-movies-app-6966360ed90e.herokuapp.com/movies";

    setError(null);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`API Error ${response.status}: ${text || response.statusText}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            FallbackImagePath: movie.FallbackImagePath || null,
            Featured: movie.Featured || false,
            Cast: movie.Actors || movie.Cast || []
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  const handleMovieClick = (clickedMovie) => {
    setSelectedMovie(clickedMovie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return <div className="loading-message"> We are loading the movies... Please wait.</div>;
  }

  if (error) {
    return <div className="empty-list-message">Error fetching movies: {error}. Please try again later.</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={handleBackClick}
      />
    );
  }

  if (movies.length === 0) {
    return <div className="empty-list-message">No movies available at the moment.</div>;
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};

export default MainView;
