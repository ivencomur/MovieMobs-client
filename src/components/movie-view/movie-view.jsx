import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for layout and UI.
import {
  Button,
  Image,
  ListGroup,
  Badge,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
// Import useParams to access URL parameters and Link for navigation.
import { useParams, Link } from "react-router-dom";

// Placeholder function for handling add/remove favorites.
// In a real app, this logic would involve API calls and state updates.
const handleToggleFavorite = (movieId, movieTitle, isFavorite) => {
  if (isFavorite) {
    alert(
      `Placeholder: Removed "${movieTitle}" (ID: ${movieId}) from favorites!`
    );
    // Call removeFavoriteMovie(user.Username, movieId, token) here
  } else {
    alert(`Placeholder: Added "${movieTitle}" (ID: ${movieId}) to favorites!`);
    // Call addFavoriteMovie(user.Username, movieId, token) here
  }
  // After API call, update user state in MainView/context.
};

export const MovieView = ({ movies, user, token }) => {
  // Added user and token for favorite logic
  // The `useParams` hook retrieves URL parameters. Here, we get `movieId`.
  const { movieId } = useParams();

  // Find the specific movie from the `movies` array using the `movieId` from the URL.
  const movie = movies.find((m) => m._id === movieId);

  // Handles image loading errors by setting a fallback placeholder.
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents infinite loop
    e.target.src =
      "https://via.placeholder.com/350x525.png?text=Image+Not+Available";
    e.target.alt = "Image not available";
  };

  // If the movie isn't found (e.g., invalid movieId in URL or movies not loaded yet).
  if (!movie) {
    return (
      <Col md={8} className="mx-auto">
        {" "}
        {/* Centering the alert */}
        <Alert variant="warning" className="text-center p-5">
          <Alert.Heading>Movie Not Found</Alert.Heading>
          <p>
            The movie you are looking for could not be found, or the movie list
            is still loading.
          </p>
          <hr />
          <Link to={`/`}>
            <Button variant="primary">Back to Movie List</Button>
          </Link>
        </Alert>
      </Col>
    );
  }

  // Determine image path, using a placeholder if not available.
  const imagePath =
    movie.ImagePath || "https://via.placeholder.com/350x525.png?text=No+Image";
  // Check if the current movie is in the user's favorites (requires user prop).
  const isFavorite =
    user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);

  return (
    // Main container for the movie details view.
    <div className="movie-view-container p-3 p-md-4 rounded shadow-sm">
      {/* "Back to List" button now uses Link for navigation. */}
      <Link to={`/`}>
        <Button variant="outline-primary" className="mb-4 back-button">
          &laquo; Back to List
        </Button>
      </Link>

      {/* Responsive layout for movie poster and details. */}
      <Row>
        <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
          <Image
            className="movie-poster img-fluid rounded shadow"
            src={imagePath}
            alt={`Poster for ${movie.Title}`}
            onError={handleImageError}
            style={{ maxHeight: "525px", width: "auto" }} // Constrain image size
          />
        </Col>

        <Col md={8} className="movie-details">
          {/* Movie title. */}
          <h2 className="movie-view-title">{movie.Title}</h2>
          <hr /> {/* Horizontal line for separation */}
          {/* Movie description. */}
          <div className="movie-detail mb-2">
            <strong>Description:</strong> {movie.Description}
          </div>
          {/* Movie genre with a Bootstrap Badge for styling. */}
          <div className="movie-detail mb-2">
            <strong>Genre:</strong>
            <Badge bg="info" text="dark" className="ms-2">
              {/* Handle cases where Genre might be a string or an object */}
              {typeof movie.Genre === "object" && movie.Genre !== null
                ? movie.Genre.name
                : movie.Genre || "N/A"}
            </Badge>
          </div>
          {/* Movie director information. */}
          <div className="movie-detail mb-2">
            <strong>Director:</strong>
            {/* Handle cases where Director might be a string or an object */}
            <span>
              {typeof movie.Director === "object" && movie.Director !== null
                ? movie.Director.name
                : movie.Director || "N/A"}
            </span>
            {typeof movie.Director === "object" && movie.Director?.bio && (
              <em className="d-block text-muted small mt-1">
                Bio: {movie.Director.bio}
              </em>
            )}
          </div>
          {/* Featured status. */}
          <div className="movie-detail mb-3">
            <strong>Featured:</strong> {movie.Featured ? "Yes" : "No"}
          </div>
          {/* Cast list, displayed if available. */}
          {Array.isArray(movie.Cast) && movie.Cast.length > 0 && (
            <>
              <h5>Cast:</h5>
              {/* Bootstrap ListGroup for a clean list presentation. */}
              <ListGroup variant="flush" className="cast-list">
                {movie.Cast.map((actorName, index) => (
                  <ListGroup.Item
                    key={index}
                    className="px-0 py-1 bg-transparent"
                  >
                    {actorName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
          {/* Favorite button - placeholder functionality */}
          {user && ( // Only show if user is logged in
            <div className="mt-3">
              <Button
                variant={isFavorite ? "outline-danger" : "outline-success"}
                onClick={() =>
                  handleToggleFavorite(movie._id, movie.Title, isFavorite)
                }
              >
                {isFavorite ? "💔 Unfavorite" : "❤️ Favorite"}
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {/* Placeholder for Similar Movies section (Bonus) */}
      {/* <Row className="mt-5">
        <Col>
          <h4>Similar Movies (Bonus Feature Placeholder)</h4>
          {/* Logic to find and display similar movies would go here, possibly using MovieCard */}
      {/* </Row> */}
    </div>
  );
};

// Define prop types for the component.
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      // Expects the full array of movies
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string,
      Genre: PropTypes.oneOfType([
        // Genre can be a string or an object with a name
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
        }),
      ]),
      Director: PropTypes.oneOfType([
        // Director can be a string or an object with name/bio
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string, bio: PropTypes.string }),
      ]),
      Featured: PropTypes.bool,
      Cast: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  user: PropTypes.object, // User object is needed for favorite status; can be null
  token: PropTypes.string, // Token might be needed for API calls to add/remove favorites
  // onBackClick prop is removed; navigation is handled by React Router <Link>
};

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

MovieView component displays detailed info for a single movie selected via URL.

1. Props:
   - `movies`: array of movie objects (full list)
   - `user`: current user object (for favorites)
   - `token`: auth token (for API calls, placeholder here)

2. Uses React Router `useParams` hook to extract `movieId` from URL.

3. Finds the movie in the `movies` array by matching `_id` with `movieId`.

4. If movie not found, displays a centered warning Alert with a "Back to Movie List" button (React Router Link).

5. Displays movie details in a responsive layout using React Bootstrap components:
   - Poster image with fallback placeholder on error
   - Title, Description, Genre (string or object), Director (string or object with optional bio)
   - Featured status ("Yes"/"No")
   - Cast list as a Bootstrap ListGroup if available

6. Shows a "Back to List" button using React Router `<Link>` for navigation.

7. Includes a placeholder "❤️ Favorite"/"💔 Unfavorite" button that toggles favorite status via alerts.
   Actual add/remove favorite logic would use `user`, `token`, and API calls.

8. PropTypes validate shape of movies array and optional user/token props.

Summary:
This component ties routing, data lookup, and detailed presentation together, providing a full movie view with navigation and user interaction placeholders.
*/
