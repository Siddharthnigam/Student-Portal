import React from 'react';

const Navbar = () => {
  return (
    
    <nav className="flex items-center justify-between p-4 bg-white">
      {/* Logo and Name */}
      <div className="flex items-center">
        <div className="bg-green-500 ml-10 rounded-full p-4">
          {/* Logo can go here */}
        </div>
        <span className="ml-2 text-gray-800 text-4xl font-bold"> Miracle IT</span>
      </div>

      {/* Menu Links */}
      <div className="flex gap-16 font-bold text-[1.3rem] space-x-4">
        <a href="#about" className="text-gray-600  hover:text-gray-900">Services Offered</a>
        <a href="#courses" className="text-gray-600 hover:text-gray-900">Course Offered</a>
        <a href="#about" className="text-gray-600  hover:text-gray-900">About Me</a>
        <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
      </div>

      {/* CTA Button */}
      <div className="bg-green-500 p-4">
        <button className="bg-black text-white py-2 px-4 rounded">Get Started Today</button>
      </div>
    </nav>


  );
};

export default Navbar;