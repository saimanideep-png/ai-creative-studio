import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';
import { projects, categoryFilters, type Project } from '../../data/projects';
import { WorkGrid } from './WorkGrid';
import { VideoModal } from './VideoModal';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollReveal } from '../ui/ScrollReveal';

export const WorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
            <SectionHeading
              label="Selected Work"
              title="Ideas made tangible."
              description="Explore the work across films, campaigns, brands, digital products, and entertainment."
            />

            {/* Filter Controls */}
            <div
              className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] self-start md:self-auto"
              role="tablist"
              aria-label="Filter portfolio projects"
            >
              {categoryFilters.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-[var(--color-coral)] rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transparent Quality & Customization Disclaimer Banner */}
          <div className="mb-10 p-4 rounded-xl bg-[var(--color-surface)]/80 border border-[var(--color-border)] flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/20 flex items-center justify-center text-[var(--color-coral)] shrink-0 mt-0.5 sm:mt-0">
              <Sparkles size={16} />
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text)] font-medium">Production Note:</strong> The videos and media below are rapid concept demonstrations. For client commissions and institutional partnerships, final deliveries are produced with customized voiceovers, tailored brand styling, and even higher production fidelity.
            </p>
          </div>
        </ScrollReveal>

        {/* Portfolio Grid */}
        <WorkGrid
          projects={filteredProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Video / Detail Modal */}
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default WorkSection;
