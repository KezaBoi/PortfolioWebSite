import React, { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';

import { PERSONAL_INFO } from './data/portfolio';

// --- LAZY-LOADED & MEMOIZED SECTION COMPONENTS ---
// These components are wrapped in React.memo for performance.
// In a real app, these would be in separate files.

const memoize = (Component) => React.memo(Component);

const Hero = memoize(() => (
  <div className="text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
      {PERSONAL_INFO.name}
    </h1>
    <p className="mt-4 text-xl md:text-2xl text-gray-600">
      {PERSONAL_INFO.title}
    </p>
    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <a href="#contact" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
        Let's Talk
      </a>
      <a href={PERSONAL_INFO.resumeLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
        View Resume
      </a>
    </div>
  </div>
));

// For lazy loading, components must be default exported from their module.
// We simulate that here for the purpose of creating a single file.
const createLazyComponent = (Component) => lazy(() => Promise.resolve({ default: Component }));

const LazyExperience = createLazyComponent(memoize(() => <h2 className="text-4xl font-bold text-center text-gray-800 tracking-tight">Work Experience</h2>));
const LazyProjects = createLazyComponent(memoize(() => <h2 className="text-4xl font-bold text-center text-gray-800 tracking-tight">Projects</h2>));
const LazyEducation = createLazyComponent(memoize(() => <h2 className="text-4xl font-bold text-center text-gray-800 tracking-tight">Education</h2>));
const LazyContact = createLazyComponent(memoize(() => <h2 className="text-4xl font-bold text-center text-gray-800 tracking-tight">Contact Me</h2>));
const LazySkills = createLazyComponent(memoize(() => <h2 className="text-4xl font-bold text-center text-gray-800 tracking-tight">Skills</h2>));


// --- NEW LIGHT THEME COMPONENTS ---

const LightNavbar = ({ activeSection, scrollToSection, sections }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm' : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">A</div>
            <span className="hidden sm:block text-lg font-semibold text-gray-800">{PERSONAL_INFO.name}</span>
          </button>
          <div className="hidden lg:flex items-center space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${activeSection === section.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

const LightFooter = () => (
  <footer className="py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.</p>
      <p className="text-sm mt-1">Built with React & Tailwind CSS.</p>
    </div>
  </footer>
);

// Assuming FloatingPillSidebar is in the components directory
const FloatingPillSidebar = lazy(() => import('./FloatingPillSidebar.jsx'));


// --- MAIN APP CONTENT ---
const AppContent = () => {
  const sections = [
    { id: 'hero', label: 'Home', path: '/' },
    { id: 'experience', label: 'Experience', path: '/experience', component: <LazyExperience /> },
    { id: 'skills', label: 'Skills', path: '/skills', component: <LazySkills /> },
    { id: 'projects', label: 'Projects', path: '/projects', component: <LazyProjects /> },
    { id: 'education', label: 'Education', path: '/education', component: <LazyEducation /> },
    { id: 'contact', label: 'Contact', path: '/contact', component: <LazyContact /> },
  ];

  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);

  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const currentSection = sections.find(s => {
      const el = document.getElementById(s.id);
      return el && scrollPosition >= el.offsetTop;
    })?.id || 'hero';

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
      const newPath = sections.find(s => s.id === currentSection)?.path;
      if (newPath && location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [activeSection, location.pathname, navigate, sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (element && section) {
      isScrolling.current = true;
      navigate(section.path);
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isScrolling.current = false; }, 1000);
    }
  }, [navigate, sections]);

  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      <LightNavbar activeSection={activeSection} scrollToSection={scrollToSection} sections={sections} />

      <Suspense fallback={<div></div>}>
        <FloatingPillSidebar activeSection={activeSection} scrollToSection={scrollToSection} sections={sections} />
      </Suspense>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <section id="hero" className="min-h-screen flex flex-col justify-center scroll-mt-16">
          <Hero />
        </section>

        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          {sections.slice(1).map(section => (
            <section key={section.id} id={section.id} className="min-h-screen flex flex-col justify-center py-20 md:py-28 scroll-mt-16">
              {section.component}
            </section>
          ))}
        </Suspense>
      </main>

      <LightFooter />
    </div>
  );
};

// --- APP WRAPPER ---
const App_Light = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App_Light;
