import React, { useState } from "react";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      username: username,
      password: password,
    };

    fetch("https://iecm-movies-app-6966360ed90e.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
                  `Login failed: ${response.statusText} (Status: ${response.status})`
              );
            })
            .catch(() => {
              throw new Error(
                `Login failed: ${response.statusText} (Status: ${response.status})`
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
          setError("Login response missing user or token.");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message || "An unexpected error occurred during login.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            disabled={isLoading}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Submit"}
      </button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
