import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Play, ArrowRight } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/assetUrl';

export const IntroVideoOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoUrl = resolveAssetUrl('/videos/intro-reel.mp4');

  useEffect(() => {
    // Lock scroll while intro video is active
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted autoplay first
    video.muted = false;
    video
      .play()
      .then(() => {
        setHasStartedPlaying(true);
        setIsMuted(false);
        setShowPlayPrompt(false);
      })
      .catch(() => {
        // Browser blocked audio autoplay: try muted autoplay with a clear tap-to-unmute / play prompt
        video.muted = true;
        setIsMuted(true);
        video
          .play()
          .then(() => {
            setHasStartedPlaying(true);
            setShowPlayPrompt(true);
          })
          .catch(() => {
            setShowPlayPrompt(true);
          });
      });
  }, []);

  const handleUserStart = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => {
        setHasStartedPlaying(true);
        setShowPlayPrompt(false);
      });
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      setShowPlayPrompt(false);
    }
  };

  const handleClose = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Fullscreen Video Stream */}
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          autoPlay
          onEnded={handleClose}
          onClick={handleUserStart}
          className="w-full h-full object-cover sm:object-contain bg-black cursor-pointer"
        />

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

        {/* Top Controls: Sound Toggle & Skip/Enter Studio */}
        <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} className="text-red-400" />
                  <span>Unmute Sound</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="text-[var(--color-coral)]" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 transition-all shadow-xl cursor-pointer hover:scale-105"
            aria-label="Skip intro and enter website"
          >
            <span>Enter Studio</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Bottom Banner & Hint */}
        <div className="absolute bottom-6 inset-x-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20 pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/90 font-mono">
              Studio Reel · Welcome
            </span>
          </div>

          <span className="text-[11px] text-white/60 font-body">
            Video will automatically enter the website when finished, or tap "Enter Studio"
          </span>
        </div>

        {/* Tap to Unmute Overlay Prompt (shown if browser blocked sound on first load) */}
        {showPlayPrompt && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleUserStart}
            className="absolute z-30 px-6 py-3.5 rounded-2xl bg-black/80 hover:bg-black/95 text-white border border-[var(--color-coral)]/60 backdrop-blur-xl flex items-center gap-3 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-coral)] flex items-center justify-center text-white shrink-0">
              <Volume2 size={20} />
            </div>
            <div className="text-left">
              <p className="font-heading font-semibold text-sm text-white">Tap to Play with Sound</p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Click anywhere to enable full audio</p>
            </div>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroVideoOverlay;
