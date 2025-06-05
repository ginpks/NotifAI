import React, { useEffect, useState } from 'react';
import './Header.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Header = ({ userData, onGenAIClick, onProfileClick }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isIconFlashing, setIsIconFlashing] = useState(false); 

  useEffect(() => {
    if (!userData) {
      console.log("No user data found, redirecting to login");
      window.location.href = "/"; // Redirect to the login page;
    }
  }, [userData, navigate]);

  const handleIconClick = () => {
    if (onGenAIClick) {
      onGenAIClick();
    }
    setIsIconFlashing(true);
    setTimeout(() => {
      setIsIconFlashing(false);
    }, 300); 
  };

  return (
    <header className="header-container">
      <h1 className="header-title">
        NOTIFAI
      </h1>

      <div className="header-actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={40}
          height={40}
          color={"#e9d5ff"}
          fill={"none"}
          onClick={handleIconClick} // <-- Call the function passed from MainPage
          className={isIconFlashing ? 'header-icon-flash-active' : ''} // <-- APPLY CLASS HERE
          style={{ cursor: 'pointer' }} // <-- Add pointer cursor
          id = "genAI"
        >
          <path d="M3 12C7.97056 12 12 7.97056 12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <div className="header-profile-image-container" onClick={onProfileClick}>
          {/* Placeholder for profile image */}
          <div className="header-profile-image-placeholder">
            {/*Avatar Icon*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
