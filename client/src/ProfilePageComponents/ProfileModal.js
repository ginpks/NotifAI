import React, {useEffect, useState} from 'react';
import './ProfileModal.css';
import axios from 'axios';
import useModalAnimation from '../hooks/useModalAnimation';
import { SlidersHorizontal, LogOut } from 'lucide-react';
import LogoutConfirmModal from './LogoutConfirmModal';
import { useStatusMessage } from "../StatusMessageProvider";
import { deploymentMode, backendPort, backendHost, backendBaseURL } from '../App';


const ProfileModal = ({handleModalClose}) => {
    const { notify } = useStatusMessage();

    const [user, setUser] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('personalInfo')

    const handleItemClick = () => {
      setActiveSection('preferences')
    }

    const handleLogout = async () => {
      try {
          await axios.post(backendBaseURL + '/users/logout', {}, { withCredentials: true });
          localStorage.setItem(
            "statusMessage",
            JSON.stringify({
              message: "Successfully Logged Out!",
              type: "success",
            })
          );
          window.location.href= "/"; // Redirect to the login page using React Router
      } catch (error) {
          notify("Error Logging out", "error");;
      }
    };

    let {animationClassNames, handleAnimatedClose} = useModalAnimation(handleModalClose, 300, "profile-modal");
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(backendBaseURL + '/users/profile', {
              withCredentials: true,
            });
            console.log("Response status:", response.status);
            console.log("User data:", response.data);
      
            setUser(response.data.user || response.data);
          } catch (err) {
            console.error("Fetch error:", err);
          }
        };
      
        fetchData();
      }, []);
    
    const handleModalClick = (event) => {
      console.log("Clicked inside modal");
      event.stopPropagation();
    };
    
    return (
      <div className={animationClassNames.overlayClass} onClick={handleAnimatedClose}>
          <div className={animationClassNames.containerClass} onClick={handleModalClick}>
              <div className="modal-body">
                  <div className="modal-sidebar">
                      <div className= {`sidebar-header ${activeSection === 'personalInfo' ? 'active': ''}`} onClick={() => setActiveSection('personalInfo')}>
                        <div className="profile-avatar">{`${user?.fname?.charAt(0).toUpperCase()}`}</div>
                        <div className="profile-greeting">Hello, {user?.fname}!</div>
                      </div>
                    <div className="sidebar-menu">
                      <button 
                        key={"preferences"} 
                        className={`modal-sidebar-item ${activeSection === 'preferences' ? 'active': ''}`}
                        onClick={() => handleItemClick("preferences")}
                        aria-label="Preferences" title="Preferences"
                        >
                        <div className="icon-container">
                          {<SlidersHorizontal />}
                        </div>
                        <span>{"Preferences"}</span>
                      </button>
                      <button 
                        key={"logout"} 
                        className={`modal-sidebar-item`}
                        onClick={() => setIsLogoutModalOpen(true)}
                        aria-label="Logout" title="Logout"
                        >
                        <div className="icon-container">
                          {<LogOut />}
                        </div>
                        <span>{"Logout"}</span>
                      </button>
                      {isLogoutModalOpen &&
                      <LogoutConfirmModal 
                        handleModalClose={() => setIsLogoutModalOpen(false)} 
                        onConfirm={handleLogout}
                      />}
                    </div>
                  </div>
                  <div className="modal-content">
                  {activeSection === 'personalInfo' && user && (

                    <div className='personal-section'>
                    <div className="profile-section">
                      <h2 className="section-title">Account</h2>
                    
                      <div className="info-block">
                        <div className="info-label">Name</div>
                        <div className="info-subtext">{user.fname} {user.lname}</div>
                      </div>
                    
                      <div className="info-block">
                        <div className="info-label">User Type</div>
                        <div className="info-subtext">{user.role}</div>
                      </div>
                    </div>
                    <div className="profile-section">
                    <h2 className="section-title">Security</h2>
                  
                    <div className="info-block">
                      <div className="info-main">
                        <div className="info-label">Email</div>
                        <div className="info-subtext">{user.email}</div>
                      </div>
                      <button className="info-action">Change email</button>
                    </div>
                  
                    <div className="info-block">
                      <div className="info-main">
                        <div className="info-label">Password</div>
                        <div className="info-subtext">Set a password to protect your account. [Coming Soon!]</div>
                      </div>
                      <button className="info-action">Change password</button>
                    </div>
                  </div>
                  </div>
                  )}
                  {activeSection === 'preferences' && (
                    <div className="preferences-section">
                    <h2 className="section-title">Preferences</h2>
                  
                    <div className="preference-item">
                      <span className="preference-label">Dark Mode [Coming Soon!]</span>
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  
                    <div className="preference-item">
                      <span className="preference-label">Language</span>
                      <span className="preference-value">English</span>
                    </div>
                  </div>
                  )}
                  </div>
              </div>
          </div>
        </div>
    );
};

export default ProfileModal;