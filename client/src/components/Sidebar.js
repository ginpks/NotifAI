// src/components/Sidebar.js
import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('messages');
  
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#e9d5ff', // Light purple background
          width: '80px',
          padding: '16px 0'
        }}>
          {/* Top logo */}
      <div style={{ marginBottom: '16px' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: '8px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden' // Add this to ensure image stays within the circle
      }}>
        <img 
          src="images/duck_creek_logo.jpg" // Path to your image from the public folder
          alt="Logo" 
          style={{
            width: '30px',
            height: '30px',
            objectFit: 'contain' // Ensures the image maintains its aspect ratio
          }}
        />
      </div>
    </div>
      
      {/* Menu button */}
      <div style={{ marginBottom: '24px' }}>
        <button style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
          {/* Menu icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
      
      {/* Edit button */}
      <div style={{ marginBottom: '32px' }}>
        <button style={{
          backgroundColor: '#fce7f3', // Light pink
          padding: '8px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}>
          {/* Edit icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </div>
      
      {/* Navigation items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        width: '100%'
      }}>
        {/* All Messages */}
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'messages' ? '#6366f1' : '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            position: 'relative',
            paddingBottom: '4px'
          }}
          onClick={() => handleItemClick('messages')}
        >
          {activeItem === 'messages' && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '24px',
              backgroundColor: '#6366f1',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px'
            }}></div>
          )}
          {/* Message Square icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <div style={{ 
            fontSize: '10px', 
            marginTop: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span>All</span>
            <span>Messages</span>
          </div>
        </button>
        
        {/* Mail */}
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'mail' ? '#6366f1' : '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            position: 'relative'
          }}
          onClick={() => handleItemClick('mail')}
        >
          {activeItem === 'mail' && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '24px',
              backgroundColor: '#6366f1',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px'
            }}></div>
          )}
          {/* Mail icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Mail</span>
        </button>
        
        {/* Teams */}
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'teams' ? '#6366f1' : '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            position: 'relative'
          }}
          onClick={() => handleItemClick('teams')}
        >
          {activeItem === 'teams' && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '24px',
              backgroundColor: '#6366f1',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px'
            }}></div>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Teams</span>
        </button>
        
        {/* Slack */}
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'slack' ? '#6366f1' : '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            position: 'relative'
          }}
          onClick={() => handleItemClick('slack')}
        >
          {activeItem === 'slack' && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '24px',
              backgroundColor: '#6366f1',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px'
            }}></div>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2c-1.1 0-2 .9-2 2v4.5H17c1.1 0 2-.9 2-2v-2.5c0-1.1-.9-2-2-2h-2.5Z" />
            <path d="M4.5 9.5c-1.1 0-2 .9-2 2v2.5c0 1.1.9 2 2 2H7c1.1 0 2-.9 2-2v-4.5H4.5Z" />
            <path d="M9.5 22c1.1 0 2-.9 2-2v-4.5H7c-1.1 0-2 .9-2 2V20c0 1.1.9 2 2 2h2.5Z" />
            <path d="M19.5 14.5c1.1 0 2-.9 2-2v-2.5c0-1.1-.9-2-2-2H17c-1.1 0-2 .9-2 2v4.5h4.5Z" />
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Slack</span>
        </button>
      </div>
      
      {/* Add button at bottom */}
      <button style={{
        marginTop: 'auto',
        marginBottom: '16px',
        color: '#6b7280',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}>
        {/* Plus icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;