import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user must be logged in.");
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login"); // Redirect to login if error occurs
      } finally {
        setLoading(false); // Ensure loading state ends
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login after logout
  };

  if (loading) return <p>Loading...</p>; // Prevent infinite loading

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="bg-white p-6 rounded shadow-md w-80">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;