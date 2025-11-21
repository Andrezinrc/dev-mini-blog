import styles from '../../styles/shared/posts/Posts.module.css';
import PostCard from './PostCard';

export default function PostsGrid({
  posts,
  loading,
  error,
  favorites,
  onShareClick,
  onFavoriteUpdate,
  dataStructure = 'default',
  onRetry,
  emptyMessage = "Nenhum post encontrado",
  emptySubtitle = "🚧 Blog em desenvolvimento"
}) {
  
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Carregando posts...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h3>Erro ao carregar</h3>
          <p>{error}</p>
          <button onClick={onRetry} className={styles.retryButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.postsGrid}>
      {posts.length === 0 ? (
        <div className={styles.empty}>
          <h3>{emptyMessage}</h3>
          <p>{emptySubtitle}</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard 
            key={post.slug}
            post={post}
            favorites={favorites}
            onShareClick={onShareClick}
            onFavoriteUpdate={onFavoriteUpdate}
            dataStructure={dataStructure}
          />
        ))
      )}
    </div>
  );
}