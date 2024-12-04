import React, { useEffect, useState } from 'react';
import logo from '../assets/ic_launcher.png'; // Import the image relative to your component
import './SplashScreen.css';

const SplashScreen: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onAnimationComplete();
    }, 3000); // Duration of the splash screen

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    isVisible && (
      <div className="container">
        <div className="content">
          {/* Display the Image */}
          <img 
            src={logo} 
            alt="Loading..." 
            className="logo"
          />
          {/* Loading Text */}
          <p className="text">Loading...</p>
        </div>
      </div>
    )
  );
};

export default SplashScreen;
