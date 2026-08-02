import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

interface ProcessStep {
  label: string;
}

interface ProjectData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  tags: string[];
  filmstrip?: boolean;
}

const projects: ProjectData[] = [
  {
    id: 'anshavatar',
    imageSrc: '/anshavatar-concept.png',
    imageAlt: 'ANSHAVATAR concept art',
    title: 'ANSHAVATAR',
    subtitle:
      'An original Indian mythology-rooted superhero universe — the Adi-Ansh fragments, the villain Nirvanta, and heroes built from a fully developed lore system, cold-open screenplay, and a tested image-generation pipeline.',
    filmstrip: true,
    steps: [{ label: 'LORE' }, { label: 'STORYBOARD' }, { label: 'AI ART' }],
    tags: ['MIDJOURNEY', 'WORLDBUILDING', 'SCREENWRITING', 'CONCEPT ART'],
  },
  {
    id: 'ai-ad-automation',
    imageSrc: '/ad-automation-concept.png',
    imageAlt: 'AI Ad Automation Tool',
    title: 'AI AD AUTOMATION TOOL',
    subtitle:
      'A Google Flow–based workflow automation tool solving image consistency and generation speed for AI content studios — designed, built, and pitched independently to studio founders, including Aikya AI.',
    steps: [{ label: 'WORKFLOW' }, { label: 'ENGINE' }, { label: 'PITCH' }],
    tags: ['GOOGLE FLOW', 'AUTOMATION', 'PITCH DECK', 'CONSISTENCY ENGINE'],
  },
  {
    id: 'spotifyshots',
    imageSrc: '/spotifyshots-concept.png',
    imageAlt: 'SpotifyShots — Most Replayed',
    title: 'SPOTIFYSHOTS',
    subtitle:
      'A Spotify-style listening app with one core twist — it detects and plays the most-replayed section of a song first, instead of starting from the top, so the hook you actually came for hits immediately.',
    steps: [{ label: 'AUDIO ANALYSIS' }, { label: 'PEAK DETECTION' }, { label: 'INSTANT PLAYBACK' }],
    tags: ['WEB APP', 'AUDIO PROCESSING', 'MUSIC TECH'],
  },
  {
    id: 'olx-clone',
    imageSrc: '/olx-clone-concept.png',
    imageAlt: 'OLX Clone Marketplace',
    title: 'OLX CLONE',
    subtitle:
      'A full marketplace clone rebuilding OLX\'s core loop — post a listing, browse categories, and connect with buyers — as a hands-on exercise in real-world CRUD architecture and marketplace UX.',
    steps: [{ label: 'LISTINGS' }, { label: 'MARKETPLACE ENGINE' }, { label: 'DEPLOY' }],
    tags: ['FULL-STACK', 'MARKETPLACE', 'WEB APP'],
  },
];

const Projects = () => {
  const { ref, className } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="work" className="section">
      <div ref={ref} className={`section__inner ${className}`}>
        <span className="section__label scroll-reveal">— INT. Selected Work — Continuous</span>
        <h2 className="section__title scroll-reveal">Projects</h2>

        <div className="projects__list">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-row scroll-reveal ${
                project.filmstrip ? 'project-row--filmstrip' : ''
              }`}
              id={`project-${project.id}`}
            >
              <div className="project-row__image-container">
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className="project-row__image"
                />
              </div>

              <div className="project-row__content">
                <h3 className="project-row__title">{project.title}</h3>
                <p className="project-row__subtitle">{project.subtitle}</p>

                <div className="project-row__pipeline">
                  {project.steps.map((step, index) => (
                    <div key={index} className="project-row__pipeline-step">
                      <span className="project-row__step-label">
                        {step.label}
                      </span>
                      {index < project.steps.length - 1 && (
                        <span className="project-row__step-arrow">→</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="project-row__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-row__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
