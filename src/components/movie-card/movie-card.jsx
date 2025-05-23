import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap Card component.
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
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
    // Use Bootstrap Card component for styling.
    // h-100 ensures cards in a row have equal height.
    // movie-card class for custom SCSS tweaks.
    // shadow-sm adds a subtle shadow.
    <Card
      className="h-100 movie-card shadow-sm"
      onClick={() => onMovieClick(movie)} // Make the entire card clickable (Is it wrapped??)
      style={{ cursor: "pointer" }} // Indicate clickability
    >
      {/* Movie poster image within the card. */}
      <Card.Img
        variant="top" // Positions image at the top of the card
        src={imagePath}
        alt={`Poster for ${movie.Title}`}
        onError={handleImageError} // Fallback for broken images
        className="card-img-top" // Class for aspect ratio/object-fit styling from index.scss
      />
      {/* Card body for content like title. */}
      <Card.Body className="d-flex flex-column p-3">
        {/* Movie title. text-truncate prevents overflow. h5 for semantics. */}
        <Card.Title className="text-truncate movie-card-title h5">
          {movie.Title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

// Define prop types for validation and clarity.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string, // ImagePath is optional
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired, // Callback function when card is clicked
};

/*
This MovieCard component displays individual movie information in a card format.
It utilizes React Bootstrap's Card components for a consistent and styled appearance.
Key features include:
- Displaying a movie poster (with a fallback if the image fails to load).
- Showing the movie title, truncated if it's too long.
- Making the entire card clickable to trigger the `onMovieClick` function (passed as a prop),
  which typically navigates to a detailed view of the movie.
- Applying Bootstrap utility classes like `h-100` for uniform card height in a grid,
  `shadow-sm` for a subtle depth effect, and `p-3` for padding.
- Custom classes like `.movie-card`, `.card-img-top`, and `.movie-card-title` allow for
  specific styling overrides or additions via SCSS (primarily in `index.scss`).
*/