import { useState } from 'react';
import {questionsHTML} from '../../constants/QuizHTML';
import {questionsCSS} from '../../constants/QuizCSS';
import {questionsJS} from '../../constants/QuizJS';
import styles from './Quiz.module.css';

const Quiz = ({ quizType = 'javascript' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const getQuestions = () => {
    switch(quizType) {
      case 'html':
        return questionsHTML;
      case 'css':
        return questionsCSS;
      case 'javascript':
        return questionsJS;
      default:
        return questionsHTML;
    }
  };
  
  const questions = getQuestions();

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswer = {
        questionId: questions[currentQuestion].id,
        userAnswer: selectedAnswer,
        correctAnswer: questions[currentQuestion].answer
      };
      
      setAnswers([...answers, newAnswer]);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }
  };

  const calculateScore = () => {
    return answers.filter(a => a.userAnswer === a.correctAnswer).length;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
  };

  if (finished) {
    const correct = calculateScore();
    const total = questions.length;
    
    return (
      <div className={styles.quizContainer}>
        <div className={styles.result}>
          <h2>Quiz Finalizado!</h2>
          <div className={styles.score}>
            <p className={styles.points}>{correct} / {total}</p>
            <p className={styles.percentage}>
              {Math.round((correct / total) * 100)}% de acerto
            </p>
          </div>
          
          <div className={styles.details}>
            <h3>Resumo:</h3>
            {answers.map((answer, idx) => (
              <div key={idx} className={styles.summaryItem}>
                <span className={styles.ask}>Pergunta {idx + 1}:</span>
                <span className={answer.userAnswer === answer.correctAnswer ? styles.correct : styles.wrong}>
                  {answer.userAnswer === answer.correctAnswer ? "✓ Acertou" : "✗ Errou"}
                </span>
              </div>
            ))}
            
            <div className={styles.learnMore}>
              <p>
                Quer aprender mais HTML, CSS ou JavaScript de graça?
                Eu recomendo muito o 
                <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">
                  FreeCodeCamp
                </a>. 
                É 100% gratuito, open source e você ganha certificados fazendo projetos reais.
              </p>
            </div>
          </div>
          
          <button onClick={restartQuiz} className={styles.restartButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className={styles.quizContainer}>
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div 
            className={styles.currentProgress}
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className={styles.counter}>
          Pergunta {currentQuestion + 1} de {questions.length}
        </p>
      </div>

      <div className={styles.questionContainer}>
        <h2 className={styles.questionTitle}>{question.question}</h2>
        
        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                selectedAnswer === index ? styles.selected : ''
              }`}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
          className={`${styles.nextButton} ${
            selectedAnswer === null ? styles.disabled : ''
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;