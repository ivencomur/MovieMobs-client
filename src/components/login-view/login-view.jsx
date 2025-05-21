import React, { useState } from "react";
import PropTypes from "prop-types";
import './login-view.scss'
import { login } from "../../movies-api";
export const LoginView = ({ onLoggedIn }) => {
  //state for managing form inputs and loading state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let data = await login(username, password)
      
      if (data.user && data.token) {
        if (onLoggedIn) {
          onLoggedIn(data.user, data.token);
        }
      } else {
        setError(
          "Login response was successful but missing user or token data."
        );
      }
      setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        setError(e.message || "An unexpected error occurred during login.");
    }
  };

  //on sumbit call function with event
  return (
    <div className="login-view">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login to MovieMobs</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="loginUsername">Username:</label>
          <input
            id="loginUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password:</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
