import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../data/site';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '/#work', sectionId: 'work' },
  { label: 'Services', href: '/#services', sectionId: 'services' },
  { label: 'Process', href: '/#process', sectionId: 'process' },
  { label: 'About', href: '/#about', sectionId: 'about' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection for navbar background (>50px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer & active link highlighting
  useEffect(() => {
    if (location.pathname.startsWith('/services')) {
      setActiveSection('services');
      return;
    }

    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    // If there is a hash directly in URL
    if (location.hash) {
      setActiveSection(location.hash.replace('#', ''));
    }

    const sectionIds = ['contact', 'about', 'process', 'services', 'work'];
    const handleScrollSections = () => {
      const scrollPosition = window.scrollY + 120;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScrollSections, { passive: true });
    handleScrollSections();
    return () => window.removeEventListener('scroll', handleScrollSections);
  }, [location.pathname, location.hash]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const isItemActive = (item: NavItem) => {
    if (location.pathname.startsWith('/services') && item.sectionId === 'services') {
      return true;
    }
    if (location.pathname === '/' && activeSection === item.sectionId) {
      return true;
    }
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] py-4'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Studio wordmark */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 font-heading font-bold text-xl text-[var(--color-text)] tracking-wider group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)] inline-block transition-transform duration-200 group-hover:scale-125" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Right: Desktop nav links + Start a Project button */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Desktop Navigation">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    active
                      ? 'text-[var(--color-text)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-coral)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/#contact"
            onClick={() => handleLinkClick('/#contact')}
            className="bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 inline-flex items-center justify-center shadow-sm cursor-pointer"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile: Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile: Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--color-bg)] p-6 md:hidden overflow-y-auto"
          >
            {/* Overlay Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2.5 font-heading font-bold text-xl text-[var(--color-text)] tracking-wider"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)] inline-block" />
                <span>{siteConfig.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overlay Nav Links */}
            <nav className="flex flex-col gap-6 py-12" aria-label="Mobile Navigation">
              {navItems.map((item, index) => {
                const active = isItemActive(item);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.05 + 0.1,
                      duration: 0.25,
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`font-heading text-2xl font-medium tracking-wide transition-colors flex items-center justify-between ${
                        active
                          ? 'text-[var(--color-coral)] font-semibold'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Overlay Bottom CTA & Info */}
            <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
              <Link
                to="/#contact"
                onClick={() => handleLinkClick('/#contact')}
                className="w-full bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] rounded-full py-3.5 px-6 text-center font-medium transition-colors block cursor-pointer"
              >
                Start a Project
              </Link>
              <p className="text-xs text-[var(--color-text-muted)] text-center">
                {siteConfig.tagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
