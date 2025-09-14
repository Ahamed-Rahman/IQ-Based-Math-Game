import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";
import { UserCircle, Music, XCircle } from "lucide-react";
import { MusicContext } from "../context/MusicProvider";
import ProfileBoard from "../components/ProfileBoard";  // Import ProfileBoard

const Dashboard = () => {
  const { musicOn, setMusicOn } = useContext(MusicContext);
  const [showProfileBoard, setShowProfileBoard] = useState(false);

  const [showLevels, setShowLevels] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
      fetchUserScore(token);
    }
  }, [navigate]);

  const fetchUserScore = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/auth/user", {
        headers: { Authorization: token },
      });
      setScore(res.data.score);
    } catch (error) {
      console.error("Error fetching user score", error);
    }
  };

  const toggleMusic = () => {
    const newMusicState = !musicOn;
    setMusicOn(newMusicState);
    localStorage.setItem("music", newMusicState ? "on" : "off");
  };

  const handlePlayGame = () => {
    setShowLevels(true);
  };

  const handleCloseLevels = () => {
    setShowLevels(false);
  };

  const handleStartGame = () => {
    if (selectedLevel) {
      navigate("/game", { state: { level: selectedLevel } });
    } else {
      alert("Please select a difficulty level");
    }
  };

  return (
    <div className="Dbody">
      {showProfileBoard && (
        <ProfileBoard username={username} score={score} onClose={() => setShowProfileBoard(false)} />
      )}
      {(showSettings || showLevels) && <div className="overlay active"></div>}

      <div className="SignContainer">
        <div className="overlayD">
    
        <div className="profile-icon" onClick={() => setShowProfileBoard(true)}>
            <UserCircle size={40} />
          </div>
          <p className="un">{username}</p>


       
          <div className="dashboard-container">
            <h2>Welcome, {username || "Player"}!</h2>
            <h2>Your Current Score: {score} 🏆</h2>

            <div className="menu">
              <button className="buttonss" onClick={() => navigate("/leaderboard")}>
                LEADERBOARD
              </button>
              <button className="buttonss" onClick={handlePlayGame}>
                PLAY GAME
              </button>
              <button className="buttonss" onClick={() => setShowSettings(true)}>
                SETTINGS
              </button>
              <button className="buttonss" onClick={() => navigate("/login")}>QUIT GAME</button>
            </div>

            {showLevels && (
              <>
                <div className="overlay active" onClick={handleCloseLevels}></div>
                <div className="levels active">
                  <span className="close-icon" onClick={handleCloseLevels}>❌</span>
                  <div className="headd"><h3>Select Difficulty Level</h3></div>
                  <label className={selectedLevel === "Easy" ? "selected-level" : ""}>
                    <input
                      type="radio"
                      value="Easy"
                      checked={selectedLevel === "Easy"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    Easy
                  </label>
                  <label className={selectedLevel === "Medium" ? "selected-level" : ""}>
                    <input
                      type="radio"
                      value="Medium"
                      checked={selectedLevel === "Medium"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    Medium
                  </label>
                  <label className={selectedLevel === "Hard" ? "selected-level" : ""}>
                    <input
                      type="radio"
                      value="Hard"
                      checked={selectedLevel === "Hard"}
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

            {showSettings && (
              <div className="settings-overlay">
                <div className="settings-container">
                  <button className="close-settings" onClick={() => setShowSettings(false)}>
                    <XCircle size={30} color="red" />
                  </button>
                  <h3>Settings</h3>
                  <div className="music-toggle">
                    <Music size={30} style={{ marginRight: "10px" }} />
                    <button className="toggle-button" onClick={toggleMusic}>
                      {musicOn ? "Music: ON 🎵" : "Music: OFF 🔇"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
