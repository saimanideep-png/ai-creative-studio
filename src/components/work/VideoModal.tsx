import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { type Project } from '../../data/projects';
import { resolveAssetUrl } from '../../utils/assetUrl';

export interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function extractVimeoId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+))/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // Reset slide index on project change
  useEffect(() => {
    setModalSlideIndex(0);
  }, [project]);

  // Lock body scroll and register Escape listener
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isMediaUrlEmpty = !project?.mediaUrl || project.mediaUrl.trim().length === 0;
  const hasValidThumbnail =
    Boolean(project?.thumbnail) &&
    !project?.thumbnail.includes('placeholder') &&
    (project?.thumbnail.trim().length ?? 0) > 0;

  const youtubeId = project?.mediaType === 'youtube' ? extractYouTubeId(project.mediaUrl) : null;
  const vimeoId = project?.mediaType === 'vimeo' ? extractVimeoId(project.mediaUrl) : null;
  const isPortrait = project?.layout === 'portrait';
  const isCarousel = project?.mediaType === 'carousel' && Boolean(project.galleryImages && project.galleryImages.length > 0);

  const resolvedVideoUrl = project?.mediaUrl ? resolveAssetUrl(project.mediaUrl) : '';
  const resolvedThumbnailUrl = project?.thumbnail ? resolveAssetUrl(project.thumbnail) : '';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-[var(--color-coral)] border border-[var(--color-border)] backdrop-blur-md transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-coral)]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Modal Content */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full mx-auto rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col max-h-[92vh] ${
              isPortrait ? 'max-w-md' : 'max-w-4xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Area */}
            <div className="w-full bg-black overflow-hidden relative flex items-center justify-center">
              {/* Carousel Showcase in Modal */}
              {isCarousel && project.galleryImages ? (
                <div className="relative w-full flex items-center justify-center bg-black min-h-[380px] max-h-[65vh]">
                  <img
                    src={resolveAssetUrl(project.galleryImages[modalSlideIndex])}
                    alt={`${project.title} - Slide ${modalSlideIndex + 1}`}
                    className="w-full h-full max-h-[65vh] object-contain"
                  />
                  {project.galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setModalSlideIndex((prev) => (prev - 1 + project.galleryImages!.length) % project.galleryImages!.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalSlideIndex((prev) => (prev + 1) % project.galleryImages!.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
                        {project.galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setModalSlideIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                              idx === modalSlideIndex ? 'w-6 bg-[var(--color-coral)]' : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
                    <Layers size={13} className="text-[var(--color-coral)]" />
                    <span>Design {modalSlideIndex + 1} of {project.galleryImages.length}</span>
                  </div>
                </div>
              ) : project.mediaType === 'external' ? (
                /* External Link Type */
                <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface)] min-h-[320px] w-full">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/20 flex items-center justify-center text-[var(--color-coral)] mb-4">
                    <ExternalLink size={26} />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[var(--color-coral)] font-mono mb-2">
                    {project.categoryLabel}
                  </span>
                  <h4 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-3">
                    {project.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  {project.externalUrl || project.mediaUrl ? (
                    <a
                      href={project.externalUrl || project.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-[var(--color-coral)]/20 hover:scale-105"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm">
                      <span>Live link coming soon</span>
                    </div>
                  )}
                </div>
              ) : isMediaUrlEmpty ? (
                /* Empty mediaUrl - Graceful 'Demo coming soon' state */
                <div className="aspect-video w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface)] text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-coral)] mb-4 shadow-lg">
                    <Sparkles size={28} />
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--color-coral)]/10 text-[var(--color-coral)] border border-[var(--color-coral)]/20 mb-3">
                    In Production
                  </span>
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2">
                    Demo Coming Soon
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                    The showcase for{' '}
                    <span className="text-[var(--color-text)] font-medium">
                      {project.title}
                    </span>{' '}
                    is currently being finalized or undergoing client release approval.
                  </p>
                </div>
              ) : project.mediaType === 'youtube' ? (
                /* YouTube Embed */
                <div className="aspect-video w-full bg-black">
                  {youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                      title={project.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                      Unable to load YouTube video.
                    </div>
                  )}
                </div>
              ) : project.mediaType === 'vimeo' ? (
                /* Vimeo Embed */
                <div className="aspect-video w-full bg-black">
                  {vimeoId ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                      title={project.title}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                      Unable to load Vimeo video.
                    </div>
                  )}
                </div>
              ) : project.mediaType === 'video' ? (
                /* Native HTML5 Video */
                <div className={`w-full bg-black flex items-center justify-center ${
                  isPortrait ? 'max-h-[65vh] aspect-[9/16]' : 'aspect-video max-h-[65vh]'
                }`}>
                  <video
                    src={resolvedVideoUrl}
                    controls
                    autoPlay
                    playsInline
                    poster={hasValidThumbnail ? resolvedThumbnailUrl : undefined}
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              ) : project.mediaType === 'image' ? (
                /* Full-size Image */
                <div className="w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={resolvedVideoUrl || resolvedThumbnailUrl}
                    alt={project.title}
                    className="w-full h-full max-h-[60vh] object-contain"
                  />
                </div>
              ) : null}
            </div>

            {/* Project Details Footer */}
            <div className="p-5 sm:p-6 bg-[var(--color-surface)] border-t border-[var(--color-border)] overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[var(--color-coral)] font-semibold uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {project.service}
                    </span>
                  </div>
                  <h3
                    id="modal-project-title"
                    className="font-heading text-xl sm:text-2xl font-bold text-[var(--color-text)]"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {project.externalUrl && project.mediaType !== 'external' && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-surface-2)] hover:bg-[var(--color-coral)] text-[var(--color-text)] hover:text-white border border-[var(--color-border)] text-xs font-medium transition-colors shrink-0 self-start"
                  >
                    <span>Visit Link</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/50">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
