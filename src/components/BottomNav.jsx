import portfolio from '../data/portfolio.json';
import Icon from './Icon.jsx';
import './BottomNav.css';

const NAVIGATION_ICONS = {
  '/': 'home',
  '/summary': 'summary',
  '/experience': 'experience',
  '/skills': 'skills',
  '/links': 'links',
};

export default function BottomNav({ currentPath }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {portfolio.site.navigation.map((item) => (
        <a
          key={item.path}
          href={item.path}
          aria-current={currentPath === item.path ? 'page' : undefined}
        >
          <Icon name={NAVIGATION_ICONS[item.path]} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
