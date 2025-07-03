import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import two from "../img/two.png";

const CourseraAd = () => {
  return (
    <motion.div
      className="bg-gray-100 flex justify-center items-center h-[60vh] max-w-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="bg-[#f0f6ff] p-12 rounded-lg shadow-lg flex flex-col md:flex-row w-full h-full"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="md:w-1/2 md:pl-8 flex flex-col justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Achieve your career goals with Miracle IT
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Enroll today to gain in-demand tech skills with expert-led training at Miracle IT Career Academy.
          </p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 w-72 text-white py-3 px-8 rounded-lg text-lg font-semibold mb-6 hover:bg-blue-700"
            >
              Start Your Journey
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center items-center"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={two} alt="Coursera Plus" className="w-full h-auto rounded-lg" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CourseraAd;