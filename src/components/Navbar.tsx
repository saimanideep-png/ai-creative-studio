import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) {
        observerRef.current.observe(section);
      }
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when a link is clicked
  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__inner">
        <a className="navbar__logo" href="#" id="navbar-logo">
          SM
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" id="navbar-links-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                className={`navbar__link${
                  activeSection === item.href.replace('#', '')
                    ? ' navbar__link--active'
                    : ''
                }`}
                href={item.href}
                id={`nav-link-${item.href.replace('#', '')}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="navbar__hamburger"
          id="navbar-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`navbar__hamburger-icon${
              isMobileMenuOpen ? ' navbar__hamburger-icon--open' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <ul className="navbar__mobile-menu" id="navbar-links-mobile">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                className={`navbar__link${
                  activeSection === item.href.replace('#', '')
                    ? ' navbar__link--active'
                    : ''
                }`}
                href={item.href}
                id={`nav-link-mobile-${item.href.replace('#', '')}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
