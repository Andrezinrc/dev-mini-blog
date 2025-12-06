import Quiz from '../../components/quiz/Quiz';
import styles from './Quiz.module.css';
const QuizPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Quiz JavaScript</h1>
        <p className={styles.subtitle}>
          Teste seus conhecimentos com 10 perguntas sobre JavaScript
        </p>
      </header>
      
      <main className={styles.main}>
        <Quiz />
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