/*
    Data Baes
    2/28/2025

    Main component of React App. Handles UI, React components, and underlying logic of frontend
*/

import React, {useState, useEffect} from "react";
import axios from "axios";


function App() {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log("Login button clicked! Sending request..."); // Debugging

    try {
        const response = await axios.post("http://localhost:3000/users/login", {
            email, // ✅ Ensure this matches the backend expectation
            password
        });
        console.log("Login Success Response:", response.data); // ✅ Debugging API response
        setMessage(response.data.message);
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        setMessage(error.response?.data?.message || "Login failed");
    }
};
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email} // Updated state variable
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default App;