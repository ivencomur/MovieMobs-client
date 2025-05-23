import React, { useState } from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for building the form.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Import component-specific styles.
import "./login-view.scss";
// Import the login API function.
import { login } from "../../movies-api";

export const LoginView = ({ onLoggedIn }) => {
  // State variables for form inputs, loading status, and error messages.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles the form submission.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission
    setIsLoading(true); // Sets loading state
    setError(null); // Clears previous errors

    try {
      // Call the login API.
      let data = await login(username, password);

      // Check if login was successful and data is valid.
      if (data.user && data.token) {
        if (onLoggedIn) {
          onLoggedIn(data.user, data.token); // Pass user and token to parent component
        }
      } else {
        // Set error message if login failed or data is incomplete.
        const errorMessage =
          data.message || "Login failed. Please check your credentials.";
        setError(errorMessage);
      }
    } catch (e) {
      // Catch any errors during the API call.
      setError(e.message || "An unexpected error occurred during login.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    // Main container for the login view, styled by login-view.scss and Bootstrap padding.
    <div className="login-view-container p-md-4 p-3">
      {/* Login form using React Bootstrap components. */}
      <Form onSubmit={handleSubmit} className="login-form">
        {/* Form title. */}
        <h2 className="mb-4 text-center form-title">Login</h2>
        {/* Display error messages if any. */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* Username input field group. */}
        <Form.Group controlId="loginUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            disabled={isLoading}
            placeholder="Enter your username"
          />
        </Form.Group>

        {/* Password input field group. */}
        <Form.Group controlId="loginPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter your password"
          />
        </Form.Group>

        {/* Submit button. */}
        <Button
          variant="primary" // Uses themed primary color
          type="submit"
          disabled={isLoading}
          className="w-100 submit-button" // Full-width and custom class for styling
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};

// Define prop types for the component.
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

/*
This component renders the login form for the application.
It uses React state to manage username, password, loading status, and error messages.
React Bootstrap components (Form, Button, Alert) are used for structure and styling.
The form submission calls an API to authenticate the user.
On successful login, it calls the `onLoggedIn` callback function passed via props.
Error messages are displayed using the Alert component.
Custom styling is applied via `login-view.scss` and Bootstrap utility classes.
The `.login-view-container` provides overall structure, and `.form-title` and `.submit-button`
allow for specific styling of the heading and button respectively.
*/