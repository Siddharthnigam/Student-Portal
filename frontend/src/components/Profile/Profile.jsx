import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("student_id");

    if (!token || !studentId) {
      console.error("❌ Missing token or student ID.");
      logout();
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/students/${studentId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("❌ Error fetching profile data:", error);
        logout();
        navigate("/login");
      }
    };

    fetchUserData();
  }, [logout, navigate]);

  if (!userData) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-indigo-800">👤 Student Profile</h2>

        {userData.profile_image && (
          <img
            src={userData.profile_image}
            alt="Profile"
            className="h-20 w-20 mx-auto rounded-full border object-cover"
          />
        )}

        <p className="text-gray-700 text-sm">
          <strong>Username:</strong> {userData.username}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Enrollment #:</strong> {userData.enrollment_number}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Phone:</strong> {userData.phone || "N/A"}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Address:</strong> {userData.address || "N/A"}
        </p>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 bg-red-500 text-white text-sm px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;