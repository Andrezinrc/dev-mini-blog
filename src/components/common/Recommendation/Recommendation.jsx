import React, { useState } from 'react';
import styles from './Recommendation.module.css';

export default function Recommendation(){
  const [isClosed, setIsClosed] = useState(false);
  
  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem('recommendationClosed', 'true');
  };
  
  if (isClosed) return null;
  
  return (
    <div className={styles.bar}>
      <p className={styles.text}>
        Estude grátis com{' '}
        <a 
          href="https://www.freecodecamp.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          <strong>freeCodeCamp</strong>
        </a>
      </p>

      <button 
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Fechar banner"
      >
        &times;
      </button>
    </div>
  );
};