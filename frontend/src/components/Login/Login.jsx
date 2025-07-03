import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import loginIllustration from "../img/one.png"; // Update with your image

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { setIsAuthenticated, setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", credentials);
      const { access, refresh } = res.data;

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);

      const profileRes = await axios.get("http://127.0.0.1:8000/profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const user = profileRes.data?.user || {};
      const role = user.role || "";
      setUserRole(role);
      setIsAuthenticated(true);
      localStorage.setItem("role", role);

      const studentId = profileRes.data?.student_profile?.id;
      if (studentId) {
        localStorage.setItem("student_id", studentId);
      }

      if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/faculty-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("❌ Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-blue-100 text-black">
      {/* Left Banner */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-12 from-blue-50 shadow-lg z-10">
        <img
          src={loginIllustration}
          alt="Welcome to Miracle IT"
          className="w-[80%] mb-8 rounded-xl shadow-md"
        />
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          Welcome to Miracle IT 💙
        </h1>
        <p className="text-center text-lg text-gray-800 max-w-md">
          Launch your tech career with confidence. Login to access your dashboard, track your learning, and explore new possibilities.
        </p>
      </div>

      {/* Right Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">🔐 Login to Your Account</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="👤 Username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <input
              type="password"
              name="password"
              placeholder="🔒 Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition"
            >
              Login 🚀
            </button>

            <Link to="/register">
              <button
                type="button"
                className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-950 font-semibold text-lg transition"
              >
                Create an Account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;