import React, { useState, useEffect, useCallback } from "react";
// Import reusable UI components from other files.
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../user-profile-view/user-profile-view"; // User profile view

// Import layout and UI components from React-Bootstrap (for styling/layout).
import {
  Row,
  Col,
  Button as BootstrapButton,
  Spinner,
  Alert,
} from "react-bootstrap";

// Import routing components from React Router (to handle page navigation).
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Base URL to contact the movie database API.
const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

// Main component that controls the logic and display of the entire app.
export const MainView = () => {
  // Load saved login data (if available) from browser storage.
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // Define the app’s state: user info, token, movie list, loading status, and error messages.
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to log the user out and clear stored data.
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // Update the user data when changes happen in ProfileView.
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // When login is successful, save the token and user in state and localStorage.
  const onLoginSuccessHandler = useCallback((loggedInUser, receivedToken) => {
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
    }
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    }
    setError(null);
  }, []);

  // When token changes, fetch movies from the server and update the movie list.
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
      .then(async (response) => {
        if (response.status === 401) {
          handleLogout();
          throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
          const errorBodyText = await response.text();
          let errorMsg = `Failed to fetch movies (Status: ${response.status})`;
          try {
            const errData = JSON.parse(errorBodyText);
            errorMsg += ` - ${
              errData.message || errData.error || errorBodyText
            }`;
          } catch (e) {
            errorMsg += ` - ${errorBodyText || response.statusText}`;
          }
          throw new Error(errorMsg);
        }

        return response.json();
      })
      .then((data) => {
        // Normalize movie data to ensure consistent format.
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
                typeof actor === "object" && actor.Name
                  ? actor.Name
                  : typeof actor === "string"
                  ? actor
                  : "N/A"
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

  // This is the element actually rendered on the screen — it sets up routes and components.
  return (
    <BrowserRouter>
      {/* Always show the navigation bar */}
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Row className="justify-content-md-center mt-4">
        {/* Show login-related error if user is not logged in */}
        {error && !user && (
          <Col md={8}>
            {" "}
            <Alert variant="danger">{error}</Alert>{" "}
          </Col>
        )}

        <Routes>
          {/* Signup route — visible only when user is not logged in */}
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView onLoggedIn={onLoginSuccessHandler} />
                </Col>
              )
            }
          />

          {/* Login route — same logic as signup */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={onLoginSuccessHandler} />
                </Col>
              )
            }
          />

          {/* Profile route — shows user info and lets user update or deregister */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onUserUpdate={handleUserUpdate}
                  onLoggedOut={handleLogout}
                />
              )
            }
          />

          {/* Movie details route — shows info for one movie */}
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : loading && movies.length === 0 ? (
                <Col className="text-center mt-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="loading-message">Loading movie details...</p>
                </Col>
              ) : movies.length === 0 ? (
                <Col>
                  <Alert variant="info">
                    The movie list is currently empty.
                  </Alert>
                </Col>
              ) : (
                <MovieView movies={movies} />
              )
            }
          />

          {/* Main page — shows all movies as cards */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : loading ? (
                <Col className="text-center mt-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="loading-message">Loading movies...</p>
                </Col>
              ) : movies.length === 0 ? (
                <Col>
                  <Alert variant="info" className="empty-list-message">
                    No movies available.
                  </Alert>
                </Col>
              ) : error ? (
                <Col md={8}>
                  <Alert variant="danger">
                    <Alert.Heading>Error Loading Movies</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                </Col>
              ) : (
                // Display each movie in a card format
                movies.map((movie) => (
                  <Col
                    className="mb-4"
                    key={movie._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <MovieCard movie={movie} />
                  </Col>
                ))
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

MainView component controls app state, data fetching, and routing.

1. Initializes user, token, movies, loading, and error states from localStorage or defaults.  
   → Lines 19–29

2. `handleLogout` clears localStorage and resets user/token/error state.  
   → Lines 31–37

3. `handleUserUpdate` updates user state and localStorage on profile changes.  
   → Lines 39–42

4. `onLoginSuccessHandler` saves user and token on successful login, clears errors.  
   → Lines 44–54

5. `useEffect` watches `token`:  
   - If no token, clears movies and loading.  
   - Otherwise, fetches movies from API with Authorization header.  
   - Handles 401 errors by logging out, and other errors with detailed messages.  
   - Normalizes movie data structure before saving to state.  
   → Lines 56–104

6. Renders UI inside React Router:  
   - Always shows NavigationBar with user and logout handler.  
   - Displays error Alert if login-related errors occur.  
   - Defines routes for Signup, Login (redirect if logged in), Profile (redirect if not logged in), Movie details, and Main movie list.  
   - Uses conditional rendering for loading states, errors, empty lists, and redirects.  
   → Lines 106–169

7. Uses React Bootstrap for layout (Row, Col), feedback (Spinner, Alert), and buttons.  
   → Throughout JSX

This structure keeps the app’s flow and state tightly managed, with clear user auth logic, error handling, and dynamic routing.
*/
