import styles from '../../styles/shared/posts/Posts.module.css';

export default function LoadingState({ message = "Carregando posts..." }) {
  return (
    <div className={styles.page}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        {message}
      </div>
    </div>
  );
}