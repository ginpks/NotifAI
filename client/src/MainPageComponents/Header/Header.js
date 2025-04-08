import React, { useEffect } from 'react';
import './Header.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = ({ userData }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!userData) {
      console.log("No user data found, redirecting to login");
      window.location.href = "/"; // Redirect to the login page;
    }
  }, [userData, navigate]);

  return (
    <header className="header-container">
      <h1 className="header-title">
        {userData ? `Hi ${userData.fname} <3` : 'You aren not signed in'} {/* Changed message */}
      </h1>

      <div className="header-actions">
        {<LogoutButton />}

        {/* <div className="header-sort-by">
          <span className="header-sort-by-text">Sort By</span> */}
          {/* Filter icon SVG */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg> */}
        {/* </div> */}

        <div className="header-profile-image-container">
          {/* Placeholder for profile image */}
          <div className="header-profile-image-placeholder">
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







