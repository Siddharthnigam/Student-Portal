import React from 'react';

const About = () => {
  return (
    <div className="about flex justify-center p-8">
      <div className="about-container p-8  rounded-lg shadow-md w-full">
        <div className="map-container mt-8">
         <center> <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.9105257439173!2d75.27986102093796!3d23.427599083102553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963f5dbd30f5071%3A0x3d14cca822908f31!2sVision%20Computer%20Academy!5e0!3m2!1sen!2sin!4v1617610506459!5m2!1sen!2sin"
            width="50%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe></center>
        </div>
      </div>
    </div>
  );
};

export default About;
