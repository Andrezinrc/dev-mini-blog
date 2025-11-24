import styles from '../../styles/shared/posts/Posts.module.css';
import { FiX, FiMessageCircle, FiFacebook, FiLinkedin, FiTwitter, FiLink } from 'react-icons/fi';
import {useNotify} from '../../context/NotificationProvider';

export default function ShareModal({
  isOpen,
  onClose,
  post,
  onShare,
  onCopyLink,
  dataStructure = 'default'
}) {
  
  const {notify} = useNotify();
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const getPostData = (field) => {
    if (dataStructure === 'frontmatter') {
      return post?.frontmatter?.[field] || post?.[field];
    }
    return post?.[field];
  };
  
  const getShareLink = () => {
    if (!post) return '';
    return `https://andrezin-blog.vercel.app/post/${getPostData('slug')}?id=${getPostData('id')}`;
  };
  
  const getShareText = () => {
    if (!post) return '';
    return `Confira este post: "${getPostData('title')}"`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Compartilhar post</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className={styles.shareOptions}>
          <button 
            className={styles.shareOption}
            onClick={() => onShare('whatsapp', getShareLink(), getShareText())}
          >
            <FiMessageCircle size={20} />
            WhatsApp
          </button>
          
          <button 
            className={styles.shareOption}
            onClick={() => onShare('facebook', getShareLink(), getShareText())}
          >
            <FiFacebook size={20} />
            Facebook
          </button>
          
          <button 
            className={styles.shareOption}
            onClick={() => onShare('linkedin', getShareLink(), getShareText())}
          >
            <FiLinkedin size={20} />
            LinkedIn
          </button>
          
          <button 
            className={styles.shareOption}
            onClick={() => onShare('twitter', getShareLink(), getShareText())}
          >
            <FiTwitter size={20} />
            Twitter
          </button>
          
          <button 
            className={styles.shareOption}
            onClick={() => {
              onCopyLink(getShareLink());
              notify("Link copiado", '#3b82f6');
            }}
          >
            <FiLink size={20} />
            Copiar Link
          </button>
        </div>
      </div>
    </div>
  );
}