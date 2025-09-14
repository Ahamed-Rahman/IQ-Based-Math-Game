import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../services/authMainService';
import '../styles/signup.css';
import { ArrowLeftCircle } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password);
      toast.success("Signup Successful!");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="Sbody">
      <div className="SignContainer">
        <div className="overlayS">
          <button className="back-icon" onClick={() => navigate('/')}>
            <ArrowLeftCircle size={40} />
          </button>
          <div className="signup-container">
            <div className="signup-box">
              <h2 className="signup-title">SIGNUP</h2>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="signup-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="signup-input"
                />
                <button type="submit" className="signup-button">SIGNUP</button>
              </form>
              <div className="login-redirect">
                Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
