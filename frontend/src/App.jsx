import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Header/navbar";
import Front from "./components/Front/front";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import Services from "./components/Services/services";
import StudentDashboard from "./components/Dashboards/StudentDashboard";
import FacultyDashboard from "./components/Dashboards/FacultyDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import Footer from './components/Footer/Footer'
import CourseList from './components/Function/courselist'
import Course from './components/Faculty/course'
import Certificate from './components/Faculty/certificate'
import Cerlist from './components/Function/cerlist'
import Workshop from './components/Faculty/workshop'
import Workshoplist from "./components/Function/workshoplist";
import Student from "./components/Faculty/student"
import Ai from "./components/Function/ai"
import Video from "./components/Function/video"
import Quiz from "./components/Function/quiz"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Front />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/courseList" element={<CourseList />} />
            <Route path="/course" element={<Course />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/cerlist" element={<Cerlist />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/workshoplist" element={<Workshoplist />} />
            <Route path="/student" element={<Student />} />
            <Route path="/ai" element={<Ai />} />
            <Route path="/video" element={<Video />} />
            <Route path="/quizgame" element={<Quiz />} />






            {/* Role-Specific Dashboards */}
            <Route element={<PrivateRoute allowedRoles={["student"]} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["faculty"]} />}>
              <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

