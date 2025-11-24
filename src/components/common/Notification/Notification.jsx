import React from 'react';
import styles from './Notification.module.css';

function Notification({ message, color }) {
  return (
    <div className={styles['notification']} style={{ backgroundColor: color }}>
      <span>{message}</span>
    </div>
  );
}

export default Notification;