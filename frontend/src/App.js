import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import MusicProvider from './context/MusicProvider';

function App() {
  return (
    <Router>
      <MusicProvider> {/* ✅ Wrap inside MusicProvider */}
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </MusicProvider>
    </Router>
  );
}

export default App;
