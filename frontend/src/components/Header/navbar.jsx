import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (token exists)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      {/* Logo and Name */}
      <div className="flex items-center">
        <div className="bg-green-500 ml-10 rounded-full p-4"></div>
        <span className="ml-2 text-gray-800 text-4xl font-bold">Miracle IT</span>
      </div>

      {/* Menu Links */}
      <div className="flex gap-10 font-bold text-[1rem] space-x-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
        <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
        <Link to="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">About Me</Link>
        <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
      </div>

      {/* CTA Button (Register → Profile) */}
      <div className="bg-green-500 px-4 rounded-2xl py-2">
        {isAuthenticated ? (
          <Link to="/profile">
            <button className="bg-black rounded-2xl text-white py-2 px-4">Profile</button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="bg-black rounded-2xl text-white py-2 px-4">Register</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;