import React, { useState } from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for form building.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Import component-specific styles.
// import "./signup-view.scss";
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
  const handleSubmit = async (event) => {
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
          setError(
            "Signup successful, but automatic login failed. Please try logging in manually."
          );
        }
      } else {
        // Handle signup failure.
        setError(
          signupResponse.message || "Signup failed. Please check your details."
        );
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
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

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
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

SignupView component (lines 1-69):

- Lines 1-7: Imports React, PropTypes, React Bootstrap components (Form, Button, Alert), styles, and API functions (`login`, `signupUser`).

- Lines 9-63: Defines the SignupView functional component with internal state for:
  - `username`, `email`, `password` (lines 10-12)
  - `isLoading` to track submission state (line 13)
  - `error` for error messages (line 14)

- Lines 16-42: `handleSubmit` async function triggered on form submission:
  - Prevents default form action (line 17).
  - Sets loading true and clears previous errors (lines 18-19).
  - Calls `signupUser` API with form data (line 22).
  - If signup is successful (user object with `_id` returned, line 24), attempts automatic login (line 26).
  - On successful login, calls the `onLoggedIn` callback prop with user and token (lines 27-31).
  - Handles signup or login failure by setting error messages (lines 33-37).
  - Catches unexpected errors (lines 38-40).
  - Finally, resets loading to false (line 41).

- Lines 44-62: JSX rendering the signup form:
  - Container div with padding and styling (line 44).
  - React Bootstrap `<Form>` with controlled inputs for username, email, and password (lines 46-60).
    - Inputs are disabled during loading to prevent interaction.
    - Validation includes required fields and minimum username length (line 53).
  - Displays error alert if `error` is set (line 49).
  - Submit button shows "Signing up..." when loading (lines 61-62).

- Lines 66-69: Defines `propTypes` requiring an `onLoggedIn` function prop to notify parent component on successful login.

Styling:
- Uses custom SCSS file `signup-view.scss`.
- Applies classes like `.signup-view-container`, `.form-title`, and `.submit-button` for consistent styling and layout.

This component manages user signup flow with loading and error states, ensuring smooth UX by attempting automatic login after registration.
*/
