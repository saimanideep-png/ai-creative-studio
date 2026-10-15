import { Hero } from '../components/hero/Hero';
import { WorkSection } from '../components/work/WorkSection';
import { ServicesSection } from '../components/services/ServicesSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { AboutSection } from '../components/about/AboutSection';
import { ContactSection } from '../components/contact/ContactSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
