import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import { type Service, getRelatedServices } from '../../data/services';
import { projects, type Project } from '../../data/projects';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ProjectCard } from '../work/ProjectCard';
import { VideoModal } from '../work/VideoModal';

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const related = getRelatedServices(service.relatedSlugs);
  
  // Robust matching: by exact service name or partial matching
  const serviceProjects = projects.filter((p) => {
    if (p.service === service.name) return true;
    if (service.slug === 'ai-ad-film-production' && p.tags.some(t => t.toLowerCase().includes('commercial') || t.toLowerCase().includes('ad film'))) return true;
    if (service.slug === 'ai-ugc-ads' && p.tags.some(t => t.toLowerCase().includes('ugc'))) return true;
    if (service.slug === 'ai-promo-videos' && (p.service === 'AI Promo Videos' || p.tags.some(t => t.toLowerCase().includes('promo')))) return true;
    if (service.slug === 'real-estate-visual-production' && p.tags.some(t => t.toLowerCase().includes('real estate'))) return true;
    if (service.slug === 'ai-app-saas' && (p.service === 'AI App / SaaS Development' || p.tags.some(t => t.toLowerCase().includes('saas')))) return true;
    if (service.slug === 'ai-video-editing' && (p.service === 'AI Video Editing & Motion Graphics' || p.tags.some(t => t.toLowerCase().includes('reels') || t.toLowerCase().includes('shorts')))) return true;
    if (service.slug === 'ai-youtube-channels' && (p.service.includes('YouTube') || p.tags.some(t => t.toLowerCase().includes('youtube') || t.toLowerCase().includes('channel')))) return true;
    return false;
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          to="/#services"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-coral)] transition-colors mb-10"
        >
          <ArrowLeft size={16} /> All Services
        </Link>

        {/* Header */}
        <ScrollReveal>
          <span className="font-heading text-sm font-medium text-[var(--color-coral)] tracking-[0.15em] uppercase">
            Service {service.number}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-6">
            {service.name}
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            {service.description}
          </p>
        </ScrollReveal>

        {/* What we can create */}
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold mb-8">
              What we can create
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.showcaseOpportunities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[var(--color-coral)] mt-0.5 shrink-0"
                  />
                  <span className="text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Typical Deliverables */}
        {service.deliverables && service.deliverables.length > 0 && (
          <ScrollReveal>
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-semibold mb-8">
                Typical deliverables
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-surface-2)]/60 border border-[var(--color-border)]"
                  >
                    <PackageCheck
                      size={18}
                      className="text-[var(--color-lavender)] mt-0.5 shrink-0"
                    />
                    <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Portfolio work for this service using full interactive ProjectCard */}
        {serviceProjects.length > 0 ? (
          <ScrollReveal>
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-semibold mb-8">
                Related work & demonstrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {serviceProjects.map((project) => (
                  <div key={project.id} className="h-full flex flex-col">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="mt-16 p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                Demos for this service are currently being finalized. Check back soon or contact us to discuss custom examples.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Simple 3-step process */}
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold mb-8">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Discover',
                  desc: 'Understand your objective, audience, requirements, and constraints.',
                },
                {
                  step: '02',
                  title: 'Create',
                  desc: 'Develop the concept, produce the assets, and refine through feedback.',
                },
                {
                  step: '03',
                  title: 'Deliver',
                  desc: 'Deliver the finished work, organize files, and define next steps.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <span className="font-heading text-3xl font-bold text-[var(--color-coral)]">
                    {item.step}
                  </span>
                  <h3 className="font-heading font-semibold text-lg mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-16 p-8 lg:p-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
              Tell us about your project and we'll identify the right approach
              to bring it to life.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[var(--color-coral)] text-white font-medium px-8 py-3 rounded-full hover:bg-[var(--color-coral-hover)] transition-colors"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Related services */}
        {related.length > 0 && (
          <ScrollReveal>
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-semibold mb-8">
                Related services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="group p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-coral)]/40 transition-all"
                  >
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {s.number}
                    </span>
                    <h3 className="font-heading font-semibold mt-1 group-hover:text-[var(--color-coral)] transition-colors">
                      {s.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Video / Gallery modal */}
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </div>
  );
}
