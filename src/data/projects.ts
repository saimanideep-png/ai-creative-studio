// ─── Portfolio / Project Data ───

export type ProjectCategory = 'ads-films' | 'brand-content' | 'digital-products' | 'entertainment';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  service: string;
  description: string;
  thumbnail: string;
  mediaType: 'video' | 'youtube' | 'vimeo' | 'image' | 'external' | 'carousel';
  mediaUrl?: string;
  externalUrl?: string;
  galleryImages?: string[];
  featured: boolean;
  tags: string[];
  layout?: 'wide' | 'portrait' | 'square';
}

export const categoryFilters = [
  { key: 'all', label: 'All Work' },
  { key: 'ads-films', label: 'Ads & Films' },
  { key: 'brand-content', label: 'Brand & Content' },
  { key: 'digital-products', label: 'Digital Products' },
  { key: 'entertainment', label: 'Entertainment' },
] as const;

export const projects: Project[] = [
  // ── Educational & Concept Explainer Demos for Schools / Colleges ──
  {
    id: 'project-edu-explainer-science',
    title: 'Combination Reaction Concept Explainer',
    slug: 'combination-reaction-concept-explainer',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI Content & Personal Brand Agency',
    description: 'Animated curriculum explainer breaking down core scientific concepts into clear, engaging visual sequences for schools, colleges, and learning platforms. Note: This is an illustrative demo; full institutional deliveries feature bespoke syllabi, tailored voiceovers, and higher cinematic polish.',
    thumbnail: '/thumbnails/edu-explainer-3-combination-reaction.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/edu-explainer-3-combination-reaction.mp4',
    featured: true,
    tags: ['Academic Demo', 'Education', 'Science Explainer'],
    layout: 'wide',
  },
  {
    id: 'project-edu-explainer-modular-1',
    title: 'Institutional Visual Explainer — Variation I',
    slug: 'institutional-visual-explainer-variation-1',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI Video Editing & Motion Graphics',
    description: 'Dynamic explainer module demonstrating structured topic delivery and motion visual aids for educational institutions. Note: Illustrative demo variation — custom productions are further polished to exact institutional standards.',
    thumbnail: '/thumbnails/edu-explainer-1.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/edu-explainer-1.mp4',
    featured: false,
    tags: ['Institutional', 'Visual Module', 'Demo Variant'],
    layout: 'wide',
  },
  {
    id: 'project-edu-explainer-modular-2',
    title: 'Institutional Visual Explainer — Variation II',
    slug: 'institutional-visual-explainer-variation-2',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI Video Editing & Motion Graphics',
    description: 'Alternative pacing and concept breakdown format for academic and vocational courses. Note: Demonstrative sample; final institutional releases are crafted with custom studio-grade voiceover and tailored branding.',
    thumbnail: '/thumbnails/edu-explainer-2.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/edu-explainer-2.mp4',
    featured: false,
    tags: ['Course Module', 'EdTech Demo', 'Custom Syllabus'],
    layout: 'wide',
  },

  // ── Commercial & Real Estate Showcases ──
  {
    id: 'project-real-estate-showcase',
    title: 'Luxury Real Estate Cinematic Tour',
    slug: 'luxury-real-estate-cinematic-tour',
    category: 'ads-films',
    categoryLabel: 'Ads & Films',
    service: 'Real Estate Visual Production',
    description: 'High-end property showcase presenting architectural spatial aesthetics, natural lighting transitions, and cinematic interior details in 16:9 widescreen.',
    thumbnail: '/thumbnails/real-estate-showcase.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/real-estate-showcase.mp4',
    featured: true,
    tags: ['Real Estate', '16:9 Showcase', 'Cinematic Tour'],
    layout: 'wide',
  },
  {
    id: 'project-saas-product-ad',
    title: 'SaaS Platform Commercial Ad',
    slug: 'saas-platform-commercial-ad',
    category: 'digital-products',
    categoryLabel: 'Digital Products',
    service: 'AI App / SaaS Development',
    description: 'Dynamic product advertisement engineered for software and digital platforms, highlighting core features, user value propositions, and swift workflow execution.',
    thumbnail: '/thumbnails/saas-product-ad.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/saas-product-ad.mp4',
    featured: true,
    tags: ['SaaS Ad', 'Product Video', 'Software Growth'],
    layout: 'wide',
  },
  {
    id: 'project-product-ad-commercial',
    title: 'Brand Product Commercial',
    slug: 'brand-product-commercial',
    category: 'ads-films',
    categoryLabel: 'Ads & Films',
    service: 'AI Promo Videos',
    description: 'Concept-driven commercial product film with refined visual hooks, texture details, and high-impact brand positioning.',
    thumbnail: '/thumbnails/product-ad.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/product-ad.mp4',
    featured: true,
    tags: ['Product Ad', 'Commercial Film', 'Direct Response'],
    layout: 'wide',
  },
  {
    id: 'project-youtube-thumbnails-carousel',
    title: 'YouTube Thumbnails & CTR Packaging',
    slug: 'youtube-thumbnails-ctr-packaging',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI YouTube Video Channels & Monetization Opportunities',
    description: 'Multi-design package of tested, high-contrast YouTube video thumbnails crafted in 16:9 widescreen to maximize audience click-through rate.',
    thumbnail: '/images/youtube-thumb-1.jpeg',
    mediaType: 'carousel',
    galleryImages: [
      '/images/youtube-thumb-1.jpeg',
      '/images/youtube-thumb-2.jpg',
    ],
    featured: true,
    tags: ['Carousel', '16:9 Ratio', 'YouTube CTR'],
    layout: 'wide',
  },
  {
    id: 'project-ai-promo',
    title: 'Brand Promotional Commercial',
    slug: 'brand-promotional-commercial',
    category: 'ads-films',
    categoryLabel: 'Ads & Films',
    service: 'AI Promo Videos',
    description: 'High-impact vertical commercial promo designed for modern social-first brand campaigns with mobile-optimized pacing.',
    thumbnail: '/thumbnails/ai-brand-promo.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/ai-brand-promo.mp4',
    featured: true,
    tags: ['AI Promo', '9:16 Vertical', 'Commercial'],
    layout: 'portrait',
  },
  {
    id: 'project-reels-posters-carousel',
    title: 'Reels & Shorts Viral Posters',
    slug: 'reels-shorts-viral-posters',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI Video Editing & Motion Graphics',
    description: 'Multi-slide creative showcase of high-CTR vertical cover art and poster designs optimized for mobile feeds, TikTok, and Instagram Reels.',
    thumbnail: '/images/reel-poster-1.jpeg',
    mediaType: 'carousel',
    galleryImages: [
      '/images/reel-poster-1.jpeg',
      '/images/reel-poster-2.png',
      '/images/reel-poster-3.png',
    ],
    featured: false,
    tags: ['Carousel', 'Reels Covers', 'Shorts Art'],
    layout: 'portrait',
  },
  {
    id: 'project-blinktales-channel',
    title: 'BlinkTales AI Media Channel',
    slug: 'blinktales-ai-media-channel',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI YouTube Video Channels & Monetization Opportunities',
    description: 'Original episodic AI-generated storytelling and visual entertainment channel (@blinktales.ai), developed with consistent character generation, viral pacing, and digital audience growth workflows.',
    thumbnail: '',
    mediaType: 'external',
    externalUrl: 'https://www.instagram.com/blinktales.ai',
    featured: true,
    tags: ['Channel Strategy', 'AI Content', '@blinktales.ai'],
    layout: 'square',
  },
  {
    id: 'project-skincare-ugc',
    title: 'Skincare Serum UGC Ad',
    slug: 'skincare-serum-ugc-ad',
    category: 'ads-films',
    categoryLabel: 'Ads & Films',
    service: 'AI UGC Ad Videos',
    description: 'Creator-style product demonstration focused on high-converting hooks, serum texture showcase, and direct engagement.',
    thumbnail: '/thumbnails/skincare-ugc-ad.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/skincare-ugc-ad.mp4',
    featured: false,
    tags: ['UGC Ad', 'Skincare', 'Vertical Ad'],
    layout: 'portrait',
  },
  {
    id: 'project-testimonial-ugc',
    title: 'Brand Story & Testimonial UGC',
    slug: 'brand-story-testimonial-ugc',
    category: 'ads-films',
    categoryLabel: 'Ads & Films',
    service: 'AI UGC Ad Videos',
    description: 'Authentic short-form creator testimonial crafted for social-first conversion, relatable pacing, and clear calls to action.',
    thumbnail: '/thumbnails/brand-testimonial-ugc.jpg',
    mediaType: 'video',
    mediaUrl: '/videos/brand-testimonial-ugc.mp4',
    featured: false,
    tags: ['UGC Testimonial', 'Direct Response', 'Short-form'],
    layout: 'portrait',
  },
  {
    id: 'project-3',
    title: 'Brand Identity System',
    slug: 'brand-identity-system',
    category: 'brand-content',
    categoryLabel: 'Brand & Content',
    service: 'AI Branding Agency',
    description: 'Complete visual identity system for an emerging consumer brand.',
    thumbnail: '',
    mediaType: 'image',
    featured: false,
    tags: ['Branding', 'Identity', 'Visual System'],
    layout: 'square',
  },
  {
    id: 'project-6',
    title: 'Automated Operations Pipeline',
    slug: 'automated-operations-pipeline',
    category: 'digital-products',
    categoryLabel: 'Digital Products',
    service: 'AI Automation & Speed Workflows',
    description: 'End-to-end workflow connecting content creation pipelines and business tools for frictionless turnaround.',
    thumbnail: '',
    mediaType: 'image',
    featured: false,
    tags: ['Automation', 'Workflow', 'n8n'],
    layout: 'wide',
  },
  {
    id: 'project-7',
    title: 'Micro-Drama Episodic Pilot',
    slug: 'micro-drama-episodic-pilot',
    category: 'entertainment',
    categoryLabel: 'Entertainment',
    service: 'Micro-Drama Production',
    description: 'Vertical serialized storytelling concept engineered for mobile-first audiences.',
    thumbnail: '',
    mediaType: 'video',
    mediaUrl: '',
    featured: false,
    tags: ['Micro-Drama', 'Storytelling', 'Vertical'],
    layout: 'portrait',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
