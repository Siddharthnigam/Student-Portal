import React from 'react';
import { motion } from 'framer-motion';
import one from '../img/logo/amazon.png';
import two from '../img/logo/microsoft.png';
import three from '../img/logo/gs.png';
import four from '../img/logo/pp.png';
import five from '../img/logo/samsung.png';
import six from '../img/logo/google.png';
import seven from '../img/logo/sf.png';
import eight from '../img/logo/na.png';
import nine from '../img/logo/hit.png';
import ten from '../img/logo/jp.png';
import eleven from '../img/logo/ibm.png';
import twelve from '../img/logo/dell.png';
import thirten from '../img/logo/del.png';
import fourten from '../img/logo/kp.png';
import fiften from '../img/logo/isro.png';
import sixten from '../img/logo/mb.png';
import seventen from '../img/logo/ey.png';
import eighten from '../img/logo/airtel.png';

const logos = [
  one, two, three, four, five, six, seven, eight, nine,
  ten, eleven, twelve, thirten, fourten, fiften, sixten, seventen, eighten
];

const DreamJobPage = () => {
  return (
    <motion.div
      className="flex flex-col max-w-screen items-center justify-center min-h-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center max-w-screen mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl font-semibold">
          Thousands of students achieved their <span className="text-blue-600">dream job</span> at
        </h1>
      </motion.div>

      <div className="grid max-w-screen px-44 grid-cols-6 gap-24">
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            className="h-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        viewport={{ once: true }}
      >
        <p className="text-lg font-medium">+ many more</p>
      </motion.div>
    </motion.div>
  );
};

export default DreamJobPage;