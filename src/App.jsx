import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import * as Components from './components';
import * as Pages from './routes/pages';

import {useThemeManager} from './hooks/useThemeManager';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
 
  useThemeManager();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Components.ScrollToTop />
      <Components.Header />
      <main>
        {isLoading ? (
          <Components.Load />
        ) : (
            <Routes>
              <Route path="/" element={<Pages.Home />} replace />
              <Route path="/posts" element={<Pages.Posts />} />
              <Route path="/post/:slug" element={<Pages.Post />} />
              <Route path="/tags" element={<Pages.Tags />} />
              <Route path="/tags/:tagName" element={<Pages.TagPosts />} />
              <Route path="*" element={<Pages.NotFound />} />
            </Routes>
          )}
      </main>
      <Components.Footer />
    </div>
  );
}
