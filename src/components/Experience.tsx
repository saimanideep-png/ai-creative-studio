import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

interface ExperienceEntry {
  prefix: string;
  role: string;
  description: string;
}

const entries: ExperienceEntry[] = [
  {
    prefix: 'INT. PEBLO — DEC 2025 – PRESENT',
    role: 'AI Automation Engineer Head',
    description:
      'Leading automated workflows that turn scripts into scene-wise prompts, storyboards, and production-ready visual assets — integrating generation tools, automation platforms, and databases, and coordinating the team on adoption and best practices.',
  },
  {
    prefix: 'INT. ICOGZ — SEP 2025 – NOV 2025',
    role: 'AI Generalist Intern',
    description:
      'Built end-to-end AI pipelines spanning data preprocessing, LLM agent workflows with LangChain and the OpenAI API, and multimodal systems across text, image, and audio.',
  },
  {
    prefix: 'INT. NXTWAVE — AUG 2025 – SEP 2025',
    role: 'AI Accelerator — Success Coach Team',
    description:
      'Researched and implemented AI solutions to automate key processes, including video analysis for English fluency scoring.',
  },
  {
    prefix: 'INT. NIAT — DEC 2024',
    role: 'Event Organizer — Starlit 24, Freshers Day',
    description:
      'Led decoration and prop creation for a 1000+ attendee event, from creative ideation through execution.',
  },
];

const TimelineItem: React.FC<{ entry: ExperienceEntry; currentLineHeight: number; }> = ({ entry, currentLineHeight }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isIgnited, setIsIgnited] = useState(false);

  useEffect(() => {
    if (!itemRef.current) return;
    
    // The dot is roughly 8px down from the top of the item.
    // We add 8px to the item's offsetTop to find the exact pixel location of the dot relative to the timeline container.
    const dotOffset = itemRef.current.offsetTop + 8; 
    
    // Ignite when the progressive line reaches or passes the dot
    setIsIgnited(currentLineHeight >= dotOffset);
  }, [currentLineHeight]);

  return (
    <div ref={itemRef} className={`experience__item ${isIgnited ? 'experience__item--ignited' : ''}`}>
      <div className="experience__dot" />
      <div className="experience__content">
        <span className="experience__prefix">{entry.prefix}</span>
        <h3 className="experience__role">{entry.role}</h3>
        <p className="experience__desc">{entry.description}</p>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
         // Show full line instantly if user prefers reduced motion
         setLineHeight(containerRef.current.offsetHeight);
         return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      // Calculate how far the center of the screen has traveled down the timeline container.
      // If rect.top > viewportCenter, it hasn't reached the timeline yet (progress = 0).
      const progressPx = Math.max(0, viewportCenter - rect.top);
      
      // Cap the line height to the maximum height of the container
      const cappedProgress = Math.min(progressPx, rect.height);
      setLineHeight(cappedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="section__inner">
        <span className="section__label">— INT. Experience — Continuous</span>
        <h2 className="section__title">Experience</h2>

        <div className="experience__timeline" ref={containerRef}>
          {/* Faint background track for the timeline */}
          <div className="experience__line-track" />
          
          {/* Ember gradient line that progressively draws downward based on scroll */}
          <div 
            className="experience__line-progress" 
            style={{ height: `${lineHeight}px` }} 
          />

          {entries.map((entry, index) => (
            <TimelineItem 
              key={index} 
              entry={entry} 
              currentLineHeight={lineHeight} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
