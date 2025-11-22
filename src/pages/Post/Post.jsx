import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styles from './Post.module.css';
import { blogAPI } from '../../api';
import 'highlight.js/styles/github-dark.css';
import Comments from '../../components/Comments/Comments';

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const postId = searchParams.get('id');
  
  useEffect(() => {
    if (postId) {
      loadPost(postId);
    } else {
      setError('ID do post não encontrado na URL');
      setLoading(false);
    }
  }, [postId]);
  
  async function loadPost(id) {
    try {
      setError(null);
      const postData = await blogAPI.getPostById(id);
      
      if (!postData || !postData.frontmatter) {
        throw new Error('Post não encontrado');
      }
      
      setPost(postData);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setError('Post não encontrado ou erro ao carregar conteúdo.');
    } finally {
      setLoading(false);
    }
  }
  
  const handleBack = () => {
    navigate('/posts');
  };
  
  const handleRetry = () => {
    if (postId) {
      setLoading(true);
      loadPost(postId);
    }
  };
  
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Carregando post...
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h1>Post não encontrado</h1>
          <p>{error || 'O post que você está procurando não existe.'}</p>
          <div className={styles.actions}>
            <button onClick={handleBack} className={styles.backButton}>
              Voltar para Posts
            </button>
            {postId && (
              <button onClick={handleRetry} className={styles.retryButton}>
                Tentar Novamente
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  const hasImage = post.frontmatter.image && post.frontmatter.image.trim() !== '';
  
  return (
    <div className={styles.page}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Voltar para Posts
      </button>

      <article className={styles.post}>
        <header className={styles.header}>
          {hasImage && (
            <div className={styles.imageContainer}>
              <img 
                src={post.frontmatter.image} 
                alt={post.frontmatter.title}
                className={styles.postImage}
              />
            </div>
          )}
          
          <h1 className={styles.title}>{post.frontmatter.title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.author}>por {post.frontmatter.author}</span>
            <span className={styles.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('pt-BR')}
            </span>
            {post.frontmatter.category && (
              <span className={styles.category}>{post.frontmatter.category}</span>
            )}
          </div>

          {post.frontmatter.description && (
            <p className={styles.description}>{post.frontmatter.description}</p>
          )}

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className={styles.tags}>
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({node, ...props}) => <h1 className={styles.markdownH1} {...props} />,
              h2: ({node, ...props}) => <h2 className={styles.markdownH2} {...props} />,
              h3: ({node, ...props}) => <h3 className={styles.markdownH3} {...props} />,
              p: ({node, ...props}) => <p className={styles.markdownP} {...props} />,
              code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                if (!inline && match) {
                  return (
                    <pre className={styles.markdownPre}>
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                }
                return <code className={styles.markdownCode} {...props}>{children}</code>;
              },
              blockquote: ({node, ...props}) => (
                <blockquote className={styles.markdownBlockquote} {...props} />
              ),
              ul: ({node, ...props}) => <ul className={styles.markdownUl} {...props} />,
              ol: ({node, ...props}) => <ol className={styles.markdownOl} {...props} />,
              li: ({node, ...props}) => <li className={styles.markdownLi} {...props} />,
              a: ({node, ...props}) => <a className={styles.markdownA} {...props} />,
              table: ({node, ...props}) => <table className={styles.markdownTable} {...props} />,
              thead: ({node, ...props}) => <thead className={styles.markdownThead} {...props} />,
              tbody: ({node, ...props}) => <tbody className={styles.markdownTbody} {...props} />,
              tr: ({node, ...props}) => <tr className={styles.markdownTr} {...props} />,
              th: ({node, ...props}) => <th className={styles.markdownTh} {...props} />,
              td: ({node, ...props}) => <td className={styles.markdownTd} {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className={styles.footer}>
          <p>Post publicado em {new Date(post.frontmatter.date).toLocaleDateString('pt-BR')}</p>
        </footer>

        <Comments postSlug={post.frontmatter.slug || postId} />
      </article>
    </div>
  );
}