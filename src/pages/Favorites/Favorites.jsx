import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import {blogAPI} from '../../api';
import {usePostsLogic} from '../../hooks/usePostsLogic';
import PostsHeader from '../../components/Posts/PostsHeader';
import PostsGrid from '../../components/Posts/PostsGrid';
import ShareModal from '../../components/Posts/ShareModal';

export default function Favorites() {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const {
    shareModal,
    favorites,
    handleShareClick,
    handleCloseShareModal,
    handleShare,
    handleCopyLink,
    handleFavoriteUpdate
  } = usePostsLogic();
  
  useEffect(() => {
    loadFavoritePosts();
  }, [favorites]);
  
  async function loadFavoritePosts() {
    try {
      setError(null);
      const data = await blogAPI.getPostsList();
      const allPosts = data.posts || [];
     
      const filteredFavorites = allPosts.filter(post => favorites[post.id]);
      
      setFavoritePosts(filteredFavorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      setError('Não foi possível carregar seus favoritos.');
    } finally {
      setLoading(false);
    }
  }
  
  const handleRetry = () => {
    setLoading(true);
    loadFavoritePosts();
  };
  
  return (
    <div className={styles.page}>
      <PostsHeader
        title="Meus Favoritos"
        subtitle="Seus posts salvos para ler depois"
        stats={`${favoritePosts.length} post${favoritePosts.length !== 1 ? 's' : ''} favoritado${favoritePosts.length !== 1 ? 's' : ''}`}
        showBreadcrumb={true}
        breadcrumbLink="/posts"
        breadcrumbText="Voltar para Posts"
      />
      
      <PostsGrid
        posts={favoritePosts}
        loading={loading}
        error={error}
        favorites={favorites}
        onShareClick={handleShareClick}
        onFavoriteUpdate={handleFavoriteUpdate}
        dataStructure="default"
        onRetry={handleRetry}
        emptyMessage="Nenhum post favoritado"
        emptySubtitle="Quando você favoritar posts, eles aparecerão aqui!"
      />
      
      <ShareModal
        isOpen={shareModal.open}
        onClose={handleCloseShareModal}
        post={shareModal.post}
        onShare={handleShare}
        onCopyLink={handleCopyLink}
        dataStructure="default"
      />
    </div>
  );
}