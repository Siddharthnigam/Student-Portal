import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Column */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-600">💡 Miracle IT Academy</h3>
          <p className="text-gray-600 text-sm">
            Empowering your tech career through expert mentorship, hands-on learning, and job-ready programs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">🔗 Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">📘 Courses</a></li>
            <li><a href="#" className="hover:underline">🛠️ Workshops</a></li>
            <li><a href="#" className="hover:underline">🤖 AI Services</a></li>
            <li><a href="#" className="hover:underline">🎯 Job Assistance</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">📞 Contact</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>📧 info@miracleit.ac.in</li>
            <li>📱 +91-98765-43210</li>
            <li>📍 Indore, Madhya Pradesh</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-4">📰 Subscribe for Updates</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-blue-200 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="text-center md:text-left mb-2 md:mb-0">
          © 2025 Miracle IT Career Academy. All rights reserved.
        </p>

        <div className="flex space-x-4 text-blue-600">
          <a href="#" className="hover:text-blue-800 transition">🌐</a>
          <a href="#" className="hover:text-blue-800 transition">🐦</a>
          <a href="#" className="hover:text-blue-800 transition">📸</a>
          <a href="#" className="hover:text-blue-800 transition">💼</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;