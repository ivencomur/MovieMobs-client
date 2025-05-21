import React, { useState } from "react";
import PropTypes from "prop-types";
import './signup-view.scss'
import { login, signupUser } from "../../movies-api";
export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    //send user to api to be created
    try {
      let signupResponse = await signupUser(username,email, password)
      if (signupResponse) {
        let loginResponse = await login(username, password)
        if (onLoggedIn) {
          onLoggedIn(signupResponse, loginResponse.token);
        }
      } else {
        setError(
          "Authentication response was successful but missing user or token data."
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
        setError(error.message || "An unexpected error occurred during signup.");
    }
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
          <label htmlFor="signupEmail">Email:</label>
          <input
            id="signupEmail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
