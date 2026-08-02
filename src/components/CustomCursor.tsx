import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

/** Returns true when the device is touch/mobile. */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

/** Returns true when the user prefers reduced motion. */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const INTERACTIVE_SELECTOR = 'a, button, [role="button"]';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  
  const [isTouch, setIsTouch] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Electric arc SVG refs
  const polyline1Ref = useRef<SVGPolylineElement | null>(null);
  const polyline2Ref = useRef<SVGPolylineElement | null>(null);
  const polyline3Ref = useRef<SVGPolylineElement | null>(null);

  // Trail state
  const trailPosRef = useRef<{ x: number; y: number }[]>([]);
  const trailCount = 12;

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const reducedMotion = prefersReducedMotion();
    const lerpFactor = reducedMotion ? 1 : 0.25;
    
    // Initialize trail points
    if (trailPosRef.current.length === 0) {
      trailPosRef.current = Array(trailCount).fill(null).map(() => ({ x: -100, y: -100 }));
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (positionRef.current.x === -100) {
        // First move, snap directly to avoid flying from corner
        positionRef.current.x = e.clientX;
        positionRef.current.y = e.clientY;
        trailPosRef.current.forEach(p => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const animate = () => {
      const pos = positionRef.current;
      const target = targetRef.current;

      // Distance check to determine speed (for electric intensity)
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Lerp main cursor
      pos.x += dx * lerpFactor;
      pos.y += dy * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }

      if (!reducedMotion) {
        let prevX = pos.x;
        let prevY = pos.y;

        // Base trail lerp
        for (let i = 0; i < trailCount; i++) {
          const p = trailPosRef.current[i];
          // Each node follows the one in front of it
          p.x += (prevX - p.x) * 0.45;
          p.y += (prevY - p.y) * 0.45;
          prevX = p.x;
          prevY = p.y;
        }

        // Generate jagged coordinates for electricity
        // The faster you move, the wider the jitter
        const intensity = Math.min(speed * 0.5, 30); 
        
        // Only draw electricity if moving
        if (intensity > 1) {
          const generateArc = (varianceScale: number) => {
            return trailPosRef.current.map((p, i) => {
              if (i === 0) return `${pos.x},${pos.y}`; // Connect directly to cursor
              // Taper off the jitter at the tail
              const factor = (1 - i / trailCount) * intensity * varianceScale;
              const jitterX = (Math.random() - 0.5) * factor;
              const jitterY = (Math.random() - 0.5) * factor;
              return `${p.x + jitterX},${p.y + jitterY}`;
            }).join(' ');
          };

          if (polyline1Ref.current) {
            polyline1Ref.current.setAttribute('points', generateArc(1.2));
            polyline1Ref.current.style.opacity = '1';
          }
          if (polyline2Ref.current) {
            polyline2Ref.current.setAttribute('points', generateArc(0.8));
            polyline2Ref.current.style.opacity = '0.7';
          }
          if (polyline3Ref.current) {
            polyline3Ref.current.setAttribute('points', generateArc(1.5));
            polyline3Ref.current.style.opacity = '0.4';
          }
        } else {
          // Fade out when resting
          if (polyline1Ref.current) polyline1Ref.current.style.opacity = '0';
          if (polyline2Ref.current) polyline2Ref.current.style.opacity = '0';
          if (polyline3Ref.current) polyline3Ref.current.style.opacity = '0';
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  const handlePointerOver = useCallback((e: MouseEvent) => {
    if (isTouch) return;
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTOR)) {
      setIsHovering(true);
    }
  }, [isTouch]);

  const handlePointerOut = useCallback((e: MouseEvent) => {
    if (isTouch) return;
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTOR)) {
      setIsHovering(false);
    }
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, [isTouch, handlePointerOver, handlePointerOut]);

  if (isTouch) return null;

  return (
    <>
      {/* Electric Arcs Canvas */}
      {!prefersReducedMotion() && (
        <svg className="custom-cursor-electric" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="electric-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <polyline ref={polyline3Ref} className="arc arc-outer" filter="url(#electric-glow)" />
          <polyline ref={polyline2Ref} className="arc arc-mid" filter="url(#electric-glow)" />
          <polyline ref={polyline1Ref} className="arc arc-core" />
        </svg>
      )}

      {/* Main Cursor Head */}
      <div
        ref={cursorRef}
        className={`custom-cursor${isHovering ? ' custom-cursor--hovering' : ''}`}
        id="custom-cursor"
      />
    </>
  );
};

export default CustomCursor;
