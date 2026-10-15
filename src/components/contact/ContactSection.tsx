import { useState, type FormEvent } from 'react';
import { Send, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { siteConfig } from '../../data/site';
import { services } from '../../data/services';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.get('name')?.toString().trim()) errs.name = 'Name is required.';
    if (!form.get('email')?.toString().trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get('email')!.toString())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.get('brief')?.toString().trim()) errs.brief = 'Tell us about your project.';
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot check
    if (form.get('website')?.toString()) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // If no form endpoint configured, open mailto fallback
    if (!siteConfig.formEndpoint) {
      const name = form.get('name');
      const email = form.get('email');
      const service = form.get('service');
      const brief = form.get('brief');
      const subject = encodeURIComponent(`Project Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nBrief:\n${brief}`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setFormState('success');
      return;
    }

    // Submit to endpoint
    setFormState('submitting');
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error('Submission failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const inputClasses =
    'w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-coral)] transition-colors text-sm';

  return (
    <section id="contact" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Heading + info */}
          <div>
            <ScrollReveal>
              <SectionHeading
                label="Contact"
                title="Have something worth building?"
                description="Tell us what you're working on. We'll start with your goal and identify the right way to bring it to life."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-8 space-y-4">
                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-coral)] transition-colors"
                  >
                    <Send size={16} />
                    <span className="text-sm">{siteConfig.email}</span>
                  </a>
                )}
                {siteConfig.whatsapp && (
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-coral)] hover:underline"
                  >
                    Message on WhatsApp <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </ScrollReveal>

            {!siteConfig.formEndpoint && (
              <ScrollReveal delay={0.2}>
                <div className="mt-6 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] border-dashed">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    ⚙️ No form endpoint configured. The form will open a
                    prefilled email draft as a fallback.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right — Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="absolute opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                    Business or brand
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    className={inputClasses}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                    Service of interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={inputClasses + ' cursor-pointer'}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.number}. {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                    Budget range (optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className={inputClasses + ' cursor-pointer'}
                  >
                    <option value="">Select range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 – $15,000</option>
                    <option value="15k-50k">$15,000 – $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="brief" className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                  Project brief *
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  rows={5}
                  className={inputClasses + ' resize-y'}
                  placeholder="Tell us about your project, goals, and timeline..."
                />
                {errors.brief && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.brief}
                  </p>
                )}
              </div>

              {formState === 'success' ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-900/20 border border-green-800/30 text-green-400 text-sm">
                  <CheckCircle2 size={18} />
                  {siteConfig.formEndpoint
                    ? 'Thank you! We\'ll be in touch soon.'
                    : 'Email draft opened. Please send it to complete your enquiry.'}
                </div>
              ) : formState === 'error' ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-900/20 border border-red-800/30 text-red-400 text-sm">
                  <AlertCircle size={18} />
                  Something went wrong. Please try again or email us directly.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="inline-flex items-center gap-2 bg-[var(--color-coral)] text-white font-medium px-8 py-3 rounded-full hover:bg-[var(--color-coral-hover)] transition-colors disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Start a Conversation'}
                  <ArrowRight size={18} />
                </button>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
