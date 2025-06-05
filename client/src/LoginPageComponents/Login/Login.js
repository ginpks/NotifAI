import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { deploymentMode, backendPort, backendHost, backendBaseURL } from '../../App';
import { useStatusMessage } from "../../StatusMessageProvider";

function Login() {
  const {notify} = useStatusMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const stored = localStorage.getItem("statusMessage");
    if (stored) {
      const {message, type} = JSON.parse(stored)
      notify(message, type)
      localStorage.removeItem("statusMessage");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked! Sending request...");

    try {
      const response = await axios.post(backendBaseURL + "/users/login", {
        email: username, // Using username input for email
        password,
      }, { withCredentials: true }); // send cookies with request
      localStorage.setItem("statusMessage", JSON.stringify({message: "Successfully Logged In!", type: "success"}));
      console.log("Login Success Response:", response.data);
      setMessage(response.data.message);

      window.location.href="/main"; // Navigate to the /main route
    } catch (error) {
      notify("Failed to Log In", "error")
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Brand section with illustration */}
      <div className="brand-section">
        <h1 className="brand-name">NotifAI</h1>
        <img 
          src="/images/Login_clipart.png" 
          alt="Person working on laptop" 
          className="illustration"
        />
      </div>

      {/* Login form section */}
      <div className="login-form-section">
        <h2 className="login-header">Sign in</h2>
        

        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            
            <input 
              type="text"
              className="form-control"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
              <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Sign in
          </button>
          <button
            type="button"
            className="signup-button"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
