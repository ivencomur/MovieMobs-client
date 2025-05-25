import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components.
import { Card, Button } from "react-bootstrap";
// Import Link from React Router for navigation.
import { Link } from "react-router-dom";

// Placeholder: This function would typically be passed as a prop or handled via context/state management.
const handleAddToFavorites = (movieId, movieTitle) => {
  alert(
    `Placeholder: Added "${movieTitle}" (ID: ${movieId}) to favorites! API call would happen here.`
  );
  // In a real app, you'd call something like:
  // addFavoriteMovie(currentUser.Username, movieId, token)
  //   .then(updatedUser => { /* update user state/context */ })
  //   .catch(err => console.error(err));
};

export const MovieCard = ({ movie }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://via.placeholder.com/300x450.png?text=Image+Not+Available";
    e.target.alt = "Image not available";
  };

  const imagePath =
    movie.ImagePath || "https://via.placeholder.com/300x450.png?text=No+Image";

  return (
    <Card className="h-100 movie-card shadow-sm">
      <Link
        to={`/movies/${encodeURIComponent(movie._id)}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Img
          variant="top"
          src={imagePath}
          alt={`Poster for ${movie.Title}`}
          onError={handleImageError}
          className="card-img-top"
        />
      </Link>
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="text-truncate movie-card-title h5">
          {/* Link the title as well for better UX */}
          <Link
            to={`/movies/${encodeURIComponent(movie._id)}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {movie.Title}
          </Link>
        </Card.Title>
        {/* Actions: Open details and Add to Favorites */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link" className="ps-0">
              Open
            </Button>
          </Link>
          {/* Placeholder Add to Favorites Button */}
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => handleAddToFavorites(movie._id, movie.Title)}
          >
            ❤️ Favorite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
};

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

MovieCard component renders a single movie summary card.

1. Accepts a `movie` object prop with `_id`, `Title`, and optional `ImagePath`.  
   → Lines 51–57

2. Defines a placeholder `handleAddToFavorites` function simulating adding the movie to favorites (shows alert).  
   → Lines 6–13

3. Handles missing or broken movie images by replacing with a placeholder URL and alt text.  
   → Lines 15–22

4. Renders a Bootstrap Card:  
   - Image wrapped in a React Router <Link> to the movie details page, with `onError` to handle image loading issues.  
   - Title also wrapped in a <Link> for easier navigation.  
   - Bottom area with two buttons side by side:  
     • "Open" button linking to movie details page.  
     • "❤️ Favorite" button that calls the placeholder favorite handler.  
   - Uses flexbox for layout and spacing inside the card body.  
   → Lines 24–49

5. Uses PropTypes to enforce correct movie prop shape.  
   → Lines 59–65

Summary: This component provides a clickable movie card with navigation and a stub for favoriting functionality, using Bootstrap styling and React Router links to improve UX.
*/
