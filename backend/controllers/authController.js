const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Register a New User
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up" });
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// ✅ Fetch User's Current Score
const getUserScore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ username: user.username, score: user.score });
  } catch (error) {
    console.error("Error fetching user score:", error);
    res.status(500).json({ message: "Failed to fetch user score" });
  }
};

module.exports = { signup, login, getUserScore };
