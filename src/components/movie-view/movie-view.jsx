import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for layout and UI elements.
import { Button, Image, ListGroup, Badge, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  // Handles image loading errors by setting a fallback placeholder.
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents infinite loop
    e.target.src = "https://via.placeholder.com/350x525.png?text=Image+Not+Available";
    e.target.alt = "Image not available";
  };

  // If no movie data is provided, shows a message and back button.
  if (!movie) {
    return (
      <div className="text-center p-5">
        <p>Movie data not available.</p>
        <Button variant="secondary" onClick={onBackClick}>Back</Button>
      </div>
    );
  }

  // Determine image path, using a placeholder if not available.
  const imagePath = movie.ImagePath || "https://via.placeholder.com/350x525.png?text=No+Image";

  return (
    // Main container for the movie detail view.
    // Styled with padding, rounded corners, and a shadow using Bootstrap classes.
    <div className="movie-view-container p-3 p-md-4 rounded shadow-sm"> 
      {/* Back button to navigate to the movie list. */}
      <Button variant="outline-primary" onClick={onBackClick} className="mb-4 back-button">
        &laquo; Back to List 
      </Button>

      {/* Responsive layout using Bootstrap Row and Col. */}
      <Row>
        {/* Column for the movie poster. */}
        <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
          <Image 
            className="movie-poster img-fluid rounded shadow" // Responsive and styled image
            src={imagePath}
            alt={`Poster for ${movie.Title}`}
            onError={handleImageError}
            style={{ maxHeight: '525px', width: 'auto' }} // Constrain image size
          />
        </Col>

        {/* Column for movie details. */}
        <Col md={8} className="movie-details">
          {/* Movie title. */}
          <h2 className="movie-view-title">{movie.Title}</h2>
          <hr/> {/* Horizontal line for separation */}
          
          {/* Movie description. */}
          <div className="movie-detail mb-2">
            <strong>Description:</strong> {movie.Description}
          </div>
          
          {/* Movie genre with a Bootstrap Badge for styling. */}
          <div className="movie-detail mb-2">
            <strong>Genre:</strong> 
            <Badge bg="info" text="dark" className="ms-2">{movie.Genre?.name || "N/A"}</Badge>
          </div>
          
          {/* Movie director information. */}
          <div className="movie-detail mb-2">
            <strong>Director:</strong> {movie.Director?.name || "N/A"}
            {movie.Director?.bio && <em className="d-block text-muted small mt-1">Bio: {movie.Director.bio}</em>}
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
                  <ListGroup.Item key={index} className="px-0 py-1 bg-transparent">
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

// Define prop types for the component.
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
    Director: PropTypes.shape({ name: PropTypes.string, bio: PropTypes.string }),
    Featured: PropTypes.bool,
    Cast: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired, // Function to handle back navigation
};

/*
This MovieView component is responsible for displaying the detailed information of a selected movie.
It uses various React Bootstrap components like Row, Col, Button, Image, ListGroup, and Badge
to structure and style the content responsively.
It includes:
- A "Back to List" button to navigate away from the detailed view.
- A two-column layout (on medium screens and up) for the movie poster and its textual details.
- Display of movie title, description, genre (with a styled Badge), director information,
  featured status, and a list of cast members.
- Image error handling to show a placeholder if the movie poster fails to load.
- The main container `.movie-view-container` and specific elements like `.movie-view-title`
  can be further styled via SCSS (primarily in `index.scss`) to match the application's theme.
- Prop types are defined to ensure the component receives the correct data structure for a movie.
*/