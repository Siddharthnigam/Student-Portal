

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [notification, setNotification] = useState(null); // simple message string
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      logout();
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/student/dashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(res.data.profile);

        // trigger message independently
        setNotification("🎓 Welcome back! Your dashboard is ready.");
      } catch (err) {
        console.error("Failed to fetch student data:", err);
        logout();
        navigate("/login");
      }
    };

    fetchData();
  }, [logout, navigate]);

  // auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">

        {/* 🔔 Notification */}
        {notification && (
          <div className="mb-6 px-4 py-3 rounded-md text-white font-medium bg-green-500 shadow transition-all">
            <div className="flex justify-between items-center">
              <span>{notification}</span>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-40 transition"
              >
                ❌
              </button>
            </div>
          </div>
        )}

        {!studentData ? (
          <p className="text-center mt-10 text-gray-600">Loading your dashboard...</p>
        ) : (
          <>
            {/* 👤 Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {studentData.profile_image && (
                <img
                  src={studentData.profile_image}
                  alt="Profile"
                  className="h-24 w-24 rounded-full shadow-lg object-cover"
                />
              )}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-blue-700">{studentData.username}</h2>
                <p className="text-md text-gray-700">{studentData.email}</p>
                <p className="text-sm text-gray-600">Enrollment #: {studentData.enrollment_number}</p>
                <p className="text-sm text-gray-600">📞 {studentData.phone || "N/A"}</p>
                <p className="text-sm text-gray-600">📍 {studentData.address || "N/A"}</p>
              </div>
            </div>

            {/* 📊 Sections */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📚 Courses */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">📚 Courses</h3>
            <p className="text-sm text-gray-700">{studentData.courses || "No courses listed."}</p>
          </div>

          {/* 📊 Grades */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">📊 Grades</h3>
            <p className="text-sm text-gray-700">{studentData.grades || "No grades available."}</p>
          </div>

          {/* 🏅 Certificates */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🏅 Certificates</h3>
            <p className="text-sm text-gray-700">{studentData.certificates || "No certificates earned yet."}</p>
          </div>

          {/* 💸 Fees */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💸 Fees</h3>
            <p className="text-sm text-gray-700">Paid: ₹{studentData.fee_paid || 0}</p>
            <p className="text-sm text-gray-700">Due: ₹{studentData.fee_due || 0}</p>
          </div>

          {/* 📅 Attendance */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">📅 Attendance</h3>
            <p className="text-sm text-gray-700">
              {studentData.attendance_percentage || 0}% present
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
          >
            Logout 🚪
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;