import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
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
          alert("Login failed, please verify your credentials");
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log("login successful, API responding:", data);
        if (onLoggedIn && data.user && data.token) {
          onLoggedIn(data.user, data.token);
        }
      })
      .catch((e) => {
        console.error("login error", e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="7"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
