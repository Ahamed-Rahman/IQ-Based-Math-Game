const axios = require('axios');
const User = require('../models/User');
const Question = require('../models/Question');

// ✅ Fetch Banana Math Question (With Caching)
const getBananaQuestion = async (req, res) => {
  try {
    await Question.deleteMany({});

    const response = await axios.get('http://marcconrad.com/uob/banana/api.php?out=json');

    const newQuestion = new Question({
      question: response.data.question,
      solution: response.data.solution,
      createdAt: new Date()
    });

    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    console.error("Error fetching Banana API:", error.message);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

// ✅ Update User Score
const updateScore = async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.score += score;
    await user.save();

    res.json({ message: "Score Updated", score: user.score });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ message: "Failed to update score" });
  }
};

// ✅ Get Top 10 Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to retrieve leaderboard" });
  }
};

module.exports = { getBananaQuestion, updateScore, getLeaderboard };
