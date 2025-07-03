import React, { useState } from 'react';
import c1 from '../img/four.png';

function About2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-evenly p-6 bg-blue-50">
        {/* Image Section */}
        <div className="lg:w-[50%] flex justify-center items-center mb-8 lg:mb-0">
          <img src={c1} alt="Get in touch illustration" className="w-[70%] h-auto rounded-3xl shadow-md" />
        </div>

        {/* Form Section */}
        <div className="lg:w-[50%]">
          <center>
            <h1 className="text-[7vh] font-bold text-black uppercase">📬 Get in touch with us</h1>
            <h2 className="text-[3.5vh] text-black font-semibold mt-2">
              We'd love to hear from you — whether you're curious about a course, workshop, or tech advice!
            </h2>
          </center>

          <div className="flex justify-between px-10 mt-6 mb-4 text-black font-medium">
            <p>📧 contact@miracleit.ac.in</p>
            <p>📱 +91 98765 43210</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="name" className="font-bold mb-1 text-black block">🙋 Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="font-bold mb-1 text-black block">📧 Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="font-bold mb-1 text-black block">📝 Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-white text-black resize-none h-40"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full text-2xl transition"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About2;