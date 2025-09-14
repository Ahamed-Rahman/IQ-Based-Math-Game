import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css'; // Importing the dashboard CSS

const Dashboard = () => {
  const [showLevels, setShowLevels] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (!token) {
      navigate('/login'); // Redirect if not logged in
    } else {
      setUsername(storedUsername);
      fetchUserScore(token);
    }
  }, [navigate]);

  // ✅ Fetch User's Current Score
  const fetchUserScore = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/auth/user', {
        headers: { Authorization: token },
      });
      setScore(res.data.score);
    } catch (error) {
      console.error('Error fetching user score', error);
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // ✅ Show Game Levels
  const handlePlayGame = () => {
    setShowLevels(true);
  };

  const handleCloseLevels = () => {
    setShowLevels(false);
  };

  // ✅ Start Game
  const handleStartGame = () => {
    if (selectedLevel) {
      navigate('/game', { state: { level: selectedLevel } });
    } else {
      alert('Please select a difficulty level');
    }
  };

  return (
    <div className="Dbody">
      <div className="SignContainer">
        <div className="overlayD">
          <div className="dashboard-container">
            <h2>Welcome, {username}!</h2>
            <h2>Your Current Score: {score} 🏆</h2>

            <div className="menu">
              <button className="buttonss" onClick={() => navigate('/leaderboard')}>LEADERBOARD</button>
              <button className="buttonss" onClick={handlePlayGame}>PLAY GAME</button>
              <button className="buttonss" onClick={handleLogout}>QUIT GAME</button>
            </div>

            {showLevels && (
              <>
                <div className="overlay active" onClick={handleCloseLevels}></div>
                <div className="levels active">
                  <span className="close-icon" onClick={handleCloseLevels}>❌</span>
                  <div className="headd"><h3>Select Difficulty Level</h3></div>
                  <label>
                    <input
                      type="radio"
                      value="Easy"
                      checked={selectedLevel === 'Easy'}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    Easy
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Medium"
                      checked={selectedLevel === 'Medium'}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Hard"
                      checked={selectedLevel === 'Hard'}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    Hard
                  </label>
                  <div className="btn">
                    <button className="level-button" onClick={handleStartGame}>Start Game</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
