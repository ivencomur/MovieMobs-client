import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components.
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Alert,
  ListGroup,
  Modal,
} from "react-bootstrap";
// Import Link for potential navigation, though not strictly used in this basic version.
// import { Link } from "react-router-dom";
// Import API functions (placeholders for now, to be defined in movies-api.js).
import {
  updateUser,
  deregisterUser,
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../movies-api"; // Assuming these will be created
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  movies,
  onUserUpdate,
  onLoggedOut,
}) => {
  // State for form inputs, initially populated with user data.
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState(""); // Password field is usually empty for updates
  const [email, setEmail] = useState(user.Email || "");
  // Assuming DOB might not be in user object, handle gracefully.
  const [dob, setDob] = useState(
    user.Birthday ? new Date(user.Birthday).toISOString().split("T")[0] : ""
  );

  // State for handling messages and loading.
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for deregister confirmation modal
  const [showDeregisterModal, setShowDeregisterModal] = useState(false);

  // Filter favorite movies.
  const favoriteMovies =
    user.FavoriteMovies && Array.isArray(user.FavoriteMovies)
      ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
      : [];

  // Handle form submission for updating user information.
  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setUpdateMessage("");
    setUpdateError("");

    const updatedData = {
      Username: username,
      Email: email,
      Birthday: dob,
    };
    // Only include password if user entered a new one.
    if (password) {
      updatedData.Password = password;
    }

    try {
      const updatedUser = await updateUser(user.Username, updatedData, token); // API function needed
      if (updatedUser) {
        setUpdateMessage("Profile updated successfully!");
        onUserUpdate(updatedUser); // Update user in MainView and localStorage
        setPassword(""); // Clear password field after update
      } else {
        setUpdateError("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setUpdateError(error.message || "An error occurred during update.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deregistration.
  const handleDeregister = async () => {
    setIsLoading(true);
    setUpdateError(""); // Clear previous errors
    try {
      await deregisterUser(user.Username, token); // API function needed
      alert("Account deregistered successfully. You will now be logged out.");
      onLoggedOut(); // Call logout function from MainView
    } catch (error) {
      setUpdateError(error.message || "Failed to deregister account.");
      setIsLoading(false);
    }
    // No finally setIsLoading(false) here if onLoggedOut navigates away.
  };

  // Handle removing a movie from favorites (placeholder logic).
  const handleRemoveFavorite = async (movieId) => {
    // This would call an API to remove the movie from user's favorites.
    // Then, update the user object in state/localStorage.
    console.log(
      "Attempting to remove movie:",
      movieId,
      "for user:",
      user.Username
    );
    setUpdateMessage("");
    setUpdateError("");
    try {
      const updatedUser = await removeFavoriteMovie(
        user.Username,
        movieId,
        token
      ); // API function needed
      if (updatedUser) {
        onUserUpdate(updatedUser); // Update user data in MainView and localStorage
        setUpdateMessage("Movie removed from favorites!");
      } else {
        throw new Error("Failed to remove movie from favorites.");
      }
    } catch (err) {
      setUpdateError(err.message || "Could not remove favorite.");
    }
  };

  return (
    <Col md={10} lg={8} className="mx-auto">
      {" "}
      {/* Centered column */}
      {/* User Information Display and Update Form */}
      <Card className="mb-4">
        <Card.Header as="h3">Your Profile</Card.Header>
        <Card.Body>
          <Card.Title>Account Information</Card.Title>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Username:</strong> {user.Username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {user.Email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Birthday:</strong>{" "}
              {user.Birthday
                ? new Date(user.Birthday).toLocaleDateString()
                : "Not set"}
            </ListGroup.Item>
          </ListGroup>

          <hr />
          <Card.Title className="mt-3">Update Your Information</Card.Title>
          {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          <Form onSubmit={handleUpdate}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formProfileUsername"
            >
              <Form.Label column sm={3}>
                New Username:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="5"
                  placeholder="Enter new username (optional)"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formProfilePassword"
            >
              <Form.Label column sm={3}>
                New Password:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (optional)"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formProfileEmail">
              <Form.Label column sm={3}>
                New Email:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new email (optional)"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formProfileDob">
              <Form.Label column sm={3}>
                New Date of Birth:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="me-2"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* Favorite Movies Section */}
      <Card className="mb-4">
        <Card.Header as="h3">Your Favorite Movies</Card.Header>
        <Card.Body>
          {favoriteMovies.length === 0 ? (
            <p>You haven't added any favorite movies yet.</p>
          ) : (
            <Row xs={1} sm={2} md={3} className="g-4">
              {favoriteMovies.map((movie) => (
                <Col key={movie._id} className="d-flex align-items-stretch">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={
                        movie.ImagePath ||
                        "https://via.placeholder.com/300x450.png?text=No+Image"
                      }
                      style={{ aspectRatio: "2/3", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-truncate h6">
                        {movie.Title}
                      </Card.Title>
                      {/* Button to remove from favorites */}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mt-auto"
                        onClick={() => handleRemoveFavorite(movie._id)}
                      >
                        Remove Favorite
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
      {/* Deregister Account Section */}
      <Card border="danger">
        <Card.Header as="h3" className="text-danger">
          DANGER ZONE
        </Card.Header>
        <Card.Body className="text-center">
          <Card.Title>Deregister Account</Card.Title>
          <p>Warning: This action is permanent and cannot be undone.</p>
          <Button
            variant="danger"
            onClick={() => setShowDeregisterModal(true)}
            disabled={isLoading}
          >
            Deregister My Account
          </Button>
        </Card.Body>
      </Card>
      {/* Deregister Confirmation Modal */}
      <Modal
        show={showDeregisterModal}
        onHide={() => setShowDeregisterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deregistration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you absolutely sure you want to deregister your account? All your
          data will be permanently lost.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeregisterModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowDeregisterModal(false);
              handleDeregister();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Deregistering..." : "Yes, Deregister My Account"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onUserUpdate: PropTypes.func.isRequired, // Callback to update user in MainView
  onLoggedOut: PropTypes.func.isRequired, // Callback for post-deregistration
};

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

ProfileView Component — User profile manager interface.

Key Features:

1. Displays current user info (Username, Email, Birthday) using ListGroup.  
   → Lines 92–97

2. Provides a form to update Username, Password (optional), Email, and DOB.  
   - Submits to `updateUser()` API.  
   - Shows success/error feedback using Alerts.  
   → Lines 99–146

3. Shows favorite movies (filtered from `movies` by IDs in `user.FavoriteMovies`).  
   - Each displayed in a Card with image, title, and "Remove Favorite" button.  
   - Uses `removeFavoriteMovie()` API.  
   → Lines 148–173

4. Includes "Deregister Account" section styled in red.  
   - Opens confirmation Modal to prevent accidental deletion.  
   - On confirm, calls `deregisterUser()` and triggers logout.  
   → Lines 175–198

5. Props required: `user`, `token`, `movies`, `onUserUpdate`, `onLoggedOut`.  
   → Line 201

6. Uses React Bootstrap for all layout and UI elements (Card, Form, Modal, etc).  
   → Throughout the component
*/
