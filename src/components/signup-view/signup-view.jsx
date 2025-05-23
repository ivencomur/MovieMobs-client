import React, { useState } from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for form building.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Import component-specific styles.
import './signup-view.scss';
// Import API functions for signup and login.
import { login, signupUser } from "../../movies-api";

export const SignupView = ({ onLoggedIn }) => {
  // State for form inputs, loading status, and error messages.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission for user signup.
  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent default browser submission
    setIsLoading(true); // Indicate loading process
    setError(null); // Clear previous errors

    try {
      // Attempt to sign up the user.
      let signupResponse = await signupUser(username, email, password);
      // If signup is successful (user object with _id is returned).
      if (signupResponse && signupResponse._id) {
        // Attempt to log in the newly signed-up user automatically.
        let loginResponse = await login(username, password);
        if (loginResponse.user && loginResponse.token) {
          if (onLoggedIn) {
            // Pass user data and token to parent component on successful login.
            onLoggedIn(loginResponse.user, loginResponse.token);
          }
        } else {
          setError("Signup successful, but automatic login failed. Please try logging in manually.");
        }
      } else {
        // Handle signup failure.
        setError(signupResponse.message || "Signup failed. Please check your details.");
      }
    } catch (error) {
      // Catch any errors during API calls.
      setError(error.message || "An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    // Main container for the signup view, styled by signup-view.scss and Bootstrap padding.
    <div className="signup-view-container p-md-4 p-3">
      {/* Signup form using React Bootstrap components. */}
      <Form onSubmit={handleSubmit} className="signup-form">
        {/* Form title. */}
        <h2 className="mb-4 text-center form-title">Sign Up</h2>
        {/* Display error messages if any. */}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        
        {/* Username input field group. */}
        <Form.Group controlId="signupUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            disabled={isLoading}
            placeholder="Choose a username (min. 5 characters)"
          />
        </Form.Group>

        {/* Email input field group. */}
        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email" // Use email type for basic validation
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter your email address"
          />
        </Form.Group>

        {/* Password input field group. */}
        <Form.Group controlId="signupPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Create a password"
          />
        </Form.Group>

        {/* Submit button. */}
        <Button 
          variant="success" // Uses themed success color (mapped to secondary theme color)
          type="submit" 
          disabled={isLoading} 
          className="w-100 submit-button" // Full-width and custom class
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>
    </div>
  );
};

// Define prop types for the component.
SignupView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

/*
This component provides the user signup form.
It manages state for username, email, password, loading, and errors.
React Bootstrap's Form, Button, and Alert components are used for the UI.
When submitted, it calls an API to create a new user and then attempts to log them in.
If successful, it triggers the `onLoggedIn` prop. Errors are displayed in an Alert.
Styling is handled by `signup-view.scss` and Bootstrap utilities, under a consistent look
with the LoginView. The `.signup-view-container`, `.form-title`, and `.submit-button` classes
are available for specific SCSS styling.
*/