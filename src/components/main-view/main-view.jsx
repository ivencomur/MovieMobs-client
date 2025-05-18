import React, { useState, useEffect, useCallback } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false); // Default to false, true when fetching
  const [error, setError] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setMovies([]);
    setSelectedMovie(null);
    setError(null);
  }, []);

  const onLoginSuccessHandler = useCallback((loggedInUser, receivedToken) => {
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
    }
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []); // Removed setToken, setUser from deps as they are stable

  useEffect(() => {
    if (!token) {
      setMovies([]); // Clear movies if there's no token
      setLoading(false); // Ensure loading is false if no token
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 401) {
          handleLogout(); // Token is invalid or expired
          throw new Error("Your session has expired. Please log in again.");
        }
        if (!response.ok) {
          return response.text().then((text) => {
            let errorMsg = `Failed to fetch movies. Status: ${response.status}`;
            try {
              const errBody = JSON.parse(text); // Try to parse error from backend
              errorMsg += ` - ${errBody.error || errBody.message || text}`;
            } catch (e) {
              // Fallback if response is not JSON
              errorMsg += ` - ${text || response.statusText}`;
            }
            throw new Error(errorMsg);
          });
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title || movie.title,
          Description: movie.Description || movie.description,
          Genre: movie.Genre, // Assuming Genre object is returned directly
          Director: movie.Director, // Assuming Director object is returned directly
          ImagePath: movie.ImagePath || movie.imagePath,
          Featured: movie.Featured || movie.featured || false,
          Cast: movie.Actors
            ? movie.Actors.map((actor) => actor.name || "N/A")
            : [], // Extract names if Actors is an array of objects
        }));
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        setError(err.message || "Failed to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, handleLogout]);

  const handleMovieClick = (movie) => setSelectedMovie(movie);
  const handleBackClick = () => setSelectedMovie(null);

  if (!token) {
    return <LoginView onLoggedIn={onLoginSuccessHandler} />;
  }

  if (loading) {
    // Simplified loading state
    return (
      <div>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <div className="loading-message">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      </div>
    );
  }

  if (movies.length === 0) {
    // After loading, if still no movies
    return (
      <div>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        {user && <p className="welcome-message">Welcome, {user.username}!</p>}
        <div className="empty-list-message">
          No movies available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div>
      {user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
      {user && (
        <h2 className="welcome-message">
          Welcome, {user.username}! Explore movies:
        </h2>
      )}
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MainView;
