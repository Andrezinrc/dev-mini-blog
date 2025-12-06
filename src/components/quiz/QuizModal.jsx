import { useNavigate } from 'react-router-dom';
import styles from './QuizModal.module.css';
import { FiX, FiCode } from 'react-icons/fi';

const QuizModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const quizzes = [
    {
      id: 'javascript',
      title: 'JavaScript Quiz',
      description: 'Teste seus conhecimentos em JavaScript com 10 perguntas',
      questionsCount: 10,
      difficulty: 'Iniciante/Intermediário',
      icon: <FiCode size={24} />,
      color: '#f7df1e'
    }
  ];

  const handleQuizSelect = (quizId) => {
    if (quizId === 'javascript') {
      navigate('/quiz', { state: { quizType: 'javascript' } });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Quiz Disponíveis</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className={styles.quizzesList}>
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className={styles.quizCard}
              onClick={() => handleQuizSelect(quiz.id)}
            >
              <div 
                className={styles.quizIcon}
                style={{ backgroundColor: quiz.color }}
              >
                {quiz.icon}
              </div>
              
              <div className={styles.quizInfo}>
                <h3 className={styles.quizTitle}>{quiz.title}</h3>
                <p className={styles.quizDescription}>{quiz.description}</p>
                
                <div className={styles.quizDetails}>
                  <span className={styles.detail}>
                    {quiz.questionsCount} perguntas
                  </span>
                  <span className={styles.detail}>
                    {quiz.difficulty}
                  </span>
                </div>
              </div>
              
              <div className={styles.arrow}>→</div>
            </div>
          ))}
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.closeModalButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;