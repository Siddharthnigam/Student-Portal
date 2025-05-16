import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        email,
        password,
     }, {
        headers: { "Content-Type": "application/json" }
     });
  
      if (response.data.message) {
        setMessage("Login successful! Welcome, " + response.data.user.name);
      } else {
        setMessage("Login failed! Please check your credentials.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed! Server error.");
      console.error("Login error:", error.response?.data);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default App;