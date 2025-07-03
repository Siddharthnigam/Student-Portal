import React from 'react';
import { motion } from 'framer-motion';

function Items() {
  const features = [
    {
      title: "👨‍🏫 Industry-Leading Mentorship",
      description:
        "Learn from expert instructors who guide you with real-world insights and personalized feedback.",
    },
    {
      title: "📘 Cutting-Edge Courses",
      description:
        "Master in-demand skills like Python, Django, AI, Web Dev & more — curated to meet today’s job market.",
    },
    {
      title: "🧪 Hands-On Workshops",
      description:
        "Apply concepts through live projects, coding challenges, and collaborative development sessions.",
    },
    {
      title: "🤖 AI & Tech Services",
      description:
        "Get access to cutting-edge tools and guidance in AI, APIs, data science, and automation technologies.",
    },
    {
      title: "🎥 Curated Video Library",
      description:
        "Review concepts anytime with our expert-recorded video library, available 24/7 for your pace.",
    },
    {
      title: "🎯 Guaranteed Job Support",
      description:
        "We don’t just train — you graduate with interview prep, resume help, and job placement assistance.",
    },
  ];

  return (
    <div>
      <section className="py-16 px-6 lg:px-24 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-extrabold text-blue-700 mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-blue-500">Miracle IT Career Academy?</span>
          </motion.h2>

          <motion.p
            className="text-blue-800 text-xl font-medium mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Where ambition meets mentorship, and passion turns into profession.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 border border-blue-100 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 transform"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-3">{item.title}</h3>
                <p className="text-gray-800 text-lg font-medium">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Items;