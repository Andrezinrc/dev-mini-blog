import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import { blogAPI } from '../../api';
import { useNotify } from '../../context/NotificationProvider';
import PostsHeader from '../../components/blog/PostsHeader';
import PostsGrid from '../../components/blog/PostsGrid';
import ShareModal from '../../components/blog/ShareModal';
import {usePostsLogic} from '../../hooks/usePostsLogic';

export default function TagPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const {tagName} = useParams();
  
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
    loadTagPosts();
  }, [tagName]);
  
  async function loadTagPosts() {
    try {
      setError(null);
      const data = await blogAPI.getPostsByTag(tagName);
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Erro ao carregar posts da tag:', error);
      setError('Não foi possível carregar os posts desta tag.');
    } finally {
      setLoading(false);
    }
  }
  
  const handleRetry = () => {
    setLoading(true);
    loadTagPosts();
  };
  
  return (
    <div className={styles.page}>
      <PostsHeader
        showBreadcrumb={true}
        breadcrumbLink="/tags"
        breadcrumbText="Voltar para Tags"
        showTagIcon={true}
        tagName={tagName}
        subtitle="Posts marcados com esta tag"
        stats={`${posts.length} post${posts.length !== 1 ? 's' : ''} com esta tag`}
      />
      <PostsGrid
        posts={posts}
        loading={loading}
        error={error}
        favorites={favorites}
        onShareClick={handleShareClick}
        onFavoriteUpdate={handleFavoriteUpdate}
        dataStructure="frontmatter"
        onRetry={handleRetry}
        emptyMessage={`Nenhum post encontrado`}
        emptySubtitle={`Não há posts com a tag #${tagName}.`}
      />
      <ShareModal
        isOpen={shareModal.open}
        onClose={handleCloseShareModal}
        post={shareModal.post}
        onShare={handleShare}
        onCopyLink={handleCopyLink}
        dataStructure="frontmatter"
      />
    </div>
  );
}