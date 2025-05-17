import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/profile"); // Redirect to profile if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", credentials);
      localStorage.setItem("token", res.data.access);
      setIsAuthenticated(true); // Update authentication state
      alert("Login Successful!");
      navigate("/profile"); // Redirect to profile
    } catch (err) {
      setError("Invalid username or password. Please try again."); // Show specific error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;