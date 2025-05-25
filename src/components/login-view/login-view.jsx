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
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

LoginView Component — user login form.

Key points:

1. Manages input states: username, password, loading, and error.  
   → Lines 9–13

2. Handles form submit with async `handleSubmit`:  
   - Prevents default behavior.  
   - Calls `login` API with credentials.  
   - On success, calls `onLoggedIn` prop with user and token.  
   - Shows errors via Alert if login fails or throws.  
   → Lines 15–39

3. Uses React Bootstrap Form, Button, and Alert for UI and feedback.  
   → Lines 41–80

4. Disables inputs and button during loading to prevent multiple submits.  
   → Lines 59, 71, 78

5. Custom styling via `login-view.scss` plus Bootstrap padding and layout classes.  
   → Lines 41, 78 (container and button classes)

6. PropTypes enforces required `onLoggedIn` function prop.  
   → Lines 82–85

This structure provides a responsive, user-friendly login experience with clean state management and error handling.
*/
