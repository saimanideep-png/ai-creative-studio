import { motion } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Understand the client\'s objective, audience, requirements, and constraints.',
  },
  {
    number: '02',
    title: 'Create',
    description:
      'Develop the concept, produce the assets or build the solution, and refine the result through feedback.',
  },
  {
    number: '03',
    title: 'Deliver & Improve',
    description:
      'Deliver the finished work, organize the required files, and define practical next steps where relevant.',
  },
];

export function ProcessSection() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            label="Process"
            title="From first idea to final delivery."
          />
        </ScrollReveal>

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:grid grid-cols-3 gap-8 mt-16 relative">
          {/* Connecting line */}
          <div className="absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px] bg-[var(--color-border)] z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-lavender)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="relative z-10 text-center">
                <div className="w-[104px] h-[104px] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading text-3xl font-bold text-[var(--color-coral)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden mt-12 space-y-10 relative pl-12">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[var(--color-border)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--color-coral)] to-[var(--color-lavender)]"
              initial={{ scaleY: reduced ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="font-heading text-sm font-bold text-[var(--color-coral)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
