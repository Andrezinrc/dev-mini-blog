import React from 'react';
import styles from './Load.module.css';

const Load = () => {
  return (
    <div className={styles['loader-overlay']}>
      <div className={styles['loader-dots']}>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
      </div>
    </div>
  );
};

export default Load;