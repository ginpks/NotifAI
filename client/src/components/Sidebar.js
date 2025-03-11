// src/components/Sidebar.js
import React, { useState } from 'react';
import { Mail, MessageSquare, Slack, Plus, Menu, Edit } from 'lucide-react';

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
      backgroundColor: '#e9d5ff', // Purple background
      width: '64px',
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
          justifyContent: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            transform: 'rotate(12deg)'
          }}></div>
        </div>
      </div>
      
      {/* Menu button */}
      <div style={{ marginBottom: '32px' }}>
        <button style={{ color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={24} />
        </button>
      </div>
      
      {/* Edit button */}
      <div style={{ marginBottom: '32px' }}>
        <button style={{
          backgroundColor: '#fce7f3',
          padding: '8px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}>
          <Edit size={20} style={{ color: '#4b5563' }} />
        </button>
      </div>
      
      {/* Navigation items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        flexGrow: 1
      }}>
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'messages' ? '#2563eb' : '#4b5563',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => handleItemClick('messages')}
        >
          <div style={{
            width: '16px',
            height: '16px',
            marginBottom: '4px',
            border: '1px solid #4b5563'
          }}></div>
          <span style={{ fontSize: '12px' }}>All</span>
          <span style={{ fontSize: '12px' }}>Messages</span>
        </button>
        
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'mail' ? '#2563eb' : '#4b5563',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => handleItemClick('mail')}
        >
          <Mail size={20} />
          <span style={{ fontSize: '12px', marginTop: '4px' }}>Mail</span>
        </button>
        
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'teams' ? '#2563eb' : '#4b5563',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => handleItemClick('teams')}
        >
          <div style={{
            width: '16px',
            height: '16px',
            marginBottom: '4px',
            border: '1px solid #4b5563'
          }}></div>
          <span style={{ fontSize: '12px' }}>Teams</span>
        </button>
        
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: activeItem === 'slack' ? '#2563eb' : '#4b5563',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => handleItemClick('slack')}
        >
          <Slack size={20} />
          <span style={{ fontSize: '12px', marginTop: '4px' }}>Slack</span>
        </button>
      </div>
      
      {/* Add button at bottom */}
      <button style={{
        marginTop: 'auto',
        color: '#4b5563',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}>
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Sidebar;