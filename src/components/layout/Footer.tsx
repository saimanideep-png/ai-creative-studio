import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../../data/site';

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Work',
    links: [
      { label: 'Featured Work', href: '/#work' },
      { label: 'Commercials', href: '/services/ai-ad-film-production' },
      { label: 'Creator UGC', href: '/services/ai-ugc-ads' },
      { label: 'Digital Products', href: '/services/ai-app-saas' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'AI Ad Films', href: '/services/ai-ad-film-production' },
      { label: 'Brand & Growth', href: '/services/ai-branding' },
      { label: 'AI Automation', href: '/services/ai-automation-workflows' },
      { label: 'Micro-Dramas', href: '/services/micro-drama-production' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Studio Overview', href: '/#about' },
      { label: 'Production Process', href: '/#process' },
      { label: 'Core Capabilities', href: '/#about' },
      { label: 'Technology', href: '/#about' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Start a Project', href: '/#contact' },
      { label: 'Schedule an Intro', href: '/#contact' },
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    ],
  },
];

// Clean, accessible SVG social icons
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function YouTubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    { key: 'instagram', label: 'Instagram', url: siteConfig.socials.instagram, icon: InstagramIcon },
    { key: 'linkedin', label: 'LinkedIn', url: siteConfig.socials.linkedin, icon: LinkedInIcon },
    { key: 'youtube', label: 'YouTube', url: siteConfig.socials.youtube, icon: YouTubeIcon },
  ].filter((item) => Boolean(item.url && item.url.trim() !== ''));

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          {/* Left: Studio Name + One-line Description */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2.5 font-heading font-bold text-2xl tracking-wider text-[var(--color-text)] cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)] shadow-[0_0_8px_var(--color-coral)] inline-block" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Right: Link Columns (Work, Services, About, Contact) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-[var(--color-text)] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('mailto:') ? (
                        <a
                          href={link.href}
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-coral)] transition-colors break-all"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={() => handleNavClick(link.href)}
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>

          {/* Social Icons (only rendered if URL is non-empty) */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map(({ key, label, url, icon: Icon }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-coral)] transition-colors p-1.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}

          {/* Back to top */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-[var(--color-text-secondary)]">Back to top</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:text-[var(--color-coral)] hover:border-[var(--color-coral)] transition-all duration-200 flex items-center justify-center cursor-pointer group"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
