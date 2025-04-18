import React from "react";
import Sidebar from "../MainPageComponents/Sidebar/Sidebar";
import Header from "../MainPageComponents/Header/Header";
import Search from "../MainPageComponents/Search/Search";
import ClaimsAlert from "../MainPageComponents/ClaimsAlert/ClaimsAlert";
import Reminders from "../MainPageComponents/Reminders/Reminders";
import axios from "axios";
import { useState, useEffect } from "react";
import EmailPopup from "./EmailPopup/EmailPopup";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

function EmailPage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationWrapper, setNotificationWrapper] = useState(null);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/me", {
          withCredentials: true,
        });
        setUserData(response.data.user);

        const notification = await axios.get(
          "http://localhost:3000/notifications/" + id,
          {
            withCredentials: true,
          }
        );
        setNotificationWrapper(notification.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const emailData = {
    subject: "Reminder: Payment Due",
    fromEmail: "claims@insuranceco.com",
    toEmail: "john@domain.com",
    content:
      "Hello John, your payment of $50 is due tomorrow. Please contact us if you have any questions.",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let from = "";
  let to = "";
  notificationWrapper.from.forEach((username) => {
    from += username + ", ";
  });
  notificationWrapper.to.forEach((username) => {
    to += username + ", ";
  });

  const notification = notificationWrapper.notification;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flexGrow: 1, padding: "20px", overflow: "auto" }}>
        {/* Header component */}
        <Header userData={userData} />

        <div
          style={{
            display: "flex",
            gap: "20px",
            height: "calc(100vh - 120px)",
          }}
        >
          {/* Notifications section */}
          <div style={{ flexBasis: "70%" }}>
            {/* Search component */}
            <Search />

            <EmailPopup
              subject={notification.title}
              fromEmail={from}
              toEmail={to}
              content={notification.body}
              onBack={() => {
                console.log("Back button clicked");
                navigate("/main");
              }}
              onDelete={() => {
                console.log("Delete button clicked");
                axios
                  .delete(
                    "http://localhost:3000/notifications/" + notification.id,
                    {
                      withCredentials: true,
                    }
                  )
                  .then(() => {
                    console.log("Notification deleted");
                    navigate("/main");
                  })
                  .catch((error) => {
                    console.error("Error deleting notification:", error);
                  });
                window.location.href = "/main";
              }}
            />
          </div>

          {/* Right sidebar - claims and reminders */}
          <div style={{ flexBasis: "30%" }}>
            {/* Claims alert */}
            <ClaimsAlert />

            {/* Reminders section */}
            <Reminders reminders={reminders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPage;
