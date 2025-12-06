import { useState } from 'react';
import styles from './Quiz.module.css';

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "Qual método retorna um novo array com elementos filtrados?",
      options: ["map()", "filter()", "reduce()", "forEach()"],
      answer: 1
    },
    {
      id: 2,
      question: "Qual palavra-chave cria uma variável com escopo de bloco?",
      options: ["var", "let", "const", "let e const"],
      answer: 3
    },
    {
      id: 3,
      question: "O que é 'hoisting' em JavaScript?",
      options: [
        "Elevação de variáveis e funções",
        "Um tipo de loop",
        "Método de ordenação",
        "Conversão de tipos"
      ],
      answer: 0
    },
    {
      id: 4,
      question: "Qual operador retorna 'true' se os valores forem iguais em valor e tipo?",
      options: ["==", "===", "!=", "!=="],
      answer: 1
    },
    {
      id: 5,
      question: "Qual método transforma JSON string em objeto?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.fromString()"],
      answer: 0
    },
    {
      id: 6,
      question: "Qual NÃO é um tipo primitivo em JavaScript?",
      options: ["string", "number", "boolean", "array"],
      answer: 3
    },
    {
      id: 7,
      question: "Qual hook é usado para efeitos colaterais?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      answer: 1
    },
    {
      id: 8,
      question: "O que é 'closure' em JavaScript?",
      options: [
        "Função dentro de outra função",
        "Escopo que preserva variáveis",
        "Método de array",
        "Tipo de dado"
      ],
      answer: 1
    },
    {
      id: 9,
      question: "Qual método adiciona elemento ao final do array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0
    },
    {
      id: 10,
      question: "O que significa 'DOM'?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Output Module",
        "Document Order Method"
      ],
      answer: 0
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
                <span>Pergunta {idx + 1}:</span>
                <span className={answer.userAnswer === answer.correctAnswer ? styles.correct : styles.wrong}>
                  {answer.userAnswer === answer.correctAnswer ? "✓ Acertou" : "✗ Errou"}
                </span>
              </div>
            ))}
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