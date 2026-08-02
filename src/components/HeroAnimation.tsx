import { useEffect, useState } from 'react';
import './HeroAnimation.css';

const HeroAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setStage(100);
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), 500),   // Fracture
      setTimeout(() => setStage(2), 1166),  // Ignition
      setTimeout(() => setStage(3), 2166),  // Exhale
      setTimeout(() => setStage(4), 2666),  // Twinkle
      setTimeout(() => setStage(5), 2833),  // Idle
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Per-character ignition timing. Letters near crack junctions ignite first & brightest.
  const nameChars = [
    { char: 'S', delay: 0.00, bright: true },   // Crack junction — first to catch
    { char: 'A', delay: 0.12, bright: false },
    { char: 'I', delay: 0.20, bright: false },
    { char: ' ', delay: 0,    bright: false },
    { char: 'M', delay: 0.08, bright: false },
    { char: 'A', delay: 0.16, bright: false },
    { char: 'N', delay: 0.04, bright: true },   // Crack junction
    { char: 'I', delay: 0.14, bright: false },
    { char: 'D', delay: 0.22, bright: false },
    { char: 'E', delay: 0.28, bright: false },
    { char: 'E', delay: 0.06, bright: true },   // Crack junction
    { char: 'P', delay: 0.18, bright: false },
  ];

  const isActive = (minStage: number) => stage >= minStage || stage === 100;

  return (
    <div className="hero-anim">

      {/* ── SVG Fracture Layer ── */}
      <div className={`hero-fracture ${isActive(1) ? 'hero-fracture--active' : ''} ${isActive(5) ? 'hero-fracture--idle' : ''}`}>
        <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" className="hero-fracture__svg">
          <defs>
            <filter id="crack-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="sharp" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="sharp" />
              </feMerge>
            </filter>
            <linearGradient id="crack-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a853" />
              <stop offset="50%" stopColor="#f0c050" />
              <stop offset="100%" stopColor="#c07830" />
            </linearGradient>
          </defs>

          {/* Main central fracture — jagged, violent */}
          <path className="crack crack--main"
            d="M 0,250 L 80,220 L 150,280 L 220,200 L 320,260 L 400,180 L 500,250 L 580,190 L 680,270 L 780,210 L 860,260 L 950,200 L 1050,240 L 1200,220"
            filter="url(#crack-glow-strong)"
          />

          {/* Branch — upward tear near S */}
          <path className="crack crack--branch-1"
            d="M 150,280 L 130,180 L 100,120 L 80,50"
            filter="url(#crack-glow-strong)"
          />

          {/* Branch — downward at N junction */}
          <path className="crack crack--branch-2"
            d="M 580,190 L 620,300 L 660,380 L 700,450"
            filter="url(#crack-glow-strong)"
          />

          {/* Branch — upward at E junction */}
          <path className="crack crack--branch-3"
            d="M 950,200 L 980,130 L 1020,80 L 1080,30"
            filter="url(#crack-glow-strong)"
          />

          {/* Micro-splinter */}
          <path className="crack crack--splinter-1"
            d="M 320,260 L 340,330 L 360,360"
            filter="url(#crack-glow-strong)"
          />
          <path className="crack crack--splinter-2"
            d="M 780,210 L 800,140 L 810,100"
            filter="url(#crack-glow-strong)"
          />
        </svg>

        {/* Hot ember glow at crack junctions */}
        <div className="hero-fracture__ember hero-fracture__ember--1" />
        <div className="hero-fracture__ember hero-fracture__ember--2" />
        <div className="hero-fracture__ember hero-fracture__ember--3" />
      </div>

      {/* ── Slate Cue ── */}
      <div className={`hero-slate ${isActive(0) ? 'hero-slate--visible' : ''} ${isActive(3) ? 'hero-slate--dim' : ''}`}>
        <span className="hero-slate__dot">●</span> REC &middot; SCENE 01 &mdash; TITLE CARD
      </div>

      {/* ── Content Layer ── */}
      <div className="hero-content-layer">

        {/* Name with per-character ignition */}
        <h1 className="hero-name">
          {nameChars.map((item, i) =>
            item.char === ' ' ? (
              <span key={i} className="hero-name__space" />
            ) : (
              <span
                key={i}
                className={`hero-name__char ${item.bright ? 'hero-name__char--bright' : ''} ${isActive(2) ? 'hero-name__char--ignite' : ''}`}
                style={{ transitionDelay: `${stage === 100 ? 0 : item.delay}s` }}
              >
                {item.char}
              </span>
            )
          )}
          <span className={`hero-twinkle ${isActive(4) ? 'hero-twinkle--pop' : ''}`}>✦</span>
        </h1>

        {/* Role */}
        <p className={`hero-role ${isActive(3) ? 'hero-role--visible' : ''}`}>
          AI Automation Engineer Head
        </p>

        {/* Description */}
        <p className={`hero-subtitle ${isActive(3) ? 'hero-subtitle--visible' : ''}`}>
          Building the pipelines that turn scripts into worlds — generative AI, image &amp; video production, original IP.
        </p>
      </div>

    </div>
  );
};

export default HeroAnimation;
