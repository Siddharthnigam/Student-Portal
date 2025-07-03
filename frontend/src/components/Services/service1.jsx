import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "📚 Courses",
    description: "Browse available courses with detailed content, duration, and skill levels designed for learners.",
    link: "/courselist",
    button: "View Courses",
  },
  {
    title: "🎓 Certificate Handling",
    description: "Access and download your verified certificates securely in one place.",
    link: "/cerlist",
    button: "View Certificates",
  },
  {
    title: "🛠️ Workshops",
    description: "Participate in academic and career-building workshops that offer practical experience.",
    link: "/workshoplist",
    button: "Join Workshops",
  },
  {
    title: "🤖 AI Assistant",
    description: "Get instant answers, study help, and project guidance from your personal AI learning buddy.",
    link: "/ai",
    button: "Launch Assistant",
  },
  {
    title: "🎥 Educational Video Library",
    description: "Watch curated lessons from experts anytime — rewatch, rewind, and reinforce.",
    link: "/video",
    button: "Browse Videos",
  },
  {
    title: "🧠 Quiz Game",
    description: "Test your knowledge and compete with friends in fun, timed quizzes.",
    link: "/quizgame",
    button: "Play Quiz",
  },
];

const ServicePage = () => {
  return (
    <motion.div
      className="min-h-screen bg-white py-12 px-6 lg:px-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold text-indigo-800 text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        💼 Explore Your Learning Tools
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{service.title}</h3>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <Link to={service.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                {service.button}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicePage;