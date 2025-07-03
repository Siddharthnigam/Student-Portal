import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FacultyDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    level: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/courses/", newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses([...courses, response.data]);
      alert("✅ Course Added Successfully!");
      setNewCourse({ title: "", description: "", image: "", duration: "", level: "" });
    } catch (error) {
      console.error("❌ Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      alert("🗑️ Course deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-indigo-900 text-center drop-shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        🎓 Faculty Dashboard
      </motion.h2>

      {loading && <p className="text-center text-blue-600 font-medium">⏳ Loading courses...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg border border-indigo-200"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">➕ Upload New Course</h3>
          <div className="space-y-4">
            <input type="text" placeholder="📖 Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="🖼️ Image URL" value={newCourse.image} onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="⏱️ Duration" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="⚡ Level" value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} className="w-full p-3 border rounded-md" />
            <textarea placeholder="📝 Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} rows={4} className="w-full p-3 border rounded-md" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddCourse}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md w-full mt-2 transition duration-300"
            >
              🚀 Upload Course
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg border border-indigo-200"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-indigo-800 mb-6">📚 Uploaded Courses</h3>
          {courses.length === 0 ? (
            <p className="text-gray-600">No courses available yet.</p>
          ) : (
            <ul className="space-y-4">
              {courses.map((course, index) => (
                <motion.li
                  key={course.id}
                  className="p-4 border rounded-md shadow-sm flex items-start justify-between bg-gray-50 hover:shadow-md transition"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <h4 className="font-bold text-indigo-900">{course.title}</h4>
                    <p className="text-sm text-gray-700">{course.description}</p>
                    <p className="text-sm text-gray-500 mt-1"><strong>Duration:</strong> {course.duration}</p>
                    <p className="text-sm text-gray-500"><strong>Level:</strong> {course.level}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteCourse(course.id)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md shadow-sm transition"
                  >
                    🗑️ Delete
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FacultyDashboard;