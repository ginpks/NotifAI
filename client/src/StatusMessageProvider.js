import React, { createContext, useContext, useState } from 'react';

const StatusMessageContext = createContext(null);
const TYPE_TO_DURATION = {
  success: 2000,
  info: 4000,
  error: 6000
};


function StatusMessageProvider({ children }) {
    const [statusMessages, setStatusMessage] = useState([]);

    function addStatusMessage(message, type) {
        const duration = TYPE_TO_DURATION[type] || 3000;

        const newStatusMessage = {
            id: Date.now(),
            message: message,
            type: type,
            duration: duration,
            isDismissing: false
        }

        setStatusMessage(prev => {
            const trimmed = prev.length === 3? prev.slice(1): prev;
            return [...trimmed, newStatusMessage];
        });
        console.log(statusMessages.length);

        setTimeout(() => {
            setStatusMessage(prev =>
                prev.map(n =>
                n.id === newStatusMessage.id ? { ...n, isDismissing: true } : n
                )
            );

               
            setTimeout(() => {
                setStatusMessage(prev => prev.filter(n => n.id !== newStatusMessage.id));
            }, 300);
        }, duration);
    }

    const value = {
        notify: addStatusMessage,
        statusMessages
    };

    return (
        <StatusMessageContext.Provider value={value}>
            {children}
        </StatusMessageContext.Provider>
    );
}

function useStatusMessage() {
    return useContext(StatusMessageContext);
}

export { StatusMessageProvider, useStatusMessage };