import React from 'react';

export interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={className}>
      <span className="font-body text-sm uppercase tracking-widest text-[var(--color-coral)] mb-3 block">
        {label}
      </span>
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
