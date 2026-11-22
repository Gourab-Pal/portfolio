import portfolio from '../data/portfolio.json';
import './BottomNav.css';

export default function BottomNav({ currentPath }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {portfolio.site.navigation.map((item) => (
        <a
          key={item.path}
          href={item.path}
          aria-current={currentPath === item.path ? 'page' : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
