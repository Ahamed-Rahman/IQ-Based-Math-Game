import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Leaderboard.css"; // Import the CSS file
import { fetchLeaderboard } from "../services/leaderboardService"; // ✅ Import API Service
import { ArrowLeftCircle } from "lucide-react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  // ✅ Fetch leaderboard using the new service
  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error("Error loading leaderboard", err);
    }
  };

  return (
    <div className="Sbody">
      
      <div className="SignContainer">
    <div className="overlayU">
      <h2 className="leaderboard-title">🏆 Leaderboard 🏆</h2>
      <div className="leaderboard-box">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr key={user._id} className="leaderboard-row">
                  <td>🥇 {index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No players yet! 😢</td>
              </tr>
            )}
          </tbody>
        </table>

    
    
      <button className="back-icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeftCircle size={40} />
          </button>
    
    </div>
    </div>
    </div>
    </div>
  );
};

export default Leaderboard;
