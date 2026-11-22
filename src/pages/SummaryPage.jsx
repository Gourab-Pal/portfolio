import portfolio from '../data/portfolio.json';
import ContentPage from '../components/ContentPage.jsx';

export default function SummaryPage() {
  return (
    <ContentPage title={portfolio.summary.title}>
      <div className="content-stack">
        {portfolio.summary.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {portfolio.education.length > 0 && (
        <section className="content-section" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          {portfolio.education.map((item) => (
            <article className="content-divider" key={item.id}>
              <h3>{item.qualification}</h3>
              <p>{item.institution}</p>
              <p className="content-muted">{item.period}</p>
            </article>
          ))}
        </section>
      )}
      {portfolio.languages.length > 0 && (
        <section className="content-section" aria-labelledby="languages-title">
          <h2 id="languages-title">Languages</h2>
          <p>{portfolio.languages.join(' · ')}</p>
        </section>
      )}
    </ContentPage>
  );
}
