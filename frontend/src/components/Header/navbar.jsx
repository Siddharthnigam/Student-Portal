import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Logo from '../img/miraclelogo.png'

const Navbar = () => {
  const { isAuthenticated, userRole, authLoaded } = useContext(AuthContext);

  if (!authLoaded) return null; // ✅ Prevent UI flashing before auth state loads

  return (
    <nav className="bg-white shadow-md">
      {/* Top Section */}
      <div className="flex items-center justify-between px-3 pb-3">
        {/* Placeholder for additional content if needed */}
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between p-4 px-4 text-black">
      
       <div className="flex items-center">
  <img
    src={Logo}
    alt="Miracle IT Logo"
    className="w-44 h-18 ml-4  object-cover"
  />
</div>

        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Search for Colleges, Exams, Courses and More.."
            className="w-full px-4 py-2 rounded bg-gray-200 text-black"
          />
        </div>

        <div className="flex gap-10 font-bold text-[1rem] px-8 text-lg">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-gray-900">Explore</Link>
          <Link to="/courseList" className="text-gray-600 hover:text-gray-900">Courses</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>

          {/* 🔥 Dashboard Link Based on Role */}
          {isAuthenticated && userRole === "admin" && <Link to="/admin-dashboard">Dashboard</Link>}
          {isAuthenticated && userRole === "faculty" && <Link to="/faculty-dashboard">Dashboard</Link>}
          {isAuthenticated && userRole === "student" && <Link to="/student-dashboard">Dashboard</Link>}
        </div>

        <div className="bg-green-500 px-4 rounded-2xl py-2">
          {isAuthenticated ? (
            <Link to="/profile">
              <button className="bg-black rounded-2xl text-white py-2 px-4">Profile</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-black rounded-2xl text-white py-2 px-4">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;