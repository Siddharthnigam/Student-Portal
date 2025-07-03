import React, { useEffect, useState } from "react";
import axios from "axios";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModeId, setEditModeId] = useState(null);
  const [editData, setEditData] = useState({});

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/students/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (err) {
      console.error("❌ Error fetching students:", err.response?.data || err.message);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setEditModeId(student.id);
    setEditData({
      username: student.username || "",
      enrollment_number: student.enrollment_number || "",
      email: student.email || "",
      phone: student.phone || "",
      address: student.address || "",
      courses: student.courses || "",
      grades: student.grades || "",
      certificates: student.certificates || "",
      fee_paid: student.fee_paid || 0,
      fee_due: student.fee_due || 0,
      attendance_percentage: student.attendance_percentage || 0,
    });
  };

  const handleUpdate = async (studentId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/students/${studentId}/`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModeId(null);
      fetchStudents();
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      alert("Could not update student.");
    }
  };

  const filteredStudents = students.filter((s) =>
    s.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.enrollment_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-900">👨‍🎓 Student Directory</h2>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or enrollment number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
      </div>

      {loading && <p className="text-center text-blue-600">Loading students...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition space-y-2">
              {editModeId === student.id ? (
                <>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    value={editData.enrollment_number}
                    onChange={(e) => setEditData({ ...editData, enrollment_number: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Enrollment Number"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Phone"
                  />
                  <textarea
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    value={editData.courses}
                    onChange={(e) => setEditData({ ...editData, courses: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Courses (comma-separated)"
                  />
                  <input
                    type="text"
                    value={editData.grades}
                    onChange={(e) => setEditData({ ...editData, grades: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Grades (e.g. Math:A, Physics:B)"
                  />
                  <input
                    type="text"
                    value={editData.certificates}
                    onChange={(e) => setEditData({ ...editData, certificates: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Certificates (comma-separated)"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={editData.fee_paid}
                      onChange={(e) => setEditData({ ...editData, fee_paid: parseFloat(e.target.value) })}
                      className="w-1/2 p-2 border rounded"
                      placeholder="Fee Paid"
                    />
                    <input
                      type="number"
                      value={editData.fee_due}
                      onChange={(e) => setEditData({ ...editData, fee_due: parseFloat(e.target.value) })}
                      className="w-1/2 p-2 border rounded"
                      placeholder="Fee Due"
                    />
                  </div>
                  <input
                    type="number"
                    value={editData.attendance_percentage}
                    onChange={(e) => setEditData({ ...editData, attendance_percentage: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded"
                    placeholder="Attendance Percentage (%)"
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => handleUpdate(student.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditModeId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-indigo-800">{student.username}</h3>
                  <p className="text-sm text-gray-600">📘 Enrollment: {student.enrollment_number}</p>
                  <p className="text-sm text-gray-600">📞 Phone: {student.phone || "N/A"}</p>
                  <p className="text-sm text-gray-600">📧 Email: {student.email || "N/A"}</p>
                  <p className="text-sm text-gray-600">🏠 Address: {student.address || "N/A"}</p>
                  <p className="text-sm text-gray-600">📚 Courses: {student.courses || "N/A"}</p>
                  <p className="text-sm text-gray-600">📊 Grades: {student.grades || "N/A"}</p>
                  <p className="text-sm text-gray-600">🏅 Certificates: {student.certificates || "N/A"}</p>
                  <p className="text-sm text-gray-600">💸 Fee Paid: ₹{student.fee_paid || 0}</p>
                  <p className="text-sm text-gray-600">💸 Fee Due: ₹{student.fee_due || 0}</p>
                  <p className="text-sm text-gray-600">📅 Attendance: {student.attendance_percentage || 0}%</p>
                  <button
                    onClick={() => handleEditClick(student)}
                    className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                  >
                    Edit 
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-500">No matching students found.</p>
        )
      )}
    </div>
  );
};

export default AllStudents;