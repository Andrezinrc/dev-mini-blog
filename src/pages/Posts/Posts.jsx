import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import { blogAPI } from '../../api';
import { useNotify } from '../../context/NotificationProvider';
import PostsHeader from '../../components/Posts/PostsHeader';
import PostsGrid from '../../components/Posts/PostsGrid';
import ShareModal from '../../components/Posts/ShareModal';
import {usePostsLogic} from '../../hooks/usePostsLogic';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {notify} = useNotify();
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
    loadPosts();
  }, []);
  
  async function loadPosts() {
    try {
      setError(null);
      const data = await blogAPI.getPostsList();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setError('Não foi possível carregar os posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }
  
  const handleRetry = () => {
    setLoading(true);
    loadPosts();
  };
  
  return (
    <div className={styles.page}>
      <PostsHeader
        subtitle="Experiências, tutoriais e descobertas da nossa comunidade"
        stats={`${posts.length} post${posts.length !== 1 ? 's' : ''} publicado${posts.length !== 1 ? 's' : ''}`}
      />
      <PostsGrid
        posts={posts}
        loading={loading}
        error={error}
        favorites={favorites}
        onShareClick={handleShareClick}
        onFavoriteUpdate={handleFavoriteUpdate}
        dataStructure="default"
        onRetry={handleRetry}
        emptyMessage="Nenhum post encontrado"
        emptySubtitle="Seja o primeiro a contribuir com o blog!"
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