import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import signupIllustration from "../img/one.png"; // 📸 Replace with your own image path

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await axios.post("http://127.0.0.1:8000/register/", userData);
      alert("✅ Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration Error:", error);
      if (error.response?.data) {
        const data = error.response.data;
        const messages = Object.values(data).flat().join("\n");
        setErrorMsg(messages || "Something went wrong.");
      } else {
        setErrorMsg("Registration failed: Unknown error.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-blue-100 text-black">
      {/* Left Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-700">📝 Create Your Account</h2>
          <p className="text-center text-md text-gray-700 mb-6">
            Start your learning journey at <span className="text-blue-600 font-semibold">Miracle IT Career Academy</span>. Get access to courses, mentorship, and career support.
          </p>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm text-center">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="👤 Username"
              value={userData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <input
              type="password"
              name="password"
              placeholder="🔒 Password (min. 8 characters)"
              value={userData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="student">🎓 Student</option>
              <option value="faculty">👨‍🏫 Faculty</option>
              <option value="admin">🛠️ Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition"
            >
              Register 🚀
            </button>

            <Link to="/login">
              <button
                type="button"
                className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-950 font-semibold text-lg transition"
              >
                Already have an account? Login
              </button>
            </Link>
          </div>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-12  shadow-lg">
        <img
          src={signupIllustration}
          alt="Miracle IT Register"
          className="w-[80%] rounded-xl shadow-md mb-8"
        />
        <h3 className="text-2xl font-bold text-blue-700 text-center mb-2">Join Miracle IT Academy 🌟</h3>
        <p className="text-gray-800 text-center max-w-md">
          Fuel your curiosity, sharpen your skills, and unlock career opportunities — all under one roof.
        </p>
      </div>
    </div>
  );
};

export default Register;