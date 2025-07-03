import React, { useState } from "react";
import { motion } from "framer-motion";

const FetchYouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const apiKey = "AIzaSyC9OIOd-fL17bhyt1Noyd02CVEQGIkU7Nw";

  const fetchVideos = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&part=snippet,id&type=video&videoDuration=medium&order=date&maxResults=10`
      );
      if (!response.ok) throw new Error("Failed to fetch videos");

      const data = await response.json();
      setVideos(data.items);
      setError("");

      let currentCoins = parseInt(localStorage.getItem("coins") || "0", 10);
      localStorage.setItem("coins", currentCoins + 5);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching videos.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Banner Image */}
      <motion.div
        className="w-full h-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/recipe-banner.jpg')" }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center h-20 bg-white bg-opacity-40">
          <h1 className="text-4xl font-bold text-indigo-800">
            Search any educational video
          </h1>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="flex justify-center mt-1 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchVideos()}
          className="w-full max-w-2xl border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchVideos}
          className="ml-3 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </motion.button>
      </motion.div>

      {/* Video Results */}
      <div className="mt-10 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {videos.map((video, index) => (
          <motion.div
            key={video.id.videoId}
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <iframe
              width="100%"
              height="240"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md shadow"
            ></iframe>
            <p className="mt-2 text-sm font-medium">{video.snippet.title}</p>
          </motion.div>
        ))}
      </div>

      {error && (
        <motion.p
          className="text-center mt-6 text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FetchYouTubeVideos;