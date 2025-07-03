import React, { useState, useEffect } from "react";
import axios from "axios";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/certificates/");
        setCertificates(response.data);
      } catch (err) {
        console.error("❌ Error fetching certificates:", err);
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleSendCertificate = () => {
    if (!email.includes("@gmail.com") || phone.trim().length < 10) {
      alert("❗ Please enter a valid Gmail address and phone number.");
      return;
    }

    alert(`✅ Certificate sent successfully to ${email} and ${phone}`);
    setEmail("");
    setPhone("");
    setSelectedCert(null);
    setShowModal(false);
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🎓 Awarded Certificates</h2>

      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="🔎 Search your certificate by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
      </div>

      {loading && <p className="text-center text-blue-500 font-semibold">Loading certificates...</p>}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      {!loading && !error && filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">{cert.title}</h3>
              <p className="text-gray-700">{cert.description}</p>
              <p className="text-sm text-gray-500"><strong>Duration:</strong> {cert.duration}</p>
              <p className="text-sm text-gray-500"><strong>Level:</strong> {cert.level}</p>
              <button
                onClick={() => {
                  setSelectedCert(cert);
                  setShowModal(true);
                }}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                📩 Get Certificate
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-gray-600">No certificates match your search.</p>
        )
      )}

      {showModal && selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-80">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Send Certificate</h3>
            <p className="text-gray-600 text-sm mb-4">
              For: <strong>{selectedCert.title}</strong>
            </p>

            <input
              type="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendCertificate}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateList;