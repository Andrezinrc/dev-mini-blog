import { useEffect } from 'react';

export const useThemeManager = () => {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || 'dark';
    
    document.documentElement.setAttribute('data-theme', theme);

    const handleChange = (e) => document.documentElement.setAttribute('data-theme', e.detail);
    window.addEventListener('themeChanged', handleChange);
    
    return () => window.removeEventListener('themeChanged', handleChange);
  }, []);
};