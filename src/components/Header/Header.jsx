import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon, FaBars, FaTimes, FaBook, FaEdit, FaHome, FaInfoCircle, FaSearch, FaTags } from 'react-icons/fa';
import { blogAPI } from '../../api';
import styles from './Header.module.css';

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  
  useEffect(() => {
    loadAllPosts();
  }, []);
  
  async function loadAllPosts() {
    try {
      const data = await blogAPI.getAllPosts();
      setAllPosts(data.posts || []);
    } catch (error) {
      console.error('Erro ao carregar posts para busca:', error);
    }
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowResults(false);
    setSearchQuery('');
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      const results = allPosts.filter(post => {
        const searchText = `${post.frontmatter.title} ${post.frontmatter.description} ${post.frontmatter.author} ${post.frontmatter.tags?.join(' ')}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
      setSearchResults(results.slice(0, 5)); // Limita a 5 resultados
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  
  const handleClickOutside = () => {
    setShowResults(false);
  };
  
m
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);
  
  return (
    <>
      <div 
        className={`${styles.overlay} ${(isMenuOpen || showResults) ? styles.active : ''}`}
        onClick={closeMenu}
      />
      
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            [Dree<span className={styles.logoAccent}>Blog</span>]
          </Link>

          <div className={styles.mainContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={styles.searchInput}
                  onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                />
              </div>
              
              <div className={`${styles.searchResults} ${showResults ? styles.active : ''}`}>
                {searchResults.length > 0 ? (
                  searchResults.map((post, index) => (
                    <Link 
                      key={post.frontmatter.id} 
                      to={`/post/${post.slug}?id=${post.frontmatter.id}`}
                      className={styles.searchResult}
                      onClick={closeMenu}
                      style={{ '--index': index }}
                    >
                      <h4 className={styles.resultTitle}>{post.frontmatter.title}</h4>
                      <p className={styles.resultDescription}>{post.frontmatter.description}</p>
                      <span className={styles.resultAuthor}>por {post.frontmatter.author}</span>
                    </Link>
                  ))
                ) : (
                  searchQuery.length > 2 && (
                    <div className={styles.noResults}>
                      Nenhum post encontrado
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Menu Desktop */}
            <nav className={styles.nav}>
              <Link to="/" className={styles.navLink}>
                <FaHome className={styles.navIcon} />
                Home
              </Link>
              <Link to="/posts" className={styles.navLink}>
                <FaBook className={styles.navIcon} />
                Posts
              </Link>
              <Link to="/tags" className={styles.navLink}>
                <FaTags className={styles.navIcon} />
                Tags
              </Link>
            </nav>
          </div>
          
          <div className={styles.controls}>
            <button 
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label="Alternar tema"
            >
              <FaSun className={styles.sun} />
              <FaMoon className={styles.moon} />
            </button>
            
            <button 
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Menu Mobile */}
          <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
            <div className={styles.mobileSearchContainer}>
              <div className={styles.mobileSearchInputWrapper}>
                <FaSearch className={styles.mobileSearchIcon} />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={styles.mobileSearchInput}
                  onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                />
              </div>
            </div>
            
            <nav className={styles.mobileNav}>
              <Link to="/" className={styles.mobileLink} onClick={closeMenu}>
                <FaHome className={styles.mobileIcon} />
                Home
              </Link>
              <Link to="/posts" className={styles.mobileLink} onClick={closeMenu}>
                <FaBook className={styles.mobileIcon} />
                Posts
              </Link>
              <Link to="/tags" className={styles.mobileLink} onClick={closeMenu}>
                <FaTags className={styles.mobileIcon} />
                Tags
              </Link>
            </nav>
            
            <div className={`${styles.mobileSearchResults} ${showResults ? styles.active : ''}`}>
              {searchResults.length > 0 ? (
                searchResults.map((post, index) => (
                  <Link 
                    key={post.frontmatter.id} 
                    to={`/post/${post.slug}?id=${post.frontmatter.id}`}
                    className={styles.mobileSearchResult}
                    onClick={closeMenu}
                    style={{ '--index': index }}
                  >
                    <h4 className={styles.mobileResultTitle}>{post.frontmatter.title}</h4>
                    <p className={styles.mobileResultDescription}>{post.frontmatter.description}</p>
                  </Link>
                ))
              ) : (
                searchQuery.length > 2 && (
                  <div className={styles.mobileNoResults}>
                    Nenhum post encontrado
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}