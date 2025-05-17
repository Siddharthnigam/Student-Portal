import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // Default role
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/register/", userData);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration Failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <select
          name="role"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      <Link to="/login">  <button type="submit" className="bg-blue-800 mt-2 text-white px-4 py-2 rounded w-full">
          login
        </button></Link>
      </form>
    </div>
  );
};

export default Register;