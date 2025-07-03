import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyDashboard = () => {
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
    available_seats: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/workshops/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkshops(response.data);
      } catch (error) {
        console.error("❌ Error fetching workshops:", error);
        setError("Failed to load workshops.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const handleAddWorkshop = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/workshops/", newWorkshop, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkshops([...workshops, response.data]);
      alert("✅ Workshop uploaded successfully!");
      setNewWorkshop({ title: "", description: "", image: "", date: "", location: "", available_seats: "" });
    } catch (error) {
      console.error("❌ Error uploading workshop:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-900 text-center drop-shadow-md">
        🧑‍🏫  Workshop Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Upload Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">📥 Upload Workshop</h3>
          <div className="space-y-4">
            <input type="text" placeholder="🎯 Title" value={newWorkshop.title}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="🖼️ Image URL" value={newWorkshop.image}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, image: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="date" value={newWorkshop.date}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="📍 Location" value={newWorkshop.location}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })} className="w-full p-3 border rounded-md" />
            <input type="number" placeholder="🪑 Available Seats" value={newWorkshop.available_seats}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, available_seats: e.target.value })} className="w-full p-3 border rounded-md" />
            <textarea placeholder="📝 Description" value={newWorkshop.description}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
              rows={3} className="w-full p-3 border rounded-md" />
            <button onClick={handleAddWorkshop}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition">
              🚀 Upload Workshop
            </button>
          </div>
        </div>

        {/* List of Workshops */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">📚 Uploaded Workshops</h3>
          {loading ? (
            <p className="text-blue-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : workshops.length === 0 ? (
            <p className="text-gray-500">No workshops available yet.</p>
          ) : (
            <ul className="space-y-4">
              {workshops.map((w) => (
                <li key={w.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                  <h4 className="font-bold text-indigo-900">{w.title}</h4>
                  <p className="text-sm text-gray-700">{w.description}</p>
                  <p className="text-sm text-gray-500"><strong>📅 Date:</strong> {w.date}</p>
                  <p className="text-sm text-gray-500"><strong>📍 Location:</strong> {w.location}</p>
                  <p className="text-sm text-gray-500"><strong>🪑 Seats:</strong> {w.available_seats}</p>
                  {w.image && <img src={w.image} alt={w.title} className="mt-2 w-full h-40 object-cover rounded-md" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;