import HomePage from './pages/HomePage.jsx';
import SummaryPage from './pages/SummaryPage.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import LinksPage from './pages/LinksPage.jsx';
import BottomNav from './components/BottomNav.jsx';
import ContentPage from './components/ContentPage.jsx';

const PAGE_COMPONENTS = {
  '/': HomePage,
  '/summary': SummaryPage,
  '/experience': ExperiencePage,
  '/skills': SkillsPage,
  '/links': LinksPage,
};

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page = PAGE_COMPONENTS[currentPath];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="main-content" tabIndex={-1}>
        {Page ? <Page /> : (
          <ContentPage title="Page not found">
            <p>This page is not available. <a href="/">Return home →</a></p>
          </ContentPage>
        )}
      </div>
      <BottomNav currentPath={currentPath} />
    </>
  );
}
