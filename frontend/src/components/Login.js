import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/authMainService';
import '../styles/Login.css';
import { ArrowLeftCircle } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      toast.success("Login Successful!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="Sbody">
      <div className="LoginContain">
        <div className="overlayL">
          <button className="back-icon" onClick={() => navigate('/')}>
            <ArrowLeftCircle size={40} />
          </button>
          <div className="login-container">
            <div className="login-box">
              <h2 className="login-title">LOGIN</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="login-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
                <button type="submit" className="login-button">LOGIN</button>
              </form>
              <div className="signup-redirect">
                Don’t have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Signup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
