import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const { addNotification } = useContext(AuthContext); // 🔥 Notifications integrated

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://127.0.0.1:8000/admin-data/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
        setPayments(res.data.payments);

        const studentRes = await axios.get("http://127.0.0.1:8000/admin/students/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(studentRes.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const assignGrade = async (studentId, grade) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://127.0.0.1:8000/admin/grades/${studentId}`, { grade }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      addNotification(`📌 Grade '${grade}' assigned to Student ID: ${studentId}`); // 🔥 Notify student
      alert("Grade assigned successfully!");
    } catch (error) {
      console.error("Error assigning grade:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Admin Dashboard</h2>

      {/* User Management */}
      <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.role}</li>
        ))}
      </ul>

      {/* Payment Tracking */}
      <h3 className="text-xl font-semibold mt-4">Fee Payments</h3>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>User: {payment.username} - Status: {payment.status}</li>
        ))}
      </ul>

      {/* Grade Assignment */}
      <h3 className="text-xl font-semibold mt-4">Assign Grades</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - 
            <select onChange={(e) => assignGrade(student.id, e.target.value)}>
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;