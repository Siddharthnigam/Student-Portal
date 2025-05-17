import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h3>{course.name} ({course.code})</h3>
              <p>{course.description}</p>
              <p><strong>Syllabus:</strong> {course.syllabus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CoursesList;