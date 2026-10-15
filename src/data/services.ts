// ─── Service Data ───

export interface Service {
  id: string;
  number: string;
  slug: string;
  name: string;
  group: 'creative' | 'brand' | 'digital' | 'entertainment';
  groupLabel: string;
  description: string;
  showcaseOpportunities: string[];
  deliverables: string[];
  relatedSlugs: string[];
}

export const serviceGroups = [
  { key: 'creative', label: 'AI Creative Production' },
  { key: 'brand', label: 'Brand & Audience Growth' },
  { key: 'digital', label: 'Digital Products & Intelligent Operations' },
  { key: 'entertainment', label: 'Entertainment & Original IP' },
] as const;

export const services: Service[] = [
  // ── GROUP A — AI Creative Production ──
  {
    id: 'ai-ad-film',
    number: '01',
    slug: 'ai-ad-film-production',
    name: 'AI Ad Film Production Agency',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Cinematic, concept-led advertising that combines imaginative production with AI-assisted visual storytelling.',
    showcaseOpportunities: [
      'AI-generated commercial films',
      'Product advertising',
      'Cinematic brand campaigns',
      'Concept development and visual storytelling',
    ],
    deliverables: [
      'Master 4K/UHD commercial film edits',
      'Aspect ratio cutdowns (16:9, 9:16, 1:1, 4:5)',
      'Custom sound design and licensed audio mix',
      'Creative treatment and storyboards',
    ],
    relatedSlugs: ['ai-ugc-ads', 'ai-promo-videos', 'ai-video-editing'],
  },
  {
    id: 'ai-ugc-ads',
    number: '02',
    slug: 'ai-ugc-ads',
    name: 'AI UGC Ad Videos',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Short-form, creator-style advertising built around product demonstrations, strong hooks, and clear calls to action.',
    showcaseOpportunities: [
      'Vertical product ads',
      'Multiple creative variations',
      'Hook and concept testing',
      'AI-generated creator-style content (transparently labeled)',
    ],
    deliverables: [
      'Sets of 3–5 high-converting hook variations',
      'Native vertical 9:16 export with burned-in dynamic captions',
      'Direct-response visual hooks and CTA overlays',
      'Ad creative testing performance matrix',
    ],
    relatedSlugs: ['ai-ad-film-production', 'ai-promo-videos', 'ai-content-brand'],
  },
  {
    id: 'ai-promo',
    number: '03',
    slug: 'ai-promo-videos',
    name: 'AI Promo Videos',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Purpose-built promotional videos for product launches, offers, campaigns, and new announcements.',
    showcaseOpportunities: [
      'Launch promos',
      'Offer campaigns',
      'Product explainers',
      'Social-media advertisements',
    ],
    deliverables: [
      'Polished 30s–60s announcement and launch cutdowns',
      'Teaser clips for story and feed placements',
      'Custom motion graphics for product features and pricing',
      'High-resolution thumbnail stills',
    ],
    relatedSlugs: ['ai-ad-film-production', 'ai-ugc-ads', 'ai-video-editing'],
  },
  {
    id: 'real-estate',
    number: '04',
    slug: 'real-estate-visual-production',
    name: 'Real Estate Visual Production',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Visual content that presents properties, spaces, and real estate developments with clarity and cinematic appeal.',
    showcaseOpportunities: [
      'Property showcase films',
      'Listing videos',
      'Architectural and interior visuals',
      'Project launch campaigns',
    ],
    deliverables: [
      'Cinematic walkthrough films with ambient audio',
      'High-fidelity interior and exterior architectural renders',
      'Social reels formatted for agents and developers',
      'Digital brochure visual assets',
    ],
    relatedSlugs: ['ai-ad-film-production', 'ai-photo-agency', 'ai-video-editing'],
  },
  {
    id: 'ai-photo',
    number: '05',
    slug: 'ai-photo-agency',
    name: 'AI Photo Agency',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Distinctive product, lifestyle, and campaign imagery developed for modern commercial brands.',
    showcaseOpportunities: [
      'Product photography concepts',
      'Lifestyle imagery',
      'Campaign visual variations',
      'Editorial-style visuals',
    ],
    deliverables: [
      'High-resolution (4K+) commercial image suites',
      'Seasonal lifestyle and product placement variations',
      'Transparent background e-commerce packs',
      'Color-graded editorial campaign assets',
    ],
    relatedSlugs: ['ai-branding', 'ai-content-brand', 'ai-ad-film-production'],
  },
  {
    id: 'ai-video-editing',
    number: '06',
    slug: 'ai-video-editing',
    name: 'AI Video Editing & Motion Graphics',
    group: 'creative',
    groupLabel: 'AI Creative Production',
    description:
      'Sharper storytelling through editing, motion graphics, captions, visual effects, and sound design.',
    showcaseOpportunities: [
      'Short-form video editing',
      'Motion graphics',
      'Social advertisements',
      'Long-form edits and branded visual sequences',
    ],
    deliverables: [
      'Dynamic pacing with motion graphic overlays',
      'Kinetic animated typography and subtitles',
      'Sound design with SFX and balance equalization',
      'Multi-platform export packages',
    ],
    relatedSlugs: ['ai-ad-film-production', 'ai-promo-videos', 'ai-ugc-ads'],
  },

  // ── GROUP B — Brand & Audience Growth ──
  {
    id: 'ai-branding',
    number: '07',
    slug: 'ai-branding',
    name: 'AI Branding Agency',
    group: 'brand',
    groupLabel: 'Brand & Audience Growth',
    description:
      'Distinctive brand identities and visual systems that help businesses communicate consistently.',
    showcaseOpportunities: [
      'Brand identity systems',
      'Visual direction',
      'Campaign design',
      'Brand assets and creative guidelines',
    ],
    deliverables: [
      'Complete vector logo suite (primary, secondary, mark)',
      'Comprehensive brand guidelines (color, typography, grid)',
      'Social media design templates and asset kits',
      'Business collateral and pitch deck styles',
    ],
    relatedSlugs: ['ai-content-brand', 'ai-photo-agency', 'ai-ad-film-production'],
  },
  {
    id: 'ai-content-brand',
    number: '08',
    slug: 'ai-content-brand',
    name: 'AI Content & Personal Brand Agency',
    group: 'brand',
    groupLabel: 'Brand & Audience Growth',
    description:
      'Structured content systems that help founders, creators, and professionals communicate consistently and build an audience.',
    showcaseOpportunities: [
      'Personal-brand content',
      'Short-form content',
      'Content repurposing',
      'Creative direction and publishing workflows',
    ],
    deliverables: [
      'Monthly short-form content calendar and scripts',
      'Turnkey editing for reels, shorts, and carousels',
      'Long-form to micro-content repurposing workflows',
      'Visual tone of voice playbook',
    ],
    relatedSlugs: ['ai-branding', 'ai-youtube-channels', 'ai-ugc-ads'],
  },
  {
    id: 'ai-youtube',
    number: '09',
    slug: 'ai-youtube-channels',
    name: 'AI YouTube Video Channels & Monetization Opportunities',
    group: 'brand',
    groupLabel: 'Brand & Audience Growth',
    description:
      'End-to-end channel concepts and repeatable production systems designed for sustainable YouTube content.',
    showcaseOpportunities: [
      'Channel strategy',
      'Video concepts and scripts',
      'Editing and thumbnail direction',
      'Repeatable production workflows',
      'Channel development and monetization planning',
    ],
    deliverables: [
      'Channel branding package (banner, avatar, watermarks)',
      'Tested thumbnail design templates with CTR focus',
      'Full script-to-edit production SOPs',
      'Content calendar and metadata optimization guidelines',
    ],
    relatedSlugs: ['ai-content-brand', 'ai-video-editing', 'ai-branding'],
  },

  // ── GROUP C — Digital Products & Intelligent Operations ──
  {
    id: 'ai-app-saas',
    number: '10',
    slug: 'ai-app-saas',
    name: 'AI App / SaaS Development',
    group: 'digital',
    groupLabel: 'Digital Products & Intelligent Operations',
    description:
      'Functional digital products that turn useful ideas into working web applications and software experiences.',
    showcaseOpportunities: [
      'AI-powered applications',
      'SaaS MVPs',
      'Web applications and dashboards',
      'Internal business tools',
    ],
    deliverables: [
      'Production-ready frontend and backend codebase',
      'Intuitive user experience and clean dashboard UI',
      'AI model and API integrations',
      'Cloud deployment on modern hosting (Vercel/AWS)',
    ],
    relatedSlugs: ['ai-automation-workflows', 'ai-content-brand', 'ai-branding'],
  },
  {
    id: 'ai-automation',
    number: '11',
    slug: 'ai-automation-workflows',
    name: 'AI Automation & Speed Workflows',
    group: 'digital',
    groupLabel: 'Digital Products & Intelligent Operations',
    description:
      'Practical automations that reduce repetitive work, connect tools, and help teams operate more efficiently.',
    showcaseOpportunities: [
      'Workflow automation',
      'AI-assisted processes',
      'Tool integrations',
      'Content and operational pipelines',
    ],
    deliverables: [
      'Configured automation pipelines (n8n, Make, Zapier, APIs)',
      'Custom webhook triggers and data transformation scripts',
      'Notification systems (Slack, WhatsApp, Email)',
      'Operator handoff documentation and fail-safe monitoring',
    ],
    relatedSlugs: ['ai-app-saas', 'ai-youtube-channels', 'ai-content-brand'],
  },

  // ── GROUP D — Entertainment & Original IP ──
  {
    id: 'micro-drama',
    number: '12',
    slug: 'micro-drama-production',
    name: 'Micro-Drama Production & Revenue-Share Collaborations',
    group: 'entertainment',
    groupLabel: 'Entertainment & Original IP',
    description:
      'Short-form serialized storytelling developed for vertical platforms, combining compelling narratives with scalable production.',
    showcaseOpportunities: [
      'Vertical micro-dramas',
      'Episodic storytelling',
      'Character-led entertainment',
      'Production collaborations and revenue-share partnerships',
    ],
    deliverables: [
      'Series narrative bible, character arches, and pilot episode',
      'Batch-produced episodic seasons (1–2 min vertical episodes)',
      'Soundtrack score and Foley sound integration',
      'Promotional clip packages and cliffhanger hook variations',
    ],
    relatedSlugs: ['ai-ad-film-production', 'ai-video-editing', 'ai-content-brand'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return services.filter((s) => slugs.includes(s.slug));
}
