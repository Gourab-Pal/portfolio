import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';

export default function LinksPage() {
  return (
    <ContentPage title="Links">
      <ul className="profile-links">
        {portfolio.links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noreferrer">
              <span>
                <span className="profile-links__label">{link.label}</span>
                <span className="profile-links__url content-muted">
                  {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              </span>
              <span className="profile-links__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
