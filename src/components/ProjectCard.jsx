import PortfolioImage from './PortfolioImage.jsx';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <a className="project-card" href={`/projects/${encodeURIComponent(project.id)}`}>
      <PortfolioImage
        className="project-card__image"
        src={project.cover.src}
        alt={project.cover.alt}
        loading="lazy"
        width="640"
        height="480"
      />
      <div className="project-card__body">
        <h4>{project.title}</h4>
        <p>{project.subtitle}</p>
        <span className="project-card__action">View case study</span>
      </div>
    </a>
  );
}
