import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export interface WorkGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  onSelectProject?: (project: Project) => void;
}

export const WorkGrid: React.FC<WorkGridProps> = ({
  projects,
  onProjectClick,
  onSelectProject,
}) => {
  const handleClick = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => {
          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full"
            >
              <ProjectCard
                project={project}
                onClick={() => handleClick(project)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full py-20 text-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50"
        >
          <p className="text-[var(--color-text-muted)] text-base font-body">
            No projects found in this category.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkGrid;
