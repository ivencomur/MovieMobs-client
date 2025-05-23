
import React, { useState, useEffect, useCallback } from "react";
// Import child components.
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar"; // Import NavigationBar
// Import React Bootstrap components.
import {
  Row,
  Col,
  Button as BootstrapButton,
  Spinner,
  Alert,
} from "react-bootstrap";
// Import React Router components.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Define the base URL for the movie API.
const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

export const MainView = () => {
  // Attempt to load user and token from localStorage on initial render.
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State variables for user, token, movies, loading, and errors.
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // selectedMovie state is removed; routing handles which movie to view.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // showSignup state is removed; navigation to signup is handled by its route.

  // Callback function to handle user logout.
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    // movies and selectedMovie will clear or become irrelevant due to logged-out state.
    setError(null);
  }, []);

  // Callback function for successful login.
  const onLoginSuccessHandler = useCallback((loggedInUser, receivedToken) => {
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
    }
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    }
    setError(null); // Clear any previous login/signup errors
  }, []);

  // useEffect hook to fetch movies when the token changes.
  useEffect(() => {
    if (!token) {
      setMovies([]); // Clear movies if no token
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
          handleLogout(); // If unauthorized, log out
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
        // Map API data to the structure expected by components.
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id, // Crucial for keys and route parameters
          Title: movie.Title || movie.title,
          Description: movie.Description || movie.description,
          Genre: movie.Genre, // Assumes Genre is an object { name, description } or string
          Director: movie.Director, // Assumes Director is an object { name, bio } or string
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
  }, [token, handleLogout]); // Dependencies: token and handleLogout

  return (
    // BrowserRouter enables routing capabilities for the components within it.
    <BrowserRouter>
      {/* NavigationBar provides consistent navigation across views. */}
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      {/* Main content area, typically within a Bootstrap Row for layout. */}
      <Row className="justify-content-md-center mt-4">
        {" "}
        {/* Added mt-4 for spacing below navbar */}
        {/* Routes define which component to render based on the current URL path. */}
        <Routes>
          {/* Route for the Signup page. */}
          <Route
            path="/signup"
            element={
              user ? (
                // If a user is already logged in, redirect them to the homepage.
                <Navigate to="/" />
              ) : (
                // Otherwise, show the SignupView.
                <Col md={5}>
                  <SignupView onLoggedIn={onLoginSuccessHandler} />
                </Col>
              )
            }
          />

          {/* Route for the Login page. */}
          <Route
            path="/login"
            element={
              user ? (
                // If a user is logged in, redirect to homepage.
                <Navigate to="/" />
              ) : (
                // Otherwise, show the LoginView.
                <Col md={5}>
                  <LoginView onLoggedIn={onLoginSuccessHandler} />
                </Col>
              )
            }
          />

          {/* Route for displaying a single movie's details. */}
          {/* ":movieId" is a URL parameter that will hold the ID of the movie. */}
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                // If no user is logged in, redirect to the login page.
                // `replace` ensures the login page doesn't get added to history if redirected.
                <Navigate to="/login" replace />
              ) : loading && movies.length === 0 ? (
                // If loading initial movie data for the first time.
                <Col className="text-center mt-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="loading-message">Loading movie details...</p>
                </Col>
              ) : movies.length === 0 ? (
                // If movie list is empty (and not loading).
                <Col>
                  <Alert variant="info">
                    The movie list is currently empty.
                  </Alert>
                </Col>
              ) : (
                // If user is logged in and movies are available, show MovieView.
                // Pass the full movies array so MovieView can find the correct movie.
                <MovieView movies={movies} />
              )
            }
          />

          {/* Route for the main page (homepage), displaying the list of all movies. */}
          <Route
            path="/"
            element={
              !user ? (
                // If no user, redirect to login.
                <Navigate to="/login" replace />
              ) : loading ? (
                // Show a spinner while movies are loading.
                <Col className="text-center mt-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="loading-message">Loading movies...</p>
                </Col>
              ) : movies.length === 0 ? (
                // If no movies are found after loading.
                <Col>
                  <Alert variant="info" className="empty-list-message">
                    No movies available at the moment.
                  </Alert>
                </Col>
              ) : error ? (
                // Display error if fetching movies failed
                <Col md={8}>
                  <Alert variant="danger">
                    <Alert.Heading>Error Loading Movies</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                </Col>
              ) : (
                // If user is logged in and movies are loaded, display them.
                // Use responsive column sizes for the movie cards.
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
This MainView component serves as the primary container for the application,
managing overall application state like user authentication, movie data, loading, and errors.
With the integration of React Router:
- It uses `<BrowserRouter>` to enable client-side navigation.
- A `<NavigationBar>` is included for consistent navigation.
- `<Routes>` and `<Route>` components define the application's different "pages" or views:
    - `/signup` for user registration.
    - `/login` for user login.
    - `/movies/:movieId` for displaying detailed information about a single movie. The `:movieId` part
      is a dynamic segment that captures the movie's ID from the URL.
    - `/` (the root path) for displaying the main list of movies to logged-in users.
- The `<Navigate>` component handles redirection, for example, protecting routes by sending
  unauthenticated users to the login page, or redirecting logged-in users away from login/signup pages.
- State variables like `selectedMovie` and `showSignup` are removed, as their functionality is
  now handled by the routing system (i.e., the current URL determines the view).
- The `movies` array is fetched and passed down to `MovieView` which then uses the URL parameter
  (`movieId`) to find and display the specific movie.
- Movie cards are rendered in a responsive grid on the homepage.
*/
