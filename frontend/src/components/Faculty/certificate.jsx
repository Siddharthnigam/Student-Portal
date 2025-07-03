import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    level: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/certificates/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCertificates(response.data);
      } catch (error) {
        console.error("❌ Error fetching certificates:", error);
        setError("Failed to load certificates.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleAddCertificate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/certificates/", newCertificate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificates([...certificates, response.data]);
      alert("✅ Certificate uploaded successfully!");
      setNewCertificate({ title: "", description: "", image: "", duration: "", level: "" });
    } catch (error) {
      console.error("❌ Error uploading certificate:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-900 text-center drop-shadow-md">
        📄 Faculty Certificate Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Certificate */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">🆕 Upload New Certificate</h3>
          <div className="space-y-4">
            <input type="text" placeholder="🏷️ Title" value={newCertificate.title}
              onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
              className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="🖼️ Image URL" value={newCertificate.image}
              onChange={(e) => setNewCertificate({ ...newCertificate, image: e.target.value })}
              className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="⏱️ Duration" value={newCertificate.duration}
              onChange={(e) => setNewCertificate({ ...newCertificate, duration: e.target.value })}
              className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="📊 Level" value={newCertificate.level}
              onChange={(e) => setNewCertificate({ ...newCertificate, level: e.target.value })}
              className="w-full p-3 border rounded-md" />
            <textarea placeholder="📝 Description" value={newCertificate.description}
              onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
              rows={4}
              className="w-full p-3 border rounded-md" />
            <button onClick={handleAddCertificate} className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
              🚀 Upload Certificate
            </button>
          </div>
        </div>

        {/* List Certificates */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">📑 Uploaded Certificates</h3>
          {loading ? (
            <p className="text-blue-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : certificates.length === 0 ? (
            <p className="text-gray-500">No certificates available.</p>
          ) : (
            <ul className="space-y-4">
              {certificates.map((cert) => (
                <li key={cert.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                  <h4 className="font-bold text-indigo-900">{cert.title}</h4>
                  <p className="text-sm text-gray-700">{cert.description}</p>
                  <p className="text-sm text-gray-500"><strong>Duration:</strong> {cert.duration}</p>
                  <p className="text-sm text-gray-500"><strong>Level:</strong> {cert.level}</p>
                  {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-40 mt-2 object-cover rounded-md" />}
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