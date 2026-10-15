import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 overflow-hidden">
      {/* Background Branching Motif (SVG) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <svg
          className="w-full h-full max-w-[1400px] opacity-35"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Branching curves connecting capabilities */}
          <motion.path
            d="M 150 450 C 350 450, 400 280, 600 280 C 800 280, 850 400, 1050 400"
            stroke="var(--color-coral)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 200 550 C 420 550, 480 340, 720 340 C 900 340, 960 220, 1100 220"
            stroke="var(--color-coral)"
            strokeWidth="1.75"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 720 340 C 820 340, 860 520, 1020 520"
            stroke="var(--color-lavender)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Connected Node Endpoints */}
          <motion.circle
            cx="600"
            cy="280"
            r="4"
            fill="var(--color-coral)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />
          <motion.circle
            cx="720"
            cy="340"
            r="4.5"
            fill="var(--color-coral)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          />
          <motion.circle
            cx="1020"
            cy="520"
            r="4"
            fill="var(--color-lavender)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          />
          <motion.circle
            cx="1100"
            cy="220"
            r="3.5"
            fill="var(--color-coral)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.0, duration: 0.4 }}
          />
        </svg>

        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-coral)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-[var(--color-lavender)]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Statements & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Restrained Secondary Descriptor Line */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
              <span className="text-xs md:text-sm font-mono tracking-widest text-[var(--color-coral)] uppercase">
                AI CREATIVE · CONTENT · DIGITAL PRODUCTS · AUTOMATION
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text)] leading-[1.12]"
            >
              Creative that captures attention.{' '}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] via-[var(--color-text)] to-[var(--color-text-secondary)]">
                Systems that turn it into growth.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-body"
            >
              We build AI-powered ads, cinematic content, digital products, and automation systems that help ambitious brands move faster.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => handleScrollTo('work')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-[var(--color-coral)]/20 hover:scale-105 cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-coral)]/40 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                <span>Start a Project</span>
              </button>
            </motion.div>

            {/* Trust through Capability Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 pt-6 border-t border-[var(--color-border)]/60 flex items-center gap-3 text-xs text-[var(--color-text-muted)] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lavender)]" />
              <span>From first concept to final delivery. Engineered for commercial impact.</span>
            </motion.div>
          </div>

          {/* Right Column: Cinematic Studio Composition */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Primary Cinematic Card (Video preview frame) */}
              <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl shadow-black/60 group">
                <div className="aspect-[16/10] bg-[var(--color-surface-2)] relative overflow-hidden flex items-center justify-center">
                  {/* Subtle layered artwork inside card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#161218] via-[#211B1F] to-[#120E13]" />
                  
                  {/* Fine studio grid & lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(243,238,232,0.06)_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Creative Studio Visual Mockup / Reel Preview */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/30 flex items-center justify-center text-[var(--color-coral)] mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Play size={22} className="fill-[var(--color-coral)] translate-x-0.5" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[var(--color-coral)] font-mono">
                      Showreel Preview
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-[var(--color-text)] mt-1">
                      Next-Gen AI Production
                    </h3>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-secondary)]">
                    4K · 60 FPS
                  </div>
                </div>

                {/* Card Base Information */}
                <div className="p-4 bg-[var(--color-surface)] flex items-center justify-between border-t border-[var(--color-border)]">
                  <div>
                    <span className="text-xs font-heading font-medium text-[var(--color-text)] block">
                      Commercials & Digital IP
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted)]">
                      AI Film · Visual Effects · Synthesis
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--color-coral)] flex items-center gap-1">
                    <Sparkles size={12} />
                    Studio Ready
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Secondary Card: Automation & Code */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, x: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden sm:block absolute -bottom-8 -left-6 rounded-xl bg-[var(--color-surface-2)]/95 backdrop-blur-md border border-[var(--color-border)] p-4 shadow-xl max-w-[240px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Intelligent Ops
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text)] font-heading font-semibold">
                  Autonomous Pipelines & SaaS MVPs
                </p>
                <div className="mt-2 text-[10px] text-[var(--color-text-muted)] font-mono">
                  n8n · LangChain · Vite
                </div>
              </motion.div>

              {/* Overlapping Floating Accent Pill: Lavender marker */}
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="hidden sm:flex absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-lavender)]/40 items-center gap-2 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-lavender)] animate-pulse" />
                <span className="text-xs font-mono text-[var(--color-text)]">
                  12 Connected Capabilities
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
