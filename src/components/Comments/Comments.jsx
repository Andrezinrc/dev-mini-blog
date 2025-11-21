import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments({ postSlug }) {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('preferred_color_scheme');
 
  useEffect(() => {
    setMounted(true);
    
    const handleThemeChange = (e) => {
      setCurrentTheme(e.detail === 'dark' ? 'dark' : 'light');
    };
    
    const currentDocTheme = document.documentElement.getAttribute('data-theme');
    if (currentDocTheme) {
      setCurrentTheme(currentDocTheme === 'dark' ? 'dark' : 'light');
    }
    
    window.addEventListener('themeChanged', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);
  
  if (!mounted) {
    return (
      <div style={{ 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-light)'
      }}>
        Carregando comentários...
      </div>
    );
  }
  
  return (
    <div style={{ 
      marginTop: '3rem', 
      paddingTop: '2rem', 
      borderTop: '1px solid var(--border-color)'
    }}>
      <Giscus
        repo={import.meta.env.VITE_GISCUS_REPO}
        repoId={import.meta.env.VITE_GISCUS_REPO_ID}
        category={import.meta.env.VITE_GISCUS_CATEGORY}
        categoryId={import.meta.env.VITE_GISCUS_CATEGORY_ID}
        mapping="specific"
        term={postSlug}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={currentTheme}
        lang="pt"
        loading="lazy"
      />
    </div>
  );
}