import React from "react";
import { CSSTransition } from "react-transition-group";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Filter from "./NotificationFilter/Filter";
import Search from "./Search/Search";
import NotificationList from "./NotificationList/NotificationList";
import ClaimsAlert from "./ClaimsAlert/ClaimsAlert";
import Reminders from "./Reminders/Reminders";
import GenAI from "./genAI/genAI";
import axios from "axios";
import EmailPopup from "../EmailPopupComponent/EmailPopup/EmailPopup";
import { useState, useEffect, useRef } from "react";
import NewMessage from './ComposeNewMessage/NewMessage';
import { useStatusMessage } from "../StatusMessageProvider";
import ProfileModal from '../ProfilePageComponents/ProfileModal';

import {
  deploymentMode,
  backendPort,
  backendHost,
  backendBaseURL,
} from "../App";

// Main component to handle routing
function MainPage() {
  const { notify } = useStatusMessage();

  const filter = new Filter();
  filter.addSubscriber((x) => {
    console.log("notifications retrieved after updating filter is");
    console.log(x);
  });

  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isAILoading, setIsAILoading] = useState(false); // *** Use this for AI operations ***

  const [isGenAIVisible, setIsGenAIVisible] = useState(false);
  const genAiRef = useRef(null);
  const [selectedNotificationWrapper, setSelectedNotificationWrapper] =
    useState(null);
  const [genAIChatHistory, setGenAIChatHistory] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("statusMessage");
    if (status){
      const {message, type} = JSON.parse(status);
      notify(message, type);
      localStorage.removeItem(
        "statusMessage"
      );
    }
  }, [])
  const toggleGenAI = () => {
    setIsGenAIVisible((prevIsVisible) => {
      const nextIsVisible = !prevIsVisible;
      if (prevIsVisible && !nextIsVisible) {
        setGenAIChatHistory([]);
      }
      return nextIsVisible;
    });
  };
  
  const [composePopups, setComposePopups] = useState([]); // Array to handle multiple popups

  const openComposePopup = () => {
    if (composePopups.length < 3){
      const newPopupId = Date.now(); // Simple ID generation
      setComposePopups((prev) => [...prev, { id: newPopupId, subject: '', minimized: false }]);
    }
    else {
      notify("Maximum of 3 popups reached!", "info");
      console.log("Maximum of 3 popups reached.");
    }
  };


  const closePopup = (popupId) => {
    setComposePopups(prev => prev.filter(popup => popup.id !== popupId));
  };

  const toggleMinimizePopup = (popupId) => {
    setComposePopups((prev) =>
      prev.map((popup) =>
        popup.id === popupId ? { ...popup, minimized: !popup.minimized } : popup
      )
    );
  };

  const onUpdateSubject = (popupId, newSubject) => {
    setComposePopups((prev) => 
      prev.map((popup) => popup.id === popupId ? {...popup, subject: newSubject}: popup)
    );
  }

  const showGenAI = () => {
    // Only update state if it's not already visible,
    if (!isGenAIVisible) {
      setIsGenAIVisible(true);
    }
  };

  const handleSummaryReceived = (summaryText) => {
    if (summaryText) {
      // Format summary as a message object (matching GenAI's structure)
      const summaryMessage = { role: "model", parts: [{ text: summaryText }] };
      setGenAIChatHistory((prevHistory) => [...prevHistory, summaryMessage]);
    }
  };

  const handleSummarizeStart = () => {
    setIsAILoading(true);
    const userSummarizeRequestMessage = {
      role: "user",
      parts: [{ text: "Summarize the current email/notification." }],
    };
    setGenAIChatHistory((prevHistory) => [
      ...prevHistory,
      userSummarizeRequestMessage,
    ]);
  };

  const handleSummarizeEnd = () => {
    setIsAILoading(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(backendBaseURL + "/users/me", {
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsUserDataLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // State for filtered notifications
  // filteredNotifications and notifications are each a list of objects, each object contains three fields: from, to, and notification
  // from: is array of strings, usernames of senders
  // to: is array of strings, usernames of receivers
  // notification: is object, contains fields of notification info following ER diagram, also contains args field, which is an
  // object containing fields specific to a type of notification (duedate, priority) following ER diagram

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  filter.addSubscriber((notificationList) => {
    setNotifications(notificationList);

    if (searchTerm != "") {
      setFilteredNotifications(
        getFilteredNotifications(searchTerm, notificationList)
      );
    } else {
      setFilteredNotifications(notificationList);
    }
  });

  const getFilteredNotifications = (searchTerm, notifList) => {
    return notifList.filter((notificationWrapper) => {
      let senders = "";
      let receivers = "";
      notificationWrapper.from.forEach((username) => {
        senders += username;
      });
      notificationWrapper.to.forEach((username) => {
        receivers += username;
      });
      let source = "";
      if ("source" in notificationWrapper.notification) {
        source = notificationWrapper.notification.source;
      }

      return (
        notificationWrapper.notification.body
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        notificationWrapper.notification.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        senders.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receivers.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm == "" || !searchTerm.trim()) {
      // If search is empty, show all notifications
      setFilteredNotifications(notifications);
    } else {
      // Filter notifications that contain the search term (case-insensitive)
      const filtered = getFilteredNotifications(searchTerm, notifications);
      setFilteredNotifications(filtered);
    }
  };

  const handleNotificationSelect = async (notificationWrapper) => {

    // Mark notif as read only if a recipient reads it
    if(notificationWrapper.to.includes(userData.id) && !notificationWrapper.notification.isread){
      try {
        // Marking notif as read
        let id = notificationWrapper.notification.id;
        await axios.post(backendBaseURL + "/notifications/claims/" + id + "/mark-read", { withCredentials: true }); // send cookies with request
  
      } catch (error) {
        console.error("Mark notification as read error:" + error);
      }
    }

    setSelectedNotificationWrapper(notificationWrapper);
  };

  const handleBackFromPopup = () => {
    setSelectedNotificationWrapper(null); // Clear the selected notification to hide popup
  };

  const handleDeleteFromPopup = () => {
    console.log(
      "Deleting notification with ID:",
      selectedNotificationWrapper.notification.id
    );
    axios
      .delete(
        backendBaseURL + "/notifications/" +
          selectedNotificationWrapper.notification.id,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("Notification deleted");
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notificationWrapper) =>
              notificationWrapper.notification.args.notificationid !==
              selectedNotificationWrapper.notification.args.notificationid
          )
        );
        setFilteredNotifications((prevFilteredNotifications) =>
          prevFilteredNotifications.filter(
            (notificationWrapper) =>
              notificationWrapper.notification.args.notificationid !==
              selectedNotificationWrapper.notification.args.notificationid
          )
        );
        setSelectedNotificationWrapper(null); // Clear the selected notification to hide popup
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  // Sample reminders - link to API later
  const reminders = [
    {
      id: 1,
      title: "Meeting",
      location: "ILC S121",
      date: "March 4th, 2025 at 4 pm",
    },
    {
      id: 2,
      title: "Lunch",
      location: "ILC S121",
      date: "March 4th, 2025 at 4 pm",
    },
  ];

  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexBasis: "30%",
        flexShrink: 0,
      }}
    >
      {/* Sidebar component */}
      <Sidebar onComposeClick={openComposePopup}/>

      {/* Main content area */}
      <div style={{ flexGrow: 1, padding: "20px", overflow: "auto" }}>
        {/* Header component */}
        <Header userData={userData} onGenAIClick={toggleGenAI} onProfileClick={() => setIsProfileModalOpen(true)}/>

        <div
          style={{
            display: "flex",
            gap: "20px",
            height: "calc(100vh - 120px)",
          }}
        >
          {/* Notifications section */}
          <div style={{ flexBasis: "70%" }}>
            {/* Search and Filter */}
            <div
              className="search-filter-wrapper"
              style={{ position: "relative" }}
            >
              {/* Search component with onSearch handler */}
              <Search onSearch={handleSearch} />
              {filter.renderButton()}
            </div>

            {/*Filter Bubbles and Filter Select */}
            <div style={{ flexBasis: "70%" }}>
              <div style={{ zIndex: 1, position: "absolute" }}>
                {filter.renderFilterMenu()}
              </div>
            </div>

            {/* Notification list with filtered notifications */}
            {/* Conditionally render NotificationList or EmailPopup */}
            {selectedNotificationWrapper ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "100%",
                  paddingRight: "20px", // prevents it from touching the right edge
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    maxWidth: "70vw", // adjusts with screen size
                    minWidth: "300px",
                  }}
                >
                  <EmailPopup
                    type={selectedNotificationWrapper.notification.type}
                    args={selectedNotificationWrapper.notification.args}
                    subject={selectedNotificationWrapper.notification.title}
                    fromEmail={selectedNotificationWrapper.from.join(", ")}
                    toEmail={selectedNotificationWrapper.to.join(", ")}
                    content={selectedNotificationWrapper.notification.body}
                    onBack={handleBackFromPopup}
                    onDelete={handleDeleteFromPopup}
                    onGenAIClick={showGenAI}
                    onSummaryReceived={handleSummaryReceived}
                    onSummarizeStart={handleSummarizeStart}
                    onSummarizeEnd={handleSummarizeEnd}
                    isLoading={isAILoading}
                  />
                </div>
              </div>
            ) : (
              <NotificationList
                notifications={filteredNotifications}
                onNotificationSelect={handleNotificationSelect}
              />
            )}
          </div>

          {/* Right sidebar - claims and reminders */}
          <div style={{ flexBasis: "30%" }}>
            {/* Claims alert */}
            <ClaimsAlert selectNotifFunc = {(notificationWrapper) => handleNotificationSelect(notificationWrapper)}/>
            {/* Reminders section */}
            <Reminders reminders={reminders} />
          </div>

        </div>

        <div style={{ position: 'fixed', bottom: 0, right: 20, display: 'flex', gap: '8px' }}>
          {composePopups.map((popup, index) => ({ ...popup, visualSlot: 2 - index }))
          .filter((popup) => popup.minimized)
          .sort((a, b) => a.visualSlot - b.visualSlot).map((popup) => {
            return (
            <div
            key={popup.id}
            style = {{
              width: `190px`,
              height: `30px`,
              backgroundColor: `#DCD1E9`,
              border: '1px solid #DCD1E9',
              cursor: `pointer`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              padding: `3px 6px`,
              borderRadius: `5px`
            }}
            onClick = {() => toggleMinimizePopup(popup.id)}
          >
            <span style={{fontFamily: `"Assistant", sans-serif`}}>{popup.subject}</span>
            <button className="close-button" onClick = {(e) => {
              e.stopPropagation();
              closePopup(popup.id);
            }}
            >
              X
            </button>
          </div>
          );})
          }
        </div>

        {composePopups.map((popup, index) => {
          return(
          <div key={popup.id} className="popup-overlay" style={{ zIndex: 100 + index }}>
            <div
              className="popup-content"
              style={{
                display: popup.minimized ? 'none' : 'block',
                position: 'fixed',
                bottom: '0',
                left: `${72.5 - index * 27}%`,
                zIndex: 100 + index,
              }}
            >
              <NewMessage
                onClose={() => closePopup(popup.id)}
                onMinimize={() => toggleMinimizePopup(popup.id)}
                updatePopupSubject={(newSubject) => onUpdateSubject(popup.id, newSubject)}
                subject={popup.subject}
              />
            </div>
          </div>
        );})}

        {isProfileModalOpen && (
            <ProfileModal handleModalClose={() => setIsProfileModalOpen(false)} />
        )}
      </div>
      <CSSTransition
        nodeRef={genAiRef} // 5a. Pass the ref
        in={isGenAIVisible} // 5b. Control based on state
        timeout={500} // 5c. Match CSS animation duration (0.5s)
        classNames="genai-slide" // 5d. Base name for CSS classes
        unmountOnExit // 5e. Remove from DOM after exit animation
      >
        {/* 6. Render GenAI and pass the ref down */}
        <GenAI
          ref={genAiRef}
          chatHistory={genAIChatHistory} // Pass the state down
          setChatHistory={setGenAIChatHistory} // Pass the setter function down
          isLoading={isAILoading}
          setIsLoading={setIsAILoading}
        />
      </CSSTransition>
    </div>
  );
}

export default MainPage;
