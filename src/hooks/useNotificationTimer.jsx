import { useEffect } from 'react';

export const useNotificationTimer = (notifications, setNotifications) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 2000);
     
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);
};