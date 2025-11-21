import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>[Andrezin.<span>blog</span>]</h3>
          <p className={styles.footerDescription}>
            Compartilhando conhecimento e experiências através da tecnologia e desenvolvimento.
          </p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/Andrezinrc" className={styles.socialLink}>GitHub</a>
            <a href="https://instagram.com/andrezin.dev" className={styles.socialLink}>Instagram</a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Mapa do blog</h4>
          <nav className={styles.footerNav}>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/about" className={styles.footerLink}>Sobre</Link>
            <Link to="/posts" className={styles.footerLink}>Blog</Link>
            <Link to="/tags" className={styles.footerLink}>Tags</Link>
          </nav>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Contato</h4>
          <p className={styles.contactInfo}>
            <a href="mailto:dev.contactandre@gmail.com" className={styles.footerLink}>
              dev.contactandre@gmail.com
            </a>
          </p>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} DreeBlog. Todos os direitos reservados.
        </p>
        <div className={styles.credits}>
          <p>Desenvolvido por 
            <a href="https://andrecode.vercel.app" className={styles.devLink}>
              André Moreira
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;