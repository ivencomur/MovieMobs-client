import React, { useState, useEffect, useCallback } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
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
  }, []);

  useEffect(() => {
    if (!token) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 401) {
          handleLogout();
          throw new Error(
            "Your session may have expired. Please log in again."
          );
        }
        if (!response.ok) {
          return response.text().then((text) => {
            let errorMsg = `Failed to fetch movies. Status: ${response.status}`;
            try {
              const errBody = JSON.parse(text);
              errorMsg += ` - ${errBody.error || errBody.message || text}`;
            } catch (e) {
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
          Genre: movie.Genre,
          Director: movie.Director,
          ImagePath: movie.ImagePath || movie.imagePath,
          Featured: movie.Featured || movie.featured || false,
          Cast: movie.Actors
            ? movie.Actors.map((actor) =>
                typeof actor === "object" ? actor.name : actor
              )
            : [],
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
    return (
      <div>
        <LoginView onLoggedIn={onLoginSuccessHandler} />
        <SignupView onLoggedIn={onLoginSuccessHandler} />
      </div>
    );
  }

  if (loading) {
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
