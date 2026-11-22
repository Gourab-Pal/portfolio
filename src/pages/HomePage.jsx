import portfolio from '../data/portfolio.json';
import './HomePage.css';

export default function HomePage() {
  const { site, profile, links } = portfolio;
  const linkedIn = links.find((link) => link.id === 'linkedin');
  const telephoneUrl = `tel:${profile.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <title>{site.title}</title>
      <meta name="description" content={site.description} />

      <main className="home-page">
        <section className="home-page__intro" aria-labelledby="profile-name">
          <p className="home-page__headline">{profile.headline}</p>
          <h1 id="profile-name">{profile.name}</h1>

          <dl className="home-page__contacts">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href={telephoneUrl}>{profile.phone}</a></dd>
            </div>
            {linkedIn && (
              <div>
                <dt>{linkedIn.label}</dt>
                <dd>
                  <a href={linkedIn.url} target="_blank" rel="noreferrer">
                    {linkedIn.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
