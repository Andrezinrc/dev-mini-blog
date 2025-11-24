import styles from '../../styles/shared/posts/Posts.module.css';

export default function EmptyState({
  message = "Nenhum post encontrado",
  subtitle = "Seja o primeiro a contribuir com o blog!"
}) {
  return (
    <div className={styles.empty}>
      <h3>{message}</h3>
      <p>{subtitle}</p>
    </div>
  );
}