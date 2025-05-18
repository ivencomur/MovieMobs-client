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

  const onLoginSuccessHandler = useCallback(
    (loggedInUser, receivedToken) => {
      if (receivedToken) {
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
      }
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    },
    [setToken, setUser]
  );

  useEffect(() => {
    if (!token) {
      setMovies([]);
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
          Genre: movie.Genre || movie.genre,
          Director: movie.Director || movie.director,
          ImagePath: movie.ImagePath || movie.imagePath,
          Featured: movie.Featured || movie.featured || false,
          Cast: movie.Actors || movie.actors || [],
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

  if (loading && movies.length === 0) {
    return (
      <div>
        {user && <button onClick={handleLogout}>Logout</button>}
        <div>Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {user && <button onClick={handleLogout}>Logout</button>}
        <div>Error: {error}</div>
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        {user && <button onClick={handleLogout}>Logout</button>}
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      </div>
    );
  }

  if (movies.length === 0 && !loading) {
    return (
      <div>
        {user && <button onClick={handleLogout}>Logout</button>}
        {user && <p>Welcome, {user.username}!</p>}
        <div>No movies available at the moment.</div>
      </div>
    );
  }

  return (
    <div>
      {user && (
        <button
          onClick={handleLogout}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Logout
        </button>
      )}
      {user && (
        <h2 style={{ textAlign: "center" }}>
          Welcome, {user.username}! Explore movies:
        </h2>
      )}
      <div
        className="movies-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
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
