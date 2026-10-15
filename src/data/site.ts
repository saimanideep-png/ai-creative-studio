// ─── Studio Configuration ───
// Edit these values to customize the entire website.

export const siteConfig = {
  // Studio identity
  name: 'STUDIO',
  tagline: 'Creative that captures attention. Systems that turn it into growth.',
  description:
    'We build AI-powered ads, cinematic content, digital products, and automation systems that help ambitious brands move faster.',

  // Contact
  email: 'hello@yourstudio.com',
  whatsapp: '', // e.g. 'https://wa.me/91XXXXXXXXXX'
  formEndpoint: '', // e.g. Formspree or Getform URL

  // Social links (leave empty to hide)
  socials: {
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: '',
    github: '',
  },

  // SEO & Meta
  siteUrl: 'https://yourstudio.com',
  ogImage: '/assets/og-image.png',

  // Navigation
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;
