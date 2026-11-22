import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';

export default function SkillsPage() {
  return (
    <ContentPage title="Skills">
      <div className="content-stack">
        {portfolio.skillGroups.map((group) => (
          <section className="content-divider" key={group.id} aria-labelledby={`${group.id}-title`}>
            <h2 id={`${group.id}-title`}>{group.title}</h2>
            <ul className="tag-list">
              {group.items.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
