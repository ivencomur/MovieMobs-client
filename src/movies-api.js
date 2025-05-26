// Base URL for the MovieMobs API.
const API_BASE_URL = "https://iecm-movies-app-6966360ed90e.herokuapp.com";

// Handle user login.
export async function login(username, password) {
  const loginData = { username: username, password: password }; // API expects these keys
  let response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  return await response.json();
}

// Handle user signup with optional birthday.
export async function signupUser(username, email, password, birthday) {
  const signupData = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday,
  };
  let response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });
  return await response.json();
}

// Fetch a user's details by username (requires token).
export async function getUser(username, token) {
  let response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch user data.");
  return await response.json();
}

// Update user info with only provided fields.
export async function updateUser(username, userData, token) {
  const validUserData = Object.fromEntries(
    Object.entries(userData).filter(([_, v]) => v != null && v !== "")
  );
  let response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validUserData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user.");
  }
  return await response.json();
}

// Delete user account.
export async function deregisterUser(username, token) {
  let response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Failed to deregister user.");
  if (response.status === 204)
    return { message: "User deregistered successfully." };
  return await response.json();
}

// Add movie to user's favorites.
export async function addFavoriteMovie(username, movieId, token) {
  let response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(
      username
    )}/movies/${encodeURIComponent(movieId)}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add favorite movie.");
  }
  return await response.json();
}

// Remove movie from user's favorites.
export async function removeFavoriteMovie(username, movieId, token) {
  let response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(
      username
    )}/movies/${encodeURIComponent(movieId)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove favorite movie.");
  }
  return await response.json();
}

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

Summary of API functions (lines 1–98):

- login() and signupUser() (lines 3–29): Auth functions using expected API keys.
- getUser() (lines 32–43): Fetches a user’s data with token authorization.
- updateUser() (lines 46–65): Sends partial updates; ignores empty fields.
- deregisterUser() (lines 68–78): Deletes user; handles 204 No Content response.
- addFavoriteMovie() (lines 81–91): Adds a movie to favorites list.
- removeFavoriteMovie() (lines 94–98): Removes a movie from favorites.

This file centralizes API calls with minimal assumptions about backend specifics.
Each function handles HTTP response status and JSON parsing, throwing errors when needed.
*/
