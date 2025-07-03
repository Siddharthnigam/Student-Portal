import React from 'react';

const StatsPage = () => {
  return (
    <div className="flex flex-col py-20 items-center  bg-[#f0f6ff] justify-center ">
      <div className="text-center">
        <h1 className="text-6xl text-gray-600 font-bold mb-3">My Stats show that I've <br /> Happy Students</h1>
        <p className="text-gray-500 text-2xl font-bold mt-8 mb-6">And excellence partiality estimating terminated day everything.</p><br />
        <div className="grid grid-cols-2 pt-4 md:grid-cols-4 gap-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600">25,356</div>
            <p className="text-gray-500">Students Enrolled</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600">1,050</div>
            <p className="text-gray-500">Hours of Tutorials</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-600">12</div>
            <p className="text-gray-500">Subjects</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600">95%</div>
            <p className="text-gray-500">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
