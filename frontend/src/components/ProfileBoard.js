// ProfileBoard.js
import React from "react";
import "../styles/ProfileBoard.css";

const ProfileBoard = ({ username, score, onClose }) => {
  return (
    <div className="profile-board-overlay" onClick={onClose}>
      <div className="profile-board" onClick={(e) => e.stopPropagation()}>
        <span className="close-icons" onClick={onClose}>❌</span>
        <h3>Player Profile</h3>
        <div className="buttonsss"> Player Name: {username}</div>
        <div className="buttonsss"> Total Score: {score} 🏆</div>
        
      </div>
    </div>
  );
};

export default ProfileBoard;