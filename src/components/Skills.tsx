import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

interface Skill {
  name: string;
  level: number; // 0 to 100
}

interface SkillCategory {
  title: string;
  systemName: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: 'AI & Automation',
    systemName: 'SYS.MOD.01',
    skills: [
      { name: 'Image Generation (Midjourney)', level: 95 },
      { name: 'AI Workflow Automation (n8n)', level: 90 },
      { name: 'LLM & Agent Development', level: 85 },
      { name: 'Multimodal AI', level: 80 },
      { name: 'Data Preprocessing & Model Deployment', level: 75 },
    ],
  },
  {
    title: 'Creative',
    systemName: 'SYS.MOD.02',
    skills: [
      { name: 'Film Direction / Storyboarding', level: 90 },
      { name: 'Thumbnail & Poster Design', level: 85 },
      { name: 'Prompt Engineering', level: 95 },
    ],
  },
  {
    title: 'Engineering',
    systemName: 'SYS.MOD.03',
    skills: [
      { name: 'Full Stack Development', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'Docker', level: 75 },
    ],
  },
];

const Skills = () => {
  const { ref, isVisible, className } = useScrollReveal();

  return (
    <section id="skills" className="section">
      <div ref={ref} className={`section__inner ${className}`}>
        <span className="section__label scroll-reveal">— INT. Toolkit — Continuous</span>
        <h2 className="section__title scroll-reveal">Systems & Skills</h2>

        <div className="skills__grid scroll-reveal">
          {categories.map((category, catIndex) => (
            <div key={category.title} className="skills__panel">
              <div className="skills__panel-header">
                <span className="skills__sys-name">[{category.systemName}]</span>
                <h3 className="skills__title">{category.title}</h3>
              </div>

              <div className="skills__list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-row__info">
                      <span className="skill-row__dot">●</span>
                      <span className="skill-row__name">{skill.name}</span>
                    </div>
                    <div className="skill-row__bar-track">
                      <div
                        className="skill-row__bar-fill"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(catIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
