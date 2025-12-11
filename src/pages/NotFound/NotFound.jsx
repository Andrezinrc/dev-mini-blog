import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles['not-found-container']}>
      <div className={styles['not-found-content']}>
        <div className={styles['error-code']}>404</div>
        <h1 className={styles['error-title']}>Página não encontrada</h1>
        <p className={styles['error-description']}>
          A página que você está procurando pode ter sido removida ou não está disponível no momento.
        </p>
        
        <div className={styles['action-buttons']}>
          <button 
            onClick={() => window.history.back()} 
            className={styles['back-button']}
          >
            Voltar à página anterior
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;