import React, { useState } from "react";
import PropTypes from "prop-types";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const signupData = {
      username: username,
      password: password,
    };

    fetch("https://iecm-movies-app-6966360ed90e.herokuapp.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response
            .json()
            .then((errBody) => {
              throw new Error(
                errBody.error ||
                  errBody.message ||
                  `Authentication failed: Status ${response.status}`
              );
            })
            .catch(() => {
              throw new Error(
                `Authentication failed: Status ${response.status} - ${response.statusText}`
              );
            });
        }
      })
      .then((data) => {
        setIsLoading(false);
        if (data.user && data.token) {
          if (onLoggedIn) {
            onLoggedIn(data.user, data.token);
          }
        } else {
          setError(
            "Authentication response was successful but missing user or token data."
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message || "An unexpected error occurred during signup.");
      });
  };

  return (
    <div className="signup-view">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up for MovieMobs</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="signupUsername">Username:</label>
          <input
            id="signupUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupPassword">Password:</label>
          <input
            id="signupPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading} className="signup-button">
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

SignupView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
