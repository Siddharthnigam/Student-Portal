import React from 'react';
import one from '../img/one.png'

const LandingPage = () => {
  return (
    <div className="max-h-screen p-10  ">
      <div className=" w-full flex pt-10 ">
        
        {/* Left Side - Text Content */}
        <div className=" flex flex-col pt-10 pl-20 w-[60%] justify-center">
          <h1 className="text-7xl space-x-6 font-bold text-gray-800">
            Advanced <span className="text-green-600 ">Physics</span> with 
            <span className="text-green-600"> Expert</span> Online Tutoring
          </h1>
          <p className="mt-4 text-gray-600">
            He preference connection astonished on of ye. Partiality on or continuing in particular principles as. 
            Do believing oh disposing to supported allowance we.
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
              Get Started Today
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <img src="trustpilot.png" alt="Trustpilot Rating" className="w-20" />
            <div className="flex space-x-2">
              <img src="user1.png" alt="User 1" className="w-8 h-8 rounded-full" />
              <img src="user2.png" alt="User 2" className="w-8 h-8 rounded-full" />
              <img src="user3.png" alt="User 3" className="w-8 h-8 rounded-full" />
              <span className="text-gray-600 text-sm">+9k learners</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-[40%] justify-center items-center">
          <img src={one} alt="Tutoring session" className="w-[80%]  object-cover rounded-lg" />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;