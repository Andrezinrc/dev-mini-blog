import { useLocation } from 'react-router-dom';
import Quiz from '../../components/quiz/Quiz';
import styles from './Quiz.module.css';

const QuizPage = () => {
  const location = useLocation();
  const quizType = location.state?.quizType || 'javascript';
  
  const quizConfig = {
    javascript: {
      title: 'Quiz JavaScript',
      subtitle: 'Teste seus conhecimentos com 10 perguntas sobre JavaScript'
    },
    html: {
      title: 'Quiz HTML',
      subtitle: 'Teste seus conhecimentos com 10 perguntas sobre HTML5'
    },
    css: {
      title: 'Quiz CSS',
      subtitle: 'Teste seus conhecimentos com 10 perguntas sobre CSS'
    },
    react: {
      title: 'Quiz React',
      subtitle: 'Teste seus conhecimentos com 10 perguntas sobre React JS'
    }
  };
  
  const config = quizConfig[quizType] || quizConfig.javascript;
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>
          {config.subtitle}
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