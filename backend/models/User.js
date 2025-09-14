const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 }, // Track accumulated score
  role: { type: String, default: "player" } // Future Admin Role
});

module.exports = mongoose.model('User', UserSchema);
