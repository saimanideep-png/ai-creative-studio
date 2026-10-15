import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { services, serviceGroups, type Service } from '../../data/services';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <Link
        to={`/services/${service.slug}`}
        className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-coral)]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-coral)]/5"
      >
        <div className="flex items-start justify-between mb-4">
          <span className="font-heading text-sm font-medium text-[var(--color-text-muted)]">
            {service.number}
          </span>
          <motion.div
            className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-coral)]"
            whileHover={{ x: 4 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>

        <h3 className="font-heading text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-coral)] transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </Link>
    </ScrollReveal>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            label="Capabilities"
            title="Twelve capabilities. One creative partner."
            description="From scroll-stopping campaigns to software that saves time, we help brands turn ideas into practical outcomes."
          />
        </ScrollReveal>

        <div className="mt-16 space-y-16">
          {serviceGroups.map((group) => {
            const groupServices = services.filter((s) => s.group === group.key);
            return (
              <div key={group.key}>
                <ScrollReveal>
                  <h3 className="font-heading text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-coral)] mb-8 pb-3 border-b border-[var(--color-border)]">
                    {group.label}
                  </h3>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupServices.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
