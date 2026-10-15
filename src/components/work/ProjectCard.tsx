import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ExternalLink, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Project } from '../../data/projects';
import { resolveAssetUrl } from '../../utils/assetUrl';

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const isPortrait = project.layout === 'portrait';
  const hasValidThumbnail =
    Boolean(project.thumbnail) &&
    !project.thumbnail.includes('placeholder') &&
    project.thumbnail.trim().length > 0;

  const isVideoMedia =
    project.mediaType === 'video' ||
    project.mediaType === 'youtube' ||
    project.mediaType === 'vimeo';

  const hasDirectVideo = project.mediaType === 'video' && Boolean(project.mediaUrl);
  const isInstagramChannel = project.externalUrl?.includes('instagram.com');
  const isCarousel = project.mediaType === 'carousel' && Boolean(project.galleryImages && project.galleryImages.length > 0);

  const resolvedVideoUrl = project.mediaUrl ? resolveAssetUrl(project.mediaUrl) : '';
  const resolvedThumbnailUrl = project.thumbnail ? resolveAssetUrl(project.thumbnail) : '';

  const aspectClass = isPortrait
    ? 'aspect-[9/16]'
    : project.layout === 'square'
    ? 'aspect-square'
    : 'aspect-video';

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.galleryImages) {
      setCarouselIndex((prev) => (prev + 1) % project.galleryImages!.length);
    }
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.galleryImages) {
      setCarouselIndex((prev) => (prev - 1 + project.galleryImages!.length) % project.galleryImages!.length);
    }
  };

  return (
    <motion.article
      layout
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group relative w-full h-full flex flex-col rounded-xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer transition-all duration-300 hover:border-[var(--color-coral)]/40 hover:shadow-xl hover:shadow-[var(--color-coral)]/5 focus-visible:outline-2 focus-visible:outline-[var(--color-coral)] focus-visible:outline-offset-2"
    >
      {/* Media Viewport */}
      <div
        className={`w-full overflow-hidden bg-[var(--color-surface-2)] relative select-none flex items-center justify-center shrink-0 ${aspectClass}`}
      >
        {isCarousel && project.galleryImages ? (
          /* Multi-image interactive Carousel preview */
          <div className="relative w-full h-full">
            <img
              src={resolveAssetUrl(project.galleryImages[carouselIndex])}
              alt={`${project.title} - Slide ${carouselIndex + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {/* Slide Navigation Arrows */}
            {project.galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous slide"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                >
                  <ChevronRight size={16} />
                </button>
                {/* Dots indicator */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
                  {project.galleryImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === carouselIndex ? 'w-5 bg-[var(--color-coral)]' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            {/* Carousel badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white flex items-center gap-1 z-10">
              <Layers size={11} className="text-[var(--color-coral)]" />
              <span>{carouselIndex + 1}/{project.galleryImages.length}</span>
            </div>
          </div>
        ) : hasValidThumbnail ? (
          <img
            src={resolvedThumbnailUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : hasDirectVideo && !videoError ? (
          /* Render video preview poster directly from video file */
          <video
            src={`${resolvedVideoUrl}#t=0.5`}
            preload="auto"
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : isInstagramChannel ? (
          /* Custom Branded Card for Instagram Channel */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-tr from-[#1b1420] via-[#241722] to-[#2c131a]">
            <div className="absolute inset-0 bg-radial from-pink-500/10 via-[var(--color-coral)]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-heading font-bold text-lg text-[var(--color-text)] tracking-tight">
                  @blinktales.ai
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] font-body mt-0.5">
                  AI Storytelling & Entertainment
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-[var(--color-coral)] font-mono border border-white/10 group-hover:bg-[var(--color-coral)] group-hover:text-white transition-colors">
                <span>Open Channel</span>
                <ExternalLink size={12} />
              </span>
            </div>
          </div>
        ) : (
          /* Styled Placeholder State */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-br from-[var(--color-surface-2)] via-[var(--color-surface)] to-[var(--color-surface-2)]">
            <div className="absolute inset-0 bg-radial from-[var(--color-coral)]/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 flex items-center justify-center text-[var(--color-coral)] group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={18} />
              </div>
              <span className="font-heading font-medium text-sm md:text-base text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors px-4 line-clamp-2">
                {project.title}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[var(--color-coral)]/80 font-mono">
                {project.categoryLabel}
              </span>
            </div>
          </div>
        )}

        {/* Subtle Dark Overlay on Hover (only when not interacting with carousel arrows) */}
        {!isCarousel && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Video / Media Play Indicator */}
        {isVideoMedia && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[var(--color-border)] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play size={20} className="fill-white text-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-black/60 backdrop-blur-md text-[var(--color-coral)] border border-[var(--color-coral)]/30">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Info Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <div className="space-y-1.5">
          <span className="text-xs text-[var(--color-coral)] font-medium uppercase tracking-wider block">
            {project.categoryLabel}
          </span>
          <h3 className="font-heading font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-coral)] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--color-border)]/50">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
