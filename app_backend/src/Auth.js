// src/Auth.js
import React, { useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const pb = new PocketBase(process.env.REACT_APP_PB_URL); // Use environment variable for PocketBase URL

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Authenticate with PocketBase
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("Login successful", authData);
      // Redirect to the Home page after successful login
      navigate("/home"); // Change to your desired path after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
