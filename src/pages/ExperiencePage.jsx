import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';
import { formatMonth } from '../utils/formatMonth.js';
import ProjectCard from '../components/ProjectCard.jsx';

function ExperienceEntry({ experience }) {
  const projects = portfolio.projects.filter((project) => project.experienceId === experience.id);
  return (
    <article className="experience-entry" id={experience.id} aria-labelledby={`${experience.id}-title`}>
      <div className="experience-entry__header">
        <h2 id={`${experience.id}-title`}>{experience.role}</h2>
        <p className="experience-entry__dates">
          <time dateTime={experience.startDate}>{formatMonth(experience.startDate)}</time>
          {' — '}
          {experience.endDate
            ? <time dateTime={experience.endDate}>{formatMonth(experience.endDate)}</time>
            : 'Present'}
        </p>
      </div>
      <p className="experience-entry__role">{experience.company}</p>
      <div className="content-stack">
        {experience.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {projects.length > 0 && (
        <section className="selected-projects" aria-labelledby={`${experience.id}-projects`}>
          <h3 id={`${experience.id}-projects`}>Selected projects</h3>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>
      )}
      {experience.highlights.length > 0 && (
        <ul className="experience-entry__highlights">
          {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      )}
      {experience.tools.length > 0 && (
        <ul className="tag-list" aria-label="Tools used">
          {experience.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      )}
    </article>
  );
}

export default function ExperiencePage() {
  return (
    <ContentPage title="Work Experience">
      <div className="experience-list">
        {portfolio.experiences.map((experience) => (
          <ExperienceEntry key={experience.id} experience={experience} />
        ))}
      </div>
    </ContentPage>
  );
}
