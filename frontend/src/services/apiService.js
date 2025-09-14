import axios from "axios";

const API_URL = "http://localhost:5000";

// ✅ Fetch a new math question
export const fetchQuestion = async () => {
  try {
    const res = await axios.get(`${API_URL}/game/banana`);
    return res.data;
  } catch (error) {
    console.error("Error fetching question", error);
    throw error;
  }
};

// ✅ Update the user's score
export const updateScore = async (score) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${API_URL}/game/update-score`, 
      { score }, 
      { headers: { Authorization: token } }
    );
  } catch (error) {
    console.error("Error updating score", error);
    throw error;
  }
};

// ✅ Fetch the user's current score from the database (NEW FUNCTION)
export const fetchUserScore = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/auth/user`, {
      headers: { Authorization: token },
    });
    return res.data; // ✅ Return user data (including score)
  } catch (error) {
    console.error("Error fetching user score", error);
    throw error;
  }
};
