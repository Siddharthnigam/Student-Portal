import React from "react";
import { Link } from "react-router-dom";
import one from "../img/one.png"
import two from "../img/two.png"
import three from "../img/three.png"
import four from "../img/six.png"



const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-10 space-y-14 text-black">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 animate-fade-in-down">
        🧑‍🏫 Faculty Dashboard
      </h2>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 animate-slide-in-left">
        <img
          src={one}
          alt="Students"
          className="w-[180px] h-[120px] rounded-md shadow-md object-cover"
        />
        <div className="md:max-w-[65%] text-left">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">👨‍🎓 Manage Students</h3>
          <p className="text-base text-gray-800">
            View, edit, and track student progress and academic records. Ensure mentoring and engagement are on point.
          </p>
          <Link to="/student">
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Manage Students
            </button>
          </Link>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 animate-slide-in-right">
        <img
src={two}     
     alt="Courses"
          className="w-[180px] h-[120px] rounded-md shadow-md object-cover"
        />
        <div className="md:max-w-[65%] text-left">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">📘 Manage Courses</h3>
          <p className="text-base text-gray-800">
            Create, edit, and organize curriculum details. Control media and lesson visibility — everything in one place.
          </p>
          <Link to="/course">
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Manage Courses
            </button>
          </Link>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 animate-slide-in-left">
        <img
src={four}          alt="Workshops"
          className="w-[180px] h-[120px] rounded-md shadow-md object-cover"
        />
        <div className="md:max-w-[65%] text-left">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">🛠️ Workshops</h3>
          <p className="text-base text-gray-800">
            Host interactive learning sessions. Showcase topics, capacity, dates, and get students engaged dynamically.
          </p>
          <Link to="/workshop">
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Manage Workshops
            </button>
          </Link>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 animate-slide-in-right">
        <img
src={three}          alt="Certificates"
          className="w-[180px] h-[120px] rounded-md shadow-md object-cover"
        />
        <div className="md:max-w-[65%] text-left">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">🎓 Certificates</h3>
          <p className="text-base text-gray-800">
            Generate and award student credentials for completed courses and workshops. Recognize and celebrate success.
          </p>
          <Link to="/certificate">
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Manage Certificates
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;