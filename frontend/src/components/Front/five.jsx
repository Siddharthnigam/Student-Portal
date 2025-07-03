import React from 'react';
import { motion } from 'framer-motion';
import three from '../img/three.png';

const CareerBenefits = () => {
  return (
    <motion.div
      className="flex items-center justify-center max-w-screen min-h-[74vh] bg-[#f0f6ff]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative ml-8 w-1/2"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={three}
          alt="Person using a mobile phone"
          className="w-full h-auto rounded-lg"
        />
      </motion.div>

      <motion.div
        className="flex w-1/2 flex-col text-center"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-3xl font-semibold text-start">
          77% of learners report career benefits, like landing a new job, earning a promotion, gaining applicable skills, and more.<sup>1</sup>
        </p>

        <p className="text-2xl font-semibold text-start mt-4">
          Learners also experience personal growth — improving confidence, expanding professional networks, and taking on meaningful challenges in their career journey.<sup>2</sup>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 w-60 py-2 border bg-blue-600 text-white rounded-md transition"
        >
          Start Today
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CareerBenefits;