import portfolio from '../data/portfolio.json';
import PortfolioImage from './PortfolioImage.jsx';
import Icon from './Icon.jsx';
import './SiteChrome.css';

export default function SiteChrome({ isHome }) {
  const { profile } = portfolio;
  return (
    <>
      <div className={`site-background${isHome ? '' : ' site-background--quiet'}`} aria-hidden="true">
        <PortfolioImage
          src={profile.heroImage.src}
          alt=""
          fetchPriority="high"
          style={{
            '--hero-position': profile.heroImage.position,
            '--hero-mobile-position': profile.heroImage.mobilePosition || profile.heroImage.position,
          }}
        />
      </div>
      <header className="site-header">
        <div>
          {isHome && profile.availability.visible && (
            <p className="site-header__availability">
              <Icon name="status" />
              {profile.availability.text}
            </p>
          )}
        </div>
        {profile.resume.url && (
          <a className="site-header__resume" href={profile.resume.url} target="_blank" rel="noreferrer">
            {profile.resume.label}
          </a>
        )}
      </header>
    </>
  );
}
