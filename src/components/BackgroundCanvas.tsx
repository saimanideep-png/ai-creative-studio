import React from 'react';
import './BackgroundCanvas.css';

/**
 * Ember Ash Drift — Three-layer cinematic background
 * "The Ember Doesn't Know Yet"
 */

interface EmberProps {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  flareDelay: number;
  bright: boolean;
}

// 30 embers for a dense, alive field
const embers: EmberProps[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: 3 + (i % 5),                            // 3–7px (bigger)
  left: (i * 3.3 + (i * i * 2.7) % 23) % 100,  // scattered across width
  duration: 8 + (i % 6) * 2,                    // 8–18s (faster rise)
  delay: (i * 0.9) % 10,                        // tighter staggering
  drift: ((i % 5) - 2) * 25,                    // -50 to +50px sideways
  flareDelay: 2 + (i * 1.7) % 6,               // flare timing
  bright: i % 3 === 0,                          // ~33% are bright flares
}));

const BackgroundCanvas: React.FC = () => {
  return (
    <div className="bg-canvas">

      {/* ── Back Layer: Charcoal Smoke Wisps ── */}
      <div className="bg-canvas__smoke-layer">
        <div className="bg-canvas__smoke bg-canvas__smoke--1" />
        <div className="bg-canvas__smoke bg-canvas__smoke--2" />
        <div className="bg-canvas__smoke bg-canvas__smoke--3" />
        <div className="bg-canvas__smoke bg-canvas__smoke--4" />
        <div className="bg-canvas__smoke bg-canvas__smoke--5" />
      </div>

      {/* ── Mid Layer: Drifting Embers ── */}
      <div className="bg-canvas__ember-layer">
        {embers.map((e) => (
          <div
            key={e.id}
            className={`bg-canvas__ember ${e.bright ? 'bg-canvas__ember--bright' : ''}`}
            style={{
              '--ember-size': `${e.size}px`,
              '--ember-left': `${e.left}%`,
              '--ember-duration': `${e.duration}s`,
              '--ember-delay': `${e.delay}s`,
              '--ember-drift': `${e.drift}px`,
              '--ember-flare-delay': `${e.flareDelay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Film Grain ── */}
      <div className="bg-canvas__grain" />
    </div>
  );
};

export default BackgroundCanvas;
