import { Link } from 'react-router-dom';
import styles from '../../styles/shared/posts/Posts.module.css';
import { FiArrowLeft, FiTag } from 'react-icons/fi';

export default function PostsHeader({
  title,
  subtitle,
  stats,
  showBreadcrumb = false,
  breadcrumbLink = "/tags",
  breadcrumbText = "Voltar para Tags",
  tagName,
  showTagIcon = false
}) {
  
  return (
    <header className={styles.header}>
      {showBreadcrumb && (
        <div className={styles.breadcrumb}>
          <Link to={breadcrumbLink} className={styles.breadcrumbLink}>
            <FiArrowLeft size={16} />
            {breadcrumbText}
          </Link>
        </div>
      )}
      
      {showTagIcon ? (
        <div className={styles.tagHeader}>
          <div className={styles.tagIcon}>
            <FiTag size={24} />
          </div>
          <div>
            <h1 className={styles.title}><span>#</span>{tagName}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>
      ) : (
        <>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.stats}>{stats}</div>
        </>
      )}
    </header>
  );
}