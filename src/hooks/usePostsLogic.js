import { useState, useEffect } from 'react';

export function usePostsLogic() {
  const [shareModal, setShareModal] = useState({ open: false, post: null });
  const [favorites, setFavorites] = useState({});
  
  useEffect(() => {
    loadFavorites();
  }, []);
  
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
  
  return {
    shareModal,
    favorites,
    handleShareClick,
    handleCloseShareModal,
    handleShare,
    handleCopyLink,
    handleFavoriteUpdate
  };
}