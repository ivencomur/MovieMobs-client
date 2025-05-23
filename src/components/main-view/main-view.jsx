import React, { useState, useEffect, useCallback } from "react";
// Import child components.
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// Import React Bootstrap components for layout and UI.
import {
  Row,
  Col,
  Button as BootstrapButton,
  Spinner,
  Alert,
} from "react-bootstrap";

// Define the base URL for the movie API.
const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

export const MainView = () => {
  // Attempt to load user and token from localStorage on initial render.
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State variables for user, token, movies, selected movie, loading, errors, and signup toggle.
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false); // To switch between login and signup forms

  // Callback function to handle user logout.
  const handleLogout = useCallback(() => {
    // Clear user and token from localStorage and state.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setSelectedMovie(null); // Clear selected movie
    setError(null); // Clear any errors
    setShowSignup(false); // Reset signup toggle
  }, []); // Empty dependency array as it doesn't depend on component state/props

  // Callback function for successful login.
  const onLoginSuccessHandler = useCallback((loggedInUser, receivedToken) => {
    // Store user and token in localStorage and update state.
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
    }
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    }
    setShowSignup(false); // Hide signup form
    setSelectedMovie(null); // Ensure no movie is selected
    setError(null); // Clear any previous errors
  }, []); // Empty dependency array

  // useEffect hook to fetch movies when the token changes.
  useEffect(() => {
    // If there's no token, clear movies and stop loading.
    if (!token) {
      setMovies([]);
      setLoading(false);
      return;
    }

    // Set loading state and clear previous errors before fetching.
    setLoading(true);
    setError(null);

    // Fetch movies from the API.
    fetch(`${API_BASE_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }, // Send token for authorization
    })
      .then(async (response) => {
        // Handle 401 Unauthorized (session expired).
        if (response.status === 401) {
          handleLogout(); // Log out the user
          throw new Error("Session expired. Please log in again.");
        }
        // Handle other non-OK responses.
        if (!response.ok) {
          const errorBodyText = await response.text();
          let errorMsg = `Failed to fetch movies (Status: ${response.status})`;
          try {
            const errData = JSON.parse(errorBodyText); // Try to parse error body as JSON
            errorMsg += ` - ${
              errData.message || errData.error || errorBodyText
            }`;
          } catch (e) {
            errorMsg += ` - ${errorBodyText || response.statusText}`; // Fallback to text or statusText
          }
          throw new Error(errorMsg);
        }
        return response.json(); // Parse successful response as JSON
      })
      .then((data) => {
        // Map API data to the structure expected by components.
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
        setMovies(moviesFromApi); // Update movies state
      })
      .catch((err) => {
        setError(err.message || "Failed to load movies."); // Set error state
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  }, [token, handleLogout]); // Dependencies: token and handleLogout

  // Handler for when a movie card is clicked.
  const handleMovieClick = (movie) => setSelectedMovie(movie);
  // Handler for the "back" button in MovieView.
  const handleBackClick = () => setSelectedMovie(null);

  // Common header section with app title and logout button.
  const commonHeader = (
    <Row className="align-items-center mb-4">
      <Col>
        {/* Display app title if user is logged in. */}
        {user && <h1 className="welcome-message">MovieMobs</h1>}
      </Col>
      <Col xs="auto">
        {/* Display logout button if user is logged in. */}
        {user && (
          <BootstrapButton
            variant="outline-secondary" // Themed Bootstrap button
            onClick={handleLogout}
            className="logout-button" // Custom class for potential SCSS styling
          >
            Logout
          </BootstrapButton>
        )}
      </Col>
    </Row>
  );

  // Conditional rendering based on application state.

  // Initial loading state when fetching movies for the first time.
  if (loading && !selectedMovie && movies.length === 0 && token) {
    return (
      <>
        {commonHeader}
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <Col xs="auto" className="text-center">
            <Spinner
              animation="border"
              variant="primary"
              className="mb-2"
              style={{ width: "3rem", height: "3rem" }}
            />
            <p className="loading-message">Loading movies...</p>
          </Col>
        </Row>
      </>
    );
  }

  // Error state.
  if (error) {
    return (
      <>
        {commonHeader}
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading>An Error Occurred</Alert.Heading>
              <p>{error}</p>
              {/* Provide a direct way to re-login if session expired. */}
              {error.includes("Session expired") && (
                <BootstrapButton
                  variant="primary"
                  onClick={() => {
                    setError(null);
                    handleLogout();
                  }}
                >
                  Login Again
                </BootstrapButton>
              )}
            </Alert>
          </Col>
        </Row>
      </>
    );
  }

  // If user is not logged in (no token or user object).
  if (!token || !user) {
    return (
      // Centered layout for login/signup forms.
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <Col md={8} lg={6} xl={5}>
          {" "}
          {/* Responsive column width for forms */}
          {/* Toggle between SignupView and LoginView. */}
          {showSignup ? (
            <>
              <SignupView onLoggedIn={onLoginSuccessHandler} />
              <p className="text-center mt-3">
                Already have an account?{" "}
                <BootstrapButton
                  variant="link"
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </BootstrapButton>
              </p>
            </>
          ) : (
            <>
              <LoginView onLoggedIn={onLoginSuccessHandler} />
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <BootstrapButton
                  variant="link"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up Here
                </BootstrapButton>
              </p>
            </>
          )}
        </Col>
      </Row>
    );
  }

  // If a movie is selected, show the MovieView.
  if (selectedMovie) {
    return (
      <>
        {commonHeader}
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      </>
    );
  }

  // If no movies are available (after loading and no errors).
  if (movies.length === 0 && !loading) {
    return (
      <>
        {commonHeader}
        <Row className="justify-content-center mt-4">
          <Col md={8} className="text-center">
            <Alert variant="info" className="empty-list-message">
              No movies available at the moment. Please check back later.
            </Alert>
          </Col>
        </Row>
      </>
    );
  }

  // Default view: Display the list of movies.
  return (
    <>
      {commonHeader}
      {/* Responsive grid for displaying movie cards. */}
      {/* xs, sm, md, lg, xl define columns per row at different breakpoints. g-4 for gutters. */}
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 movies-grid">
        {movies.map((movie) => (
          // Each card in a column, ensuring cards stretch to equal height.
          <Col key={movie._id} className="d-flex align-items-stretch">
            <MovieCard movie={movie} onMovieClick={handleMovieClick} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainView; // Default export

/*
This MainView component is the central hub of the application.
It manages core application state including the current user, authentication token,
list of movies, selected movie details, loading status, and error messages.
I also:
- Handles user authentication: loads user/token from localStorage, provides login/logout.
- Fetches movie data from an API when a user is authenticated (token is present).
- Conditionally renders different views:
    - LoginView or SignupView if the user is not authenticated.
    - A loading indicator (Spinner) while data is being fetched.
    - An error message (Alert) if API calls or other operations fail.
    - A list of MovieCards if movies are loaded and no specific movie is selected.
    - MovieView (detailed view) if a movie is selected from the list.
    - A message if no movies are available.
- Uses React Bootstrap components (Row, Col, Button, Spinner, Alert) for layout and UI.
- The movie list is displayed in a responsive grid.
- A common header provides the app title and a logout button when the user is logged in.
*/
