import { useNavigate } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import { FiShare2, FiHeart } from 'react-icons/fi';
import {useNotify} from '../../context/NotificationProvider';

export default function PostCard({
  post,
  onShareClick,
  favorites,
  onFavoriteUpdate,
  dataStructure = 'default'
}) {
  const navigate = useNavigate();
  const {notify} = useNotify();
  
  const getPostData = (field) => {
    if (dataStructure === 'frontmatter') {
      return post.frontmatter?.[field] || post[field];
    }
    return post[field];
  };
  
  const getPostId = () => {
    return dataStructure === 'frontmatter' ?
      post.frontmatter?.id || post.id :
      post.id;
  };
  
  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    
    const postId = getPostId();
    const newFavorites = { ...favorites };
    const wasFavorited = !!newFavorites[postId];
    
    if (wasFavorited) {
      delete newFavorites[postId];
      notify("Removido dos favoritos", '#6b7280');
    } else {
      newFavorites[postId] = {
        id: postId,
        slug: getPostData('slug'),
        title: getPostData('title'),
        date: getPostData('date'),
        author: getPostData('author'),
        favoritedAt: new Date().toISOString()
      };
      notify("Adicionado aos favoritos", '#3b82f6');
    }
    
    if (onFavoriteUpdate) {
      onFavoriteUpdate(newFavorites);
    }
    
    try {
      localStorage.setItem('blog-favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      notify("Erro ao salvar favorito", '#ef4444');
    }
  };
  
  const handlePostClick = () => {
    navigate(`/post/${getPostData('slug')}?id=${getPostId()}`);
  };
  
  const handleShareClick = (event) => {
    event.stopPropagation();
    if (onShareClick) {
      onShareClick(post);
    }
  };
  
  const checkIsFavorited = () => {
    return !!favorites[getPostId()];
  };
  
  return (
    <article 
      className={styles.postCard}
      onClick={handlePostClick}
    >
      <div className={styles.cardContent}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>{getPostData('title')}</h2>
          <div className={styles.postActions}>
            {getPostData('category') && (
              <span className={styles.categoryTag}>{getPostData('category')}</span>
            )}
            <div className={styles.actionButtons}>
              <button 
                className={`${styles.favoriteButton} ${
                  checkIsFavorited() ? styles.favorited : ''
                }`}
                onClick={handleFavoriteClick}
                aria-label={
                  checkIsFavorited() 
                    ? 'Remover dos favoritos' 
                    : 'Adicionar aos favoritos'
                }
              >
                <FiHeart 
                  size={16} 
                  fill={checkIsFavorited() ? 'currentColor' : 'none'}
                />
              </button>
              <button 
                className={styles.shareButton}
                onClick={handleShareClick}
                aria-label="Compartilhar post"
              >
                <FiShare2 size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <p className={styles.postDescription}>{getPostData('description')}</p>
        
        <div className={styles.postMeta}>
          <div className={styles.authorSection}>
            <div className={styles.authorInfo}>
              <img 
                src={getPostData('github') 
                  ? `https://github.com/${getPostData('github')}.png`
                  : '/assets/authors/default-avatar.png'
                }
                alt={`Foto de ${getPostData('author')}`}
                className={styles.authorAvatar}
                onError={(e) => {
                  e.target.src = '/assets/authors/default-avatar.png';
                }}
              />
              <div className={styles.authorDetails}>
                <span className={styles.author}>por {getPostData('author')}</span>
                {getPostData('github') && (
                  <a 
                    href={`https://github.com/${getPostData('github')}`}
                    className={styles.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{getPostData('github')}
                  </a>
                )}
                <span className={styles.date}>
                  {new Date(getPostData('date')).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
            <div className={styles.readMore}>
              Ler mais →
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}