import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import one from '../img/one.png';
import two from '../img/bg.png';

const LandingPage = () => {
  return (
    <motion.div
      className="h-[70vh] flex items-center bg-white relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.img
        src={two}
        className="absolute z-0 w-screen h-[70vh] object-cover"
        alt="Background"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative w-full  flex pt-10 z-10">
        <motion.div
          className="flex flex-col pl-20 w-[60%] justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl space-x-6 font-extrabold text-gray-900"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Launch Your <span className="text-blue-600">Tech Career</span> with
            <span className="text-blue-600"> Miracle IT</span> Coaching Classes
          </motion.h1>

          <motion.p
            className="mt-6 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            He preference connection astonished on of ye. Partiality on or continuing in particular principles as. <br />
            Do believing oh disposing to supported allowance we.
          </motion.p>

          <motion.div
            className="mt-6 flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started Today
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;