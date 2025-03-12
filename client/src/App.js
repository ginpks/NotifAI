// src/App.js
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar"; 

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  
  // Sample data for notifications - link to API later
  const notifications = [
    {
      id: 1,
      source: "Slack",
      sender: "Sahana Satish",
      message: "Hey! the UI mock-up is up",
      time: "1 hour ago",
      icon: "slack"
    },
    {
      id: 2,
      source: "Claims",
      sender: "Claims Department",
      message: "Your payment of $50 is due tommorrow",
      time: "1 hour ago",
      details: "Hello this is to inform you....."
    }
  ];

  // Sample reminders - link to API later
  const reminders = [
    {
      id: 1,
      title: "Meeting",
      location: "ILC S121",
      date: "March 4th, 2025 at 4 pm"
    },
    {
      id: 2,
      title: "Lunch",
      location: "ILC S121",
      date: "March 4th, 2025 at 4 pm"
    }
  ];

  const fetchHelloWorld = async () => {
    try {
      const response = await fetch('http://localhost:3000/hello-world-demo');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchHelloWorld();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  // Function to render the appropriate icon for each notification
  const renderNotificationIcon = (source) => {
    switch(source.toLowerCase()) {
      case 'slack':
        return (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2c-1.1 0-2 .9-2 2v4.5H17c1.1 0 2-.9 2-2v-2.5c0-1.1-.9-2-2-2h-2.5Z" />
              <path d="M4.5 9.5c-1.1 0-2 .9-2 2v2.5c0 1.1.9 2 2 2H7c1.1 0 2-.9 2-2v-4.5H4.5Z" />
              <path d="M9.5 22c1.1 0 2-.9 2-2v-4.5H7c-1.1 0-2 .9-2 2V20c0 1.1.9 2 2 2h2.5Z" />
              <path d="M19.5 14.5c1.1 0 2-.9 2-2v-2.5c0-1.1-.9-2-2-2H17c-1.1 0-2 .9-2 2v4.5h4.5Z" />
            </svg>
          </div>
        );
      case 'claims':
        return (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Mail icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        );
      default:
        return (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Bell icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar component */}
      <Sidebar />
      
      {/* Main content area */}
      <div style={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '30px',
          position: 'relative'
        }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold',
            margin: 0,
            fontFamily: 'Verdana'
          }}>
            NotifAI
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center',position:'absolute', right:0 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              border: '1px solid #e5e7eb',
              borderRadius: '8px', 
              padding: '8px 16px',
              backgroundColor: 'white'
            }}>
              <span style={{ marginRight: '5px' }}>Sort By</span>
              {/* Filter icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </div>
            
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
              {/* Placeholder for profile image */}
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>
        </header>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          height: 'calc(100vh - 120px)'
        }}>
          {/* Notifications section */}
          <div style={{ flexBasis: '70%' }}>
            <div style={{ 
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '8px 16px'
              }}>
                {/* Search icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search" 
                  style={{ 
                    border: 'none', 
                    outline: 'none',
                    width: '100%',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            
            {/* Notification list */}
            <div>
              {notifications.map(notification => (
                <div key={notification.id} style={{ 
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '16px'
                }}>
                  {renderNotificationIcon(notification.source)}
                  
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: '16px', 
                        fontWeight: 'bold' 
                      }}>
                        {notification.sender} {notification.source === 'Slack' ? '(from Slack)' : ''}
                      </h3>
                      <span style={{ 
                        color: '#6b7280', 
                        fontSize: '14px' 
                      }}>
                        {notification.time}
                      </span>
                    </div>
                    
                    <p style={{ 
                      margin: '0', 
                      fontSize: '14px'
                    }}>
                      {notification.message}
                    </p>
                    
                    {notification.details && (
                      <p style={{ 
                        margin: '4px 0 0 0', 
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {notification.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '20px'
            }}>
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                ←
              </button>
              <span style={{ margin: '0 16px' }}>Page 1 of 10</span>
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                →
              </button>
            </div>
          </div>
          
          {/* Right sidebar - claims and reminders */}
          <div style={{ flexBasis: '30%' }}>
            {/* Claims alert */}
            <div style={{ 
              backgroundColor: '#fee2e2', 
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              border: '1px solid #fecaca'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0',
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#b91c1c'
                  }}>
                    Claims Priority Message
                  </h3>
                  <span style={{ fontSize: '14px', color: '#b91c1c' }}>Just now</span>
                </div>
                <button style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#b91c1c'
                }}>
                  ×
                </button>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%',
                  backgroundColor: '#fef2f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Bell icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </div>
                <p style={{ 
                  margin: '0',
                  fontSize: '14px',
                  color: '#b91c1c'
                }}>
                  You have $50 due tommorrow
                </p>
              </div>
              
              <button style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Open
              </button>
            </div>
            
            {/* Reminders section */}
            <div>
              <h2 style={{ 
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                REMINDERS
              </h2>
              
              {/* Reminder cards */}
              {reminders.map(reminder => (
                <div key={reminder.id} style={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{ 
                      margin: '0',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>
                      {reminder.title}
                    </h3>
                    <div style={{ 
                      width: '24px', 
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center' 
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#818cf8',
                        borderRadius: '4px',
                        transform: 'rotate(12deg)'
                      }}></div>
                    </div>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 4px 0',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {reminder.location}
                  </p>
                  <p style={{ 
                    margin: '0',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {reminder.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;