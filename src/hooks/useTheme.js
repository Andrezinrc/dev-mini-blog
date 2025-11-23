import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
   
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    return 'dark';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
 
  return [theme, toggleTheme];
};