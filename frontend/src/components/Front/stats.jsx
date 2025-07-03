import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "👨‍🏫 Expert Mentorship",
    description:
      "Our mentors don't just teach—they coach, support, and empower you with real-world knowledge and confidence.",
  },
  {
    title: "📚 Structured Courses",
    description:
      "From Python and Django to AI and full-stack, we’ve got your learning curve mapped and mastered.",
  },
  {
    title: "🛠️ Practical Workshops",
    description:
      "Build. Collaborate. Launch. Our workshops bring ideas to life through hands-on coding and teamwork.",
  },
  {
    title: "🤖 AI Assistant",
    description:
      "Get instant study support and project help — your AI buddy is always ready to guide you.",
  },
  {
    title: "🎥 Educational Video Library",
    description:
      "On-demand learning at your pace. Replay tutorials, revise topics, and never miss a beat.",
  },
  {
    title: "🧠 Gamified Quizzes",
    description:
      "Challenge your brain, climb the leaderboard, and make learning fun with interactive games and quizzes.",
  },
];

const ServicesOverview = () => {
  return (
    <div className="w-full min-h-screen py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-center text-blue-700 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🚀 Your Journey Starts with Miracle IT
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg p-8 rounded-xl border-l-8 border-blue-500 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3">
                {service.title}
              </h2>
              <p className="text-gray-700 text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;