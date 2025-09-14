import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestion, updateScore, fetchUserScore } from "../services/apiService";
import "../styles/Game.css";
import { Home as HomeIcon, Lightbulb } from "lucide-react";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const level = location.state?.level || "Easy";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const getInitialTime = (level) => {
    switch (level) {
      case "Easy": return 30;
      case "Medium": return 20;
      case "Hard": return 10;
      default: return 20;
    }
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(getInitialTime(level));
  const [hint, setHint] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false); // ✅ Track next question button

  useEffect(() => {
    fetchNewQuestion();
    fetchPlayerScore();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Time's up! ⏰");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchPlayerScore = async () => {
    try {
      const data = await fetchUserScore();
      setTotalScore(data.score);
    } catch (err) {
      console.error("Error fetching total score", err);
    }
  };

  const fetchNewQuestion = async () => {
    try {
      const data = await fetchQuestion();
      setQuestion(data.question);
      setAnswer(data.solution);
      setHint("");
      setFeedback("");
      setUserInput("");
      setShowNextQuestion(false); // ✅ Hide next button on new question
    } catch (err) {
      console.error("Error fetching question", err);
    }
  };

  const handleSubmit = async () => {
    if (parseFloat(userInput) === parseFloat(answer)) {
      setFeedback("Correct! 🎉");
      setShowNextQuestion(true); // ✅ Show Next Question button

      try {
        await updateScore(10);
        setTotalScore((prevTotal) => prevTotal + 10);
        fetchPlayerScore();
      } catch (err) {
        console.error("Error updating score", err);
      }
    } else {
      setFeedback("Wrong ❌");
    }

    setUserInput("");
  };

  const handleNumberClick = (num) => {
    setUserInput(num);
  };

  const useHint = async () => {
    if (totalScore < 10) {
      alert("You need at least 10 points to use a hint!");
      return;
    }

    const isEven = parseInt(answer) % 2 === 0;
    setHint(isEven ? "Hint: The answer is an EVEN number! 🔵" : "Hint: The answer is an ODD number! 🔴");

    try {
      await updateScore(-10);
      fetchPlayerScore();
    } catch (err) {
      console.error("Error updating score after hint", err);
    }
  };

  return (
    <div className="Gbody">
      <div className="GameContainer">
        <div className="overlayG">
          <button className="mainmenu-icon" style={{
            position: "absolute", top: "20px", right: "50px",
            cursor: "pointer", background: "orange",
            borderRadius: "50%", padding: "10px",
          }} onClick={() => navigate("/dashboard")}>
            <HomeIcon size={30} color="white" />
          </button>

          <div className="total-score" style={{
            position: "absolute", top: "20px", left: "50px",
            fontSize: "20px", color: "white", fontWeight: "bold"
          }}>
            Total Score: {totalScore} 🏆
          </div>

          {hint && <div className="hint-box">{hint}</div>}

          <div className="game-container">
            <div className="score-timer-container">
              <div className="timer-block">Time Left: {timeLeft}s</div>
            </div>

            <div className="question-container">
              {question && <img src={question} alt="Math Puzzle" className="question-image" />}
            </div>

            <div className="number-pad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button key={num} onClick={() => handleNumberClick(num)}
                  className={`number-button ${userInput === num ? "selected" : ""}`}>
                  {num}
                </button>
              ))}
            </div>

            <button onClick={handleSubmit} className="submit-button" disabled={userInput === ""}>
              Submit
            </button>

            <div className="hint-boxs">
              <button onClick={useHint} className="hint-button">
                <Lightbulb size={20} style={{ marginRight: "5px" }} />
                Use Hint
              </button>
            </div>

            <p className="feedback">{feedback}</p>

            {/* ✅ Show "Next Question" button only when the answer is correct */}
            {showNextQuestion && (
              <button onClick={fetchNewQuestion} className="next-question-button">
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
