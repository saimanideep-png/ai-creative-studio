import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© 2026 Sai Manideep Rachamadugu</p>

        <nav className="footer__links" aria-label="Social links">
          <a
            id="footer-github"
            className="footer__link"
            href="https://github.com/manideep963"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            id="footer-linkedin"
            className="footer__link"
            href="https://www.linkedin.com/in/rachamadugusaimanideep/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            id="footer-email"
            className="footer__link"
            href="mailto:saimanideep369@gmail.com"
          >
            Email
          </a>
        </nav>

        <p className="footer__tagline">Built with creativity &amp; AI</p>
      </div>
    </footer>
  );
};

export default Footer;
