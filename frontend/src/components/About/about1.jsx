import React from 'react';
import one from '../img/four.png';
import two from '../img/six.jpg';

const AboutAngelaDoe = () => {
  return (
    <>
      {/* Hero Image */}
      <div>
        <img src={two} className="w-full" alt="Banner" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center bg-white p-6">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Peoples's Academy  🚀</h1>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed">
            👩‍🏫 With 21+ years of teaching experience, Angela is one of our most passionate mentors at <span className="text-blue-600 font-semibold">Miracle IT Career Academy</span>. She specializes in making complex tech and science topics ✨crystal clear✨ for learners of all levels.
          </p>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed">
            💻 From personalized sessions to collaborative coding challenges, Angela blends curiosity with confidence to help students grow — whether you're exploring AI, web development, or core concepts in Physics.
          </p>
          
        </div>

        {/* Profile Image */}
        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <img
            src={one}
            alt="Angela Doe teaching"
            className="rounded-lg w-[70%] shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default AboutAngelaDoe;