import axios from "axios";

const API_URL = "http://localhost:5000";

// ✅ Fetch Leaderboard Data
export const fetchLeaderboard = async () => {
  try {
    const res = await axios.get(`${API_URL}/game/leaderboard`);
    return res.data;
  } catch (err) {
    console.error("Error fetching leaderboard", err);
    throw err;
  }
};
