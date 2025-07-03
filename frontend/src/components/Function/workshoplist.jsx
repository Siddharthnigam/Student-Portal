import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/workshops/");
        setWorkshops(response.data);
      } catch (err) {
        console.error("❌ Error fetching workshops:", err);
        setError("Failed to load workshops.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter((w) =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!email.includes("@gmail.com") || phone.trim().length < 10) {
      alert("❗ Please enter a valid Gmail and phone number.");
      return;
    }
    alert(`✅ Our team will contact you at ${phone} and ${email}`);
    setEmail("");
    setPhone("");
    setShowModal(false);
  };

  return (
    <motion.div
      className="p-8 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        🛠️ Upcoming Workshops
      </motion.h2>

      <motion.div
        className="mb-8 max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <input
          type="text"
          placeholder="🔎 Search workshop by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
      </motion.div>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((w, index) => (
            <motion.div
              key={w.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={w.image} alt={w.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">{w.title}</h3>
              <p className="text-gray-700">{w.description}</p>
              <p className="text-sm text-gray-500"><strong>Date:</strong> {w.date}</p>
              <p className="text-sm text-gray-500"><strong>Location:</strong> {w.location}</p>
              <p className="text-sm text-gray-500"><strong>Seats:</strong> {w.available_seats}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedWorkshop(w);
                  setShowModal(true);
                }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                📩 Enquire
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-gray-500">No workshops match your search.</p>
        )
      )}

      {/* 📬 Enquiry Modal */}
      <AnimatePresence>
        {showModal && selectedWorkshop && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 w-80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Enquiry for: {selectedWorkshop.title}
              </h3>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkshopList;