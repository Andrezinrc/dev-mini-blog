import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  
  /*
   * páginas que mostram header e footer
   */
  const pagesWithLayout = [
    '/',
    '/posts',
    '/tags',
    '/favorites'
  ];
  
  const isTagPage = location.pathname.startsWith('/tags/');
  const isPostPage = location.pathname.startsWith('/post/');
  const shouldShowLayout =
    pagesWithLayout.includes(location.pathname) ||
    isTagPage ||
    isPostPage;
  
  if (!shouldShowLayout) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;