import { Lightbulb, Cpu, Rocket } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

const principles = [
  {
    icon: Lightbulb,
    title: 'Creative thinking first',
    description: 'Start with the business objective, not the tool.',
  },
  {
    icon: Cpu,
    title: 'Technology with a purpose',
    description: 'Use AI where it improves the outcome.',
  },
  {
    icon: Rocket,
    title: 'Execution over hype',
    description: 'Build work that clients can actually use.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text content */}
          <div>
            <ScrollReveal>
              <SectionHeading
                label="About"
                title="A studio built for the way modern businesses create."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mt-6 max-w-xl">
                We bring creative production and practical technology together
                under one roof. From commercial videos and brand storytelling to
                digital products and intelligent workflows, the focus is simple:
                make ambitious ideas useful, compelling, and ready for the real
                world.
              </p>
            </ScrollReveal>

            {/* Optional founder placeholder */}
            <ScrollReveal delay={0.2}>
              <div className="mt-10 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] border-dashed">
                <p className="text-sm text-[var(--color-text-muted)] italic">
                  Founder introduction and photograph — add your story here.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Principles */}
          <div className="space-y-6 lg:pt-20">
            {principles.map((principle, i) => (
              <ScrollReveal key={principle.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--color-surface-2)] flex items-center justify-center">
                    <principle.icon
                      size={22}
                      className="text-[var(--color-coral)]"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
