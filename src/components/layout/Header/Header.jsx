import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import {
  FaSun,
  FaMoon, 
  FaBars, 
  FaTimes, 
  FaBook, 
  FaEdit, 
  FaHome, 
  FaInfoCircle, 
  FaSearch, 
  FaTags, 
  FaHeart,
  FaUser,
  FaCode,
  FaTerminal,
  FaCog } from 'react-icons/fa';
import {blogAPI} from '../../../api';
import styles from './Header.module.css';

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  
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
  
  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
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
  
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        setIsNavMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);
  
  return (
    <>
      <div 
        className={`${styles.overlay} ${(isMenuOpen || showResults || isNavMenuOpen) ? styles.active : ''}`}
        onClick={() => {
          closeMenu();
          setIsNavMenuOpen(false);
        }}
      />
      
      <header className={styles.header}>
        <div className={styles.container}>
          <button 
            className={styles.hamburger}
            onClick={toggleNavMenu}
            aria-label={isNavMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isNavMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <Link to="/" className={styles.logo} onClick={() => {
            closeMenu();
            setIsNavMenuOpen(false);
          }}>
            dev
          </Link>

          <nav className={`${styles.desktopNav} ${isNavMenuOpen ? styles.mobileActive : ''}`}>
            <ul className={styles.desktopNavList}>
              <li>
                <Link to="/" className={styles.desktopNavLink} onClick={() => setIsNavMenuOpen(false)}>
                  <FaHome className={styles.desktopNavIcon} />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link to="/posts" className={styles.desktopNavLink} onClick={() => setIsNavMenuOpen(false)}>
                  <FaBook className={styles.desktopNavIcon} />
                  <span>Posts</span>
                </Link>
              </li>
              <li>
                <button 
                  className={styles.desktopThemeBtn}
                  onClick={() => {
                    toggleTheme();
                    setIsNavMenuOpen(false);
                  }}
                  aria-label="Alternar tema"
                >
                  <div className={styles.desktopThemeIconContainer}>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                  </div>
                  <span>Tema</span>
                </button>
              </li>
            </ul>
          </nav>

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
                      onClick={() => {
                        closeMenu();
                        setIsNavMenuOpen(false);
                      }}
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
          </div>
          
          <div className={styles.controls}>
            <button 
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
            >
              {isMenuOpen ? <FaTimes /> : <FaSearch />}
            </button>
          </div>
          
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
            
            <div className={`${styles.mobileSearchResults} ${showResults ? styles.active : ''}`}>
              {searchResults.length > 0 ? (
                searchResults.map((post, index) => (
                  <Link 
                    key={post.frontmatter.id} 
                    to={`/post/${post.slug}?id=${post.frontmatter.id}`}
                    className={styles.mobileSearchResult}
                    onClick={() => {
                      closeMenu();
                      setIsNavMenuOpen(false);
                    }}
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

      { /* Menu Bottom Fixo */ }
      <nav className={styles.menu}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              <FaHome className={styles.navIcon} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className={styles.navLink}>
              <FaBook className={styles.navIcon} />
              Posts
            </Link>
          </li>
          <li>
            <button 
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label="Alternar tema"
            >
              <div className={styles.themeIconContainer}>
                <FaSun className={styles.sun} />
                <FaMoon className={styles.moon} />
              </div>
              <span className={styles.themeLabel}>
                Tema
              </span>
            </button>
          </li>
          <li>
            <Link to="/tags" className={styles.navLink}>
              <FaTags className={styles.navIcon} />
              Tags
            </Link>
          </li>
          <li>
            <Link to="/favorites" className={styles.navLink}>
              <FaHeart className={styles.navIcon} />
              Favoritos
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}