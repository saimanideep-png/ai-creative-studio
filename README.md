# Studio Portfolio — Setup & Customization Guide

This is a production-ready, dark editorial creative-tech portfolio website designed for a multi-service AI creative and technology studio.

---

## 🚀 Quick Start

### Installation & Local Development
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Central Configuration & Personalization

All studio identity, contact information, services, and portfolio projects are driven strictly by centralized data files in `src/data/`:

### 1. Studio Identity & Contact (`src/data/site.ts`)
Open `src/data/site.ts` to customize:
- `name`: Your studio name (displays in navbar, footer, metadata).
- `tagline`: Primary headline and secondary descriptors.
- `description`: Editorial description used in hero and meta tags.
- `email`: Your studio email address (auto-wires form fallback and footer contact).
- `whatsapp`: Your WhatsApp direct click-to-chat link (e.g. `https://wa.me/XXXXXXXXXXX`).
- `formEndpoint`: If using Formspree, Getform, or Basin, paste the submission URL here. If left empty, the contact form automatically falls back to generating a pre-filled client email draft without fake confirmations.
- `socials`: Instagram, LinkedIn, YouTube, Twitter, and GitHub links. Links left empty are automatically omitted from rendering.

### 2. Portfolio Projects & Work (`src/data/projects.ts`)
Every project in the grid is driven by the `projects` array. Each entry supports:
```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  slug: 'project-slug',
  category: 'ads-films' | 'brand-content' | 'digital-products' | 'entertainment',
  categoryLabel: 'Ads & Films',
  service: 'AI Ad Film Production Agency', // Exact service name for automatic cross-linking
  description: 'Project brief and narrative description.',
  thumbnail: '/assets/your-thumbnail.jpg', // Placed in public/assets/
  mediaType: 'video' | 'youtube' | 'vimeo' | 'image' | 'external',
  mediaUrl: 'https://youtube.com/watch?v=... or MP4 direct url',
  externalUrl: 'https://client-project.com', // Optional live link
  featured: true, // Highlights project and adjusts grid span
  tags: ['AI Film', 'Commercial', '4K'],
  layout: 'wide' | 'portrait' | 'square', // Controls grid aspect ratio
}
```

#### Media Integration Rules:
- **YouTube**: Supports full watch URLs, short URLs (`youtu.be`), and embed IDs.
- **Vimeo**: Supports standard Vimeo video URLs and IDs.
- **Native MP4**: Supply a direct MP4 URL in `mediaUrl`.
- **Empty / In-Production**: If `mediaUrl` is empty, the modal gracefully displays a polished "In Production / Demo Coming Soon" placeholder.
- **External Web Apps**: For SaaS products or web tools, set `mediaType: 'external'` with `externalUrl`.

### 3. Services Directory (`src/data/services.ts`)
Contains all **12 capabilities** structured across the 4 core groups:
- **Group A**: AI Creative Production (Services 01–06)
- **Group B**: Brand & Audience Growth (Services 07–09)
- **Group C**: Digital Products & Intelligent Operations (Services 10–11)
- **Group D**: Entertainment & Original IP (Service 12)

You can customize each service's:
- `showcaseOpportunities`: Capabilities listed in the service page.
- `deliverables`: Key deliverables provided upon engagement.
- `relatedSlugs`: Cross-links to other complementary studio capabilities.

---

## 📁 Static Assets Directory (`public/`)

Place all real videos, posters, images, and brand marks inside `public/assets/`:
- **Thumbnails**: e.g., `public/assets/projects/commercial-1.jpg`
- **OpenGraph Share Image**: `public/assets/og-image.png` (1200x630px recommended)
- **Favicon**: `public/favicon.svg`

---

## 🚢 Deployment

The project is static and zero-dependency backend. It deploys cleanly to:
- **Netlify**: Run `npm run build`, publish directory: `dist`. Add `/* /index.html 200` to `public/_redirects` for client-side routing.
- **Vercel**: Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`.
