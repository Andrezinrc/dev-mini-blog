import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/common/Notification/Notification';
import {useNotificationTimer} from '../hooks/useNotificationTimer';

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  useNotificationTimer(notifications, setNotifications);
  
  const notify = (message, color = '#333') => {
    setNotifications(prev => [...prev, { message, color }]);
  };
  
  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
 
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 9999
        }}
      >
        {notifications.map((n, idx) => (
          <Notification key={idx} message={n.message} color={n.color} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};