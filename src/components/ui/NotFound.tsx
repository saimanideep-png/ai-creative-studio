import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-[var(--color-bg)]">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <h1 className="font-heading text-8xl md:text-9xl font-extrabold text-[var(--color-coral)] tracking-tighter mb-2 select-none">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-3">
          Page not found
        </h2>
        <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] mb-8 max-w-sm">
          The page you are looking for doesn't exist or has been moved to another quadrant of the studio.
        </p>
        <Button as="a" href="/" variant="primary" size="md" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
