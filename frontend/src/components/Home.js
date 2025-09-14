import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import backgroundImg from '../assets/images/cuter.webp'; // Correct import
import playButton from '../assets/images/playButton.png'; // Importing the play button image

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='mbody'>
    <div
      className="container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative',
      }}
    >

<div className="overlayk">
      
        <h1>IQ BASED MATH GAME</h1>
        <p>Test and improve your problem-solving skills through fun and challenging math questions.</p>
        <button className="play-button" onClick={() => navigate('/signup')}>
          <img src={playButton} alt="Play Button" />
        </button>
      
    </div>
    </div>
    </div>
  );
};

export default Home;
