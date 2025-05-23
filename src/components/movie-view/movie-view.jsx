import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components.
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

export const MovieView = ({ movies }) => {
  // The `useParams` hook retrieves URL parameters. Here, we get `movieId`.
  const { movieId } = useParams();

  // Find the specific movie from the `movies` array using the `movieId` from the URL.
  const movie = movies.find((m) => m._id === movieId);

  // Handles image loading errors.
  const handleImageError = (e) => {
    e.target.onerror = null;
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
            style={{ maxHeight: "525px", width: "auto" }}
          />
        </Col>

        <Col md={8} className="movie-details">
          <h2 className="movie-view-title">{movie.Title}</h2>
          <hr />

          <div className="movie-detail mb-2">
            <strong>Description:</strong> {movie.Description}
          </div>

          <div className="movie-detail mb-2">
            <strong>Genre:</strong>
            <Badge bg="info" text="dark" className="ms-2">
              {/* Handle cases where Genre might be a string or an object */}
              {typeof movie.Genre === "object" && movie.Genre !== null
                ? movie.Genre.name
                : movie.Genre || "N/A"}
            </Badge>
          </div>

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

          <div className="movie-detail mb-3">
            <strong>Featured:</strong> {movie.Featured ? "Yes" : "No"}
          </div>

          {Array.isArray(movie.Cast) && movie.Cast.length > 0 && (
            <>
              <h5>Cast:</h5>
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
        </Col>
      </Row>
    </div>
  );
};

// Update prop types: `movies` is now an array, `onBackClick` is removed.
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string,
      Genre: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
        }),
      ]),
      Director: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string, bio: PropTypes.string }),
      ]),
      Featured: PropTypes.bool,
      Cast: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

/*
The MovieView component now dynamically displays movie details based on a URL parameter.
Key changes include:
- It imports `useParams` and `Link` from `react-router-dom`.
- It accepts the full `movies` array as a prop (passed from MainView).
- `useParams()` hook is called to extract the `movieId` from the current URL path
  (e.g., if the URL is `/movies/123`, `movieId` will be "123").
- It uses `movies.find()` to get the specific movie object whose `_id` matches the `movieId`.
- If no movie is found (e.g., invalid ID in URL or data still loading), it displays a
  "Movie Not Found" message with a `<Link>` to go back to the main list.
- The "Back" button is now a `<Link to="/">` component, directly navigating to the homepage.
- The `onBackClick` prop is removed, as its functionality is replaced by the `<Link>` component.
- Prop types are updated to reflect that `movies` is an array.
- Updated Genre and Director display to handle cases where these might be simple strings or objects with a 'name' property, depending on how movie data is structured in the `movies` array.
*/
