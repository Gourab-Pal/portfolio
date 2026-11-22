import portfolio from '../data/portfolio.json';
import './ContentPage.css';

export default function ContentPage({ title, children }) {
  return (
    <>
      <title>{`${title} | ${portfolio.profile.name}`}</title>
      <meta name="description" content={portfolio.site.description} />
      <main className="content-page">
        <header className="content-page__heading">
          <p className="content-page__eyebrow">{portfolio.profile.headline}</p>
          <h1>{title}</h1>
        </header>
        <div className="content-page__body">{children}</div>
      </main>
    </>
  );
}
