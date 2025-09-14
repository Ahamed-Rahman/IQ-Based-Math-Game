import React, { createContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import backgroundMusic from "../assets/music/background.mp3";

// ✅ Create Context
export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [musicOn, setMusicOn] = useState(localStorage.getItem("music") === "on");
  const audioRef = useRef(new Audio(backgroundMusic));
  const location = useLocation();

  useEffect(() => {
    if (musicOn) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((err) => console.error("Music Play Error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  // ✅ Stop Music When Leaving All Game Pages
  useEffect(() => {
    const gamePages = ["/dashboard", "/game", "/leaderboard"];
    if (!gamePages.includes(location.pathname)) {
      audioRef.current.pause();
    }
  }, [location.pathname]);

  return (
    <MusicContext.Provider value={{ musicOn, setMusicOn }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
