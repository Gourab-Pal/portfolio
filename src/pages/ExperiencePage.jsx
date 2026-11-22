import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';
import { formatMonth } from '../utils/formatMonth.js';

function ExperienceEntry({ experience }) {
  return (
    <article className="experience-entry" aria-labelledby={`${experience.id}-title`}>
      <p className="experience-entry__dates">
        <time dateTime={experience.startDate}>{formatMonth(experience.startDate)}</time>
        {' — '}
        {experience.endDate
          ? <time dateTime={experience.endDate}>{formatMonth(experience.endDate)}</time>
          : 'Present'}
      </p>
      <h2 id={`${experience.id}-title`}>{experience.company}</h2>
      <p className="experience-entry__role">{experience.role}</p>
      <div className="content-stack">
        {experience.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
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
    <ContentPage title="Experience">
      <div className="experience-list">
        {portfolio.experiences.map((experience) => (
          <ExperienceEntry key={experience.id} experience={experience} />
        ))}
      </div>
    </ContentPage>
  );
}
