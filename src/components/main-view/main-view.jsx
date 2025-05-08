import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const loginApiUrl =
      "https://iecm-movies-app-6966360ed90e.herokuapp.com/login";

    try {
      const response = await fetch(loginApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error ||
            `Login failed: ${response.statusText} (Status: ${response.status})`
        );
      }
      if (data.user && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setUsername("");
        setPassword("");
      } else {
        throw new Error(
          "Login successful, but token or user data was not received from the server."
        );
      }
    } catch (err) {
      console.error("Login error:", err.message || err); 
      setError(err.message || "An unexpected login error occurred."); 
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setMovies([]);
    setSelectedMovie(null);
    setError(null);
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      if (!user) {
        setMovies([]);
      }
      return;
    }

    setLoading(true);
    const moviesApiUrl =
      "https://iecm-movies-app-6966360ed90e.herokuapp.com/movies";
    setError(null);

    fetch(moviesApiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 401) {
          handleLogout();
          throw new Error(
            "Unauthorized: Your session may have expired. Please log in again."
          );
        }
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `API Error ${response.status}: ${text || response.statusText}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          // Ensure director and genre are objects before accessing their properties
          const directorName =
            movie.director && typeof movie.director === "object"
              ? movie.director.name
              : "N/A";
          const directorBio =
            movie.director && typeof movie.director === "object"
              ? movie.director.bio
              : "N/A";
          const genreName =
            movie.genre && typeof movie.genre === "object"
              ? movie.genre.name
              : "N/A";

          return {
            _id: movie._id,
            Title: movie.title,
            Description: movie.description,
            Genre: {
              // Keep Genre as an object for MovieView prop consistency
              name: genreName,
            },
            Director: {
              // Keep Director as an object
              name: directorName,
              bio: directorBio, // Include bio if needed by MovieView
            },
            ImagePath: movie.imagePath,
            FallbackImagePath: null, // Define if you have fallback logic
            Featured: movie.featured || false,
            Cast:
              movie.actors && Array.isArray(movie.actors)
                ? movie.actors.map((actor) =>
                    actor && actor.name ? actor.name : "N/A"
                  )
                : [],
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Failed to fetch movies (full error object):", err);
        // More specific error logging for fetch errors
        setError(err.message || "Failed to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, user]); // Removed handleLogout from dependency array as it doesn't change

  const handleMovieClick = (clickedMovie) => {
    setSelectedMovie(clickedMovie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  // --- Login View ---
  if (!token) {
    return (
      <div
        className="login-view"
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "50px auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <form onSubmit={handleLogin}>
          <h2>Login to MovieMobs</h2>
          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="loginUsername"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Username:{" "}
            </label>
            <input
              id="loginUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="loginPassword"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Password:{" "}
            </label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // --- Loading Movies View ---
  if (loading && movies.length === 0) {
    return (
      <div>
        <button
          onClick={handleLogout}
          className="logout-button"
          style={
            {
              /* Consider consistent logout button placement */
            }
          }
        >
          Logout
        </button>
        <div className="loading-message">
          We are loading the movies... Please wait.
        </div>
      </div>
    );
  }

  // --- Error Fetching Movies View ---
  if (error) {
    return (
      <div>
        <button
          onClick={handleLogout}
          className="logout-button"
          style={
            {
              /* Consider consistent logout button placement */
            }
          }
        >
          Logout
        </button>
        <div className="empty-list-message">
          There was an error fetching the movies: {error}. Please try again
          later or contact support.
        </div>
      </div>
    );
  }

  // --- Movie Details View ---
  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={handleLogout}
          className="logout-button"
          style={
            {
              /* Consistent placement */
            }
          }
        >
          Logout
        </button>
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      </div>
    );
  }

  // --- No Movies Available View ---
  if (movies.length === 0) {
    return (
      <div>
        <button
          onClick={handleLogout}
          className="logout-button"
          style={
            {
              /* Consistent placement */
            }
          }
        >
          Logout
        </button>
        <div className="empty-list-message">
          Sorry!, there are no movies available at the moment.
        </div>
        {user && (
          <p style={{ textAlign: "center" }}>Welcome, {user.username}!</p>
        )}
      </div>
    );
  }

  // --- Main Movies List View ---
  return (
    <div>
      <button
        onClick={handleLogout}
        className="logout-button"
        style={
          {
            /* Consistent placement */
          }
        }
      >
        Logout
      </button>
      {user && (
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Welcome, {user.username}! Let's explore our movies:
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
