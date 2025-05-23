import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components.
import { Card, Button } from "react-bootstrap";
// Import Link from React Router for navigation.
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  // Handles image loading errors by setting a fallback placeholder.
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents infinite loop if placeholder also fails
    e.target.src =
      "https://via.placeholder.com/300x450.png?text=Image+Not+Available";
    e.target.alt = "Image not available";
  };

  // Determine the image path, using a placeholder if not available.
  const imagePath =
    movie.ImagePath || "https://via.placeholder.com/300x450.png?text=No+Image";

  return (
    // Main card structure using React Bootstrap Card.
    <Card className="h-100 movie-card shadow-sm">
      {/* Movie poster image. */}
      <Card.Img
        variant="top"
        src={imagePath}
        alt={`Poster for ${movie.Title}`}
        onError={handleImageError}
        className="card-img-top" // Styled by index.scss for aspect ratio
      />
      {/* Card body containing title and link to details. */}
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="text-truncate movie-card-title h5">
          {movie.Title}
        </Card.Title>
        {/* Navigation Link to the movie's detailed view. */}
        {/* encodeURIComponent ensures movie._id is URL-safe. */}
        <Link
          to={`/movies/${encodeURIComponent(movie._id)}`}
          className="mt-auto align-self-start" // Bootstrap classes for positioning
        >
          <Button variant="link" className="ps-0">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// Define prop types for the component.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Movie ID is crucial for generating the link
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string, // ImagePath is optional
  }).isRequired,
  // onMovieClick prop is no longer needed as navigation is handled by Link
};

/*
This MovieCard component displays a summary of a movie.
Key changes for routing:
- It imports the `Link` component from `react-router-dom`.
- The "Open" button is now wrapped in a `<Link>` component.
- The `to` prop of the `<Link>` is set to a dynamic path like `/movies/some_movie_id`,
  using the movie's `_id`. `encodeURIComponent` is used to make sure the ID is safe for URLs.
- The `onMovieClick` prop, which was previously used to handle navigation via state change
  in MainView, is removed because navigation is now declarative via `<Link>`.
- Styling from `index.scss` (like `.movie-card`, `.card-img-top`) and Bootstrap utilities
  (`h-100`, `shadow-sm`) are maintained for appearance.
*/
