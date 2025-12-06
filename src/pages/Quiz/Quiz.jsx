import { useLocation } from 'react-router-dom';
import Quiz from '../../components/quiz/Quiz';
import styles from './Quiz.module.css';

const QuizPage = () => {
  const location = useLocation();
  const quizType = location.state?.quizType || 'javascript';
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {quizType === 'javascript' ? 'Quiz JavaScript' : 'Quiz'}
        </h1>
        <p className={styles.subtitle}>
          {quizType === 'javascript' 
            ? 'Teste seus conhecimentos com 10 perguntas sobre JavaScript'
            : 'Teste seus conhecimentos'
          }
        </p>
      </header>
      
      <main className={styles.main}>
        <Quiz quizType={quizType} />
      </main>
      
      <footer className={styles.footer}>
        <p className={styles.tip}>
          Dica: Leia cada pergunta com atenção antes de responder!
        </p>
      </footer>
    </div>
  );
};

export default QuizPage;