import { useEffect, useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { PERSONAL_INFO, HERO_CONTENT } from './data/portfolio';

// --- HELPER DATA & COMPONENTS (Defined in-file for self-containment) ---

const sections = [
  { id: 'hero', label: 'Home', icon: '🏠', path: '/' },
  { id: 'experience', label: 'Experience', icon: '💼', path: '/experience' },
  { id: 'skills', label: 'Skills', icon: '⚡', path: '/skills' },
  { id: 'projects', label: 'Projects', icon: '🎯', path: '/projects' },
  { id: 'education', label: 'Education', icon: '🎓', path: '/education' },
  { id: 'contact', label: 'Contact', icon: '📧', path: '/contact' },
];

const pathToSection = sections.reduce((acc, section) => {
  acc[section.path] = section.id;
  return acc;
}, {});

// Placeholder components for sections
const Hero = () => (
  <div className="text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 pb-4">
      {PERSONAL_INFO.name}
    </h1>
    <p className="text-xl md:text-2xl text-neutral-300">
      {HERO_CONTENT.taglines[0]}
    </p>
    <div className="mt-8 flex justify-center gap-4">
      <a
        href="#contact"
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
      >
        Let's Talk
      </a>
      <a
        href={PERSONAL_INFO.resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 border border-cyan-400/50 text-cyan-300 font-medium rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
      >
        View Resume
      </a>
    </div>
  </div>
);

const Experience = () => <h2 className="text-4xl font-bold text-center text-neutral-100 tracking-tight">Work Experience</h2>;
const Projects = () => <h2 className="text-4xl font-bold text-center text-neutral-100 tracking-tight">Projects</h2>;
const Education = () => <h2 className="text-4xl font-bold text-center text-neutral-100 tracking-tight">Education</h2>;
const Contact = () => <h2 className="text-4xl font-bold text-center text-neutral-100 tracking-tight">Contact Me</h2>;

// --- NEW SKILLS GRID COMPONENT ---
const SkillsGrid = () => {
  const skills = [
    { name: '.NET', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
    { name: 'QuantLib', category: 'Quant' },
    { name: 'SQL', category: 'Data' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'C#', category: 'Backend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center text-neutral-100 tracking-tight mb-12">
        Core Technologies & Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all duration-300 hover:bg-neutral-800/70 hover:scale-105 hover:border-cyan-400/50"
          >
            <p className="text-lg font-semibold text-neutral-100">{skill.name}</p>
            <p className="text-sm text-cyan-400 font-mono mt-1">{skill.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- REFACTORED NAVBAR ---
const DarkDataNavbar = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform duration-300">A</div>
            <span className="hidden sm:block text-xl font-bold text-neutral-100">{PERSONAL_INFO.name}</span>
          </button>

          <div className="hidden lg:flex items-center space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${activeSection === section.id
                    ? 'text-cyan-300 bg-cyan-500/10'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:block px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Let's Talk
            </a>
            <button
              className="lg:hidden p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-neutral-800">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 ${activeSection === section.id ? 'text-cyan-300 bg-cyan-500/10' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

// --- REFACTORED FOOTER ---
const DarkDataFooter = () => (
  <footer className="border-t border-neutral-800 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-neutral-400">
      <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.</p>
      <p className="text-sm mt-2">Built with React & Tailwind CSS. Inspired by the Dark Data Theme.</p>
    </div>
  </footer>
);


// --- MAIN APP CONTENT ---
const AppContent = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);

  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let currentSection = 'hero';

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element && scrollPosition >= element.offsetTop) {
        currentSection = section.id;
      }
    }

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
      const newPath = sections.find(s => s.id === currentSection)?.path;
      if (newPath && location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [activeSection, location.pathname, navigate]);

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

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // Prevent scroll handler from firing during smooth scroll
    }
  }, [navigate]);

  const sectionComponents = {
    hero: <Hero />,
    experience: <Experience />,
    skills: <SkillsGrid />,
    projects: <Projects />,
    education: <Education />,
    contact: <Contact />,
  };

  return (
    <div className="bg-slate-950 text-neutral-100 antialiased">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>

      <DarkDataNavbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex flex-col justify-center py-20 md:py-28 scroll-mt-16"
          >
            {sectionComponents[section.id]}
          </section>
        ))}
      </main>

      <DarkDataFooter />
    </div>
  );
};

// --- APP WRAPPER ---
const App_Redesigned = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App_Redesigned;
