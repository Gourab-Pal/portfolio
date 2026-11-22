import portfolio from '../data/portfolio.json';
import Icon from '../components/Icon.jsx';
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
              <dt className="sr-only">Email</dt>
              <dd>
                <Icon name="email" />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Phone</dt>
              <dd><Icon name="phone" /><a href={telephoneUrl}>{profile.phone}</a></dd>
            </div>
            {linkedIn && (
              <div>
                <dt className="sr-only">{linkedIn.label}</dt>
                <dd>
                  <Icon name="linkedin" />
                  <a href={linkedIn.url} target="_blank" rel="noreferrer">
                    {linkedIn.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Location</dt>
              <dd><Icon name="location" /><span>{profile.location}</span></dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
