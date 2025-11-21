import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import {blogAPI} from '../../api';
import {useNotify} from '../../context/NotificationProvider';
import PostsHeader from '../../components/Posts/PostsHeader';
import PostsGrid from '../../components/Posts/PostsGrid';
import ShareModal from '../../components/Posts/ShareModal';

export default function TagPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareModal, setShareModal] = useState({ open: false, post: null });
  const [favorites, setFavorites] = useState({});
  
  const navigate = useNavigate();
  const {tagName} = useParams();
  
  useEffect(() => {
    loadTagPosts();
    loadFavorites();
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
  
  function loadFavorites() {
    try {
      const stored = localStorage.getItem('blog-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites({});
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      setFavorites({});
    }
  }
  
  function handleFavoriteUpdate(newFavorites) {
    setFavorites(newFavorites);
  }
  
  const handleShareClick = (post) => {
    setShareModal({ open: true, post });
  };
  
  const handleCloseShareModal = () => {
    setShareModal({ open: false, post: null });
  };
  
  const handleShare = (network, shareLink, shareText) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedLink = encodeURIComponent(shareLink);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedLink}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedLink}`
    };
    
    window.open(urls[network], '_blank', 'width=600,height=400');
    handleCloseShareModal();
  };
  
  const handleCopyLink = async (shareLink) => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

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