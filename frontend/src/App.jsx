import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/navbar";
import Front from "./components/Front/front";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import About from "./components/About/about"
import Contact from "./components/Contact/contact"
import Services from "./components/Services/services";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<Front />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;