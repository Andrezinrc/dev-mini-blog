import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../api';
import styles from './Tags.module.css';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadTags();
  }, []);
  
  async function loadTags() {
    try {
      const data = await blogAPI.getAllTags();
      setTags(data.tags);
    } catch (error) {
      console.error('Erro ao carregar tags:', error);
    } finally {
      setLoading(false);
    }
  }
  
  const getTagSize = (count) => {
    if (count>=10) return styles.tagLg;
    if (count>=5) return styles.tagMd;
    if (count>=3) return styles.tagSm;
    return styles.tagXs;
  };
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando tags...</div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore por <span>Tags</span></h1>
        <p className={styles.description}>
          Descubra conteúdo organizado por temas e categorias
        </p>
      </div>

      <div className={styles.tagsContainer}>
        <div className={styles.tagsGrid}>
          {tags.map((tag, index) => (
            <Link
              key={tag.name}
              to={`/tags/${tag.name}`}
              className={`${styles.tag} ${getTagSize(tag.count)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.tagName}>#{tag.name}</span>
              <span className={styles.tagCount}>({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {tags.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhuma tag encontrada.</p>
        </div>
      )}
    </div>
  );
}