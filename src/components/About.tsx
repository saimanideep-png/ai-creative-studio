import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const { ref, className } = useScrollReveal();

  return (
    <section id="about" className="section">
      <div ref={ref} className={`section__inner ${className}`}>
        <span className="section__label scroll-reveal">— INT. About — Continuous</span>
        <h2 className="section__title scroll-reveal">About</h2>

        <div className="about__grid scroll-reveal">
          {/* Left: SM monogram card */}
          <div className="about__portrait-wrap">
            <div className="about__monogram">
              <span className="about__chevron about__chevron--left">&#x276F;</span>
              <span className="about__initials">SM</span>
              <span className="about__chevron about__chevron--right">&#x276E;</span>
            </div>
            <div className="about__meta">
              Public Speaking Club — NIAT × BITS Pilani
            </div>
          </div>

          {/* Right: Bio */}
          <div className="about__bio">
            <p>
              Computer Science student at NIAT and BITS Pilani, Hyderabad,
              building the systems that turn scripts and story ideas into
              production-ready visuals.
            </p>
            <p>
              Currently leading AI automation at Peblo — designing the pipelines
              that take a project from script to storyboard to finished frame,
              and coordinating the team on how to use them.
            </p>
            <p>
              Background spans generative AI, LLM-based automation, and original
              worldbuilding — most recently ANSHAVATAR, a mythology-rooted
              superhero universe built from the ground up.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="about__stats scroll-reveal">
          <div className="about__stat scroll-reveal">
            <span className="about__stat-number">8<span className="about__stat-plus">+</span></span>
            <span className="about__stat-label">Months in Production AI</span>
          </div>
          <div className="about__stat scroll-reveal">
            <span className="about__stat-number">4</span>
            <span className="about__stat-label">Teams & Studios</span>
          </div>
          <div className="about__stat scroll-reveal">
            <span className="about__stat-number">2</span>
            <span className="about__stat-label">Original Universes Built</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
