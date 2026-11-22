import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';
import PortfolioImage from '../components/PortfolioImage.jsx';
import '../components/ProjectCard.css';

function DetailList({ title, items }) {
  if (!items.length) return null;
  return (
    <section className="content-section">
      <h2>{title}</h2>
      <ul className="case-study__list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

export default function ProjectPage({ project }) {
  const experience = portfolio.experiences.find((item) => item.id === project.experienceId);
  return (
    <ContentPage title={project.title}>
      <a className="case-study__back" href={experience ? `/experience#${experience.id}` : '/experience'}>Back to experience</a>
      <p>{project.subtitle}</p>
      {project.isDraft && <p className="case-study__draft">Draft case study</p>}
      <PortfolioImage className="case-study__cover" src={project.cover.src} alt={project.cover.alt} />
      <p>{project.overview}</p>
      <DetailList title="My contribution" items={project.responsibilities} />
      <DetailList title="Outcomes" items={project.outcomes} />
      {project.tools.length > 0 && (
        <section className="content-section">
          <h2>Tools used</h2>
          <ul className="tag-list">{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </section>
      )}
      {project.gallery.length > 0 && (
        <section className="content-section">
          <h2>Project gallery</h2>
          <div className="case-study__gallery">
            {project.gallery.map((item) => (
              <figure key={item.src}>
                <PortfolioImage src={item.src} alt={item.alt} loading="lazy" />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}
      {project.links.length > 0 && (
        <section className="content-section">
          <h2>Project links</h2>
          <ul className="case-study__links">
            {project.links.map((link) => (
              <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
            ))}
          </ul>
        </section>
      )}
    </ContentPage>
  );
}
