import { useEffect, useState, useCallback, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Contact from "./components/Contact"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Services from "./components/Services"
import Technologies from "./components/Technologies"
import Blog from "./components/Blog"
import Navbar from "./components/Navbar"
import { PERSONAL_INFO, HERO_CONTENT } from './data/portfolio'

// Professional Navbar Component
const ProfessionalNavbar = ({ sections, activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
      : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform duration-300">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-xl">{PERSONAL_INFO.name}</div>
                <div className="text-cyan-400 text-sm font-medium tracking-wide">{HERO_CONTENT.taglines[0]}</div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {sections.slice(0, 6).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${activeSection === section.id
                  ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 border border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:border hover:border-cyan-400/20'
                  } backdrop-blur-sm`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={PERSONAL_INFO.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-cyan-400/50 text-cyan-300 font-medium rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Resume
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? 'max-h-96 opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="py-4 space-y-2 border-t border-white/10">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeSection === section.id
                  ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 border border-cyan-400/50'
                  : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10'
                  }`}
              >
                <span className="mr-3">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

const AppContent = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const isNavigatingRef = useRef(false)
  const lastManualNavigationRef = useRef(0)

  // Professional page ordering - following industry best practices
  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠', path: '/', priority: 'high' },
    { id: 'experience', label: 'Experience', icon: '💼', path: '/experience', priority: 'high' },
    { id: 'technologies', label: 'Skills', icon: '⚡', path: '/skills', priority: 'high' },
    { id: 'projects', label: 'Projects', icon: '🎯', path: '/projects', priority: 'high' },
    { id: 'education', label: 'Education', icon: '🎓', path: '/education', priority: 'medium' },
    { id: 'services', label: 'Services', icon: '🚀', path: '/services', priority: 'medium' },
    { id: 'blog', label: 'Blog', icon: '📝', path: '/blog', priority: 'low' },
    { id: 'contact', label: 'Contact', icon: '📧', path: '/contact', priority: 'high' }
  ]

  // Map paths to section IDs
  const pathToSection = {
    '/': 'hero',
    '/experience': 'experience',
    '/skills': 'technologies',
    '/projects': 'projects',
    '/education': 'education',
    '/services': 'services',
    '/blog': 'blog',
    '/contact': 'contact'
  }

  // Loading simulation and mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Enhanced URL handling with preloading hints
  useEffect(() => {
    const sectionId = pathToSection[location.pathname]
    if (sectionId && sectionId !== activeSection) {
      setActiveSection(sectionId)

      // Update document title professionally
      const section = sections.find(s => s.id === sectionId)
      if (section && section.id !== 'hero') {
        document.title = `${section.label} - ${PERSONAL_INFO.name}`
      } else {
        document.title = `${PERSONAL_INFO.name} - Portfolio`
      }

      // Preload next section content
      const currentIndex = sections.findIndex(s => s.id === sectionId)
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1]
        // Hint to browser about next likely navigation
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = nextSection.path
        document.head.appendChild(link)
      }

      if (isNavigatingRef.current) {
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
          setTimeout(() => {
            isNavigatingRef.current = false
          }, 100)
        }, 100)
      }
    }
  }, [location.pathname, activeSection, sections])

  // Enhanced scroll tracking with performance optimizations
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setShowScrollTop(currentScrollY > 400)

    const timeSinceLastNavigation = Date.now() - lastManualNavigationRef.current
    if (isNavigatingRef.current || timeSinceLastNavigation < 1000) {
      return
    }

    // Optimized section detection
    const viewportHeight = window.innerHeight
    const sectionElements = sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null

      const rect = element.getBoundingClientRect()
      return {
        element,
        id: section.id,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        visibility: Math.max(0, Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top)) / viewportHeight
      }
    }).filter(Boolean)

    // Find section with highest visibility ratio
    const current = sectionElements.reduce((best, section) => {
      return section.visibility > (best?.visibility || 0) ? section : best
    }, null)

    if (current && current.id !== activeSection) {
      setActiveSection(current.id)

      const newSection = sections.find(s => s.id === current.id)
      if (newSection && location.pathname !== newSection.path && timeSinceLastNavigation > 2000) {
        navigate(newSection.path, { replace: true })
      }
    }
  }, [sections, activeSection, navigate, location.pathname])

  // Throttled scroll listener with RAF
  useEffect(() => {
    let ticking = false

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [handleScroll])

  // Professional section navigation with analytics tracking
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    const section = sections.find(s => s.id === sectionId)

    if (element && section) {
      // Analytics tracking (replace with your analytics service)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation', {
          'section': sectionId,
          'method': 'nav_click'
        })
      }

      isNavigatingRef.current = true
      lastManualNavigationRef.current = Date.now()

      navigate(section.path)
      setActiveSection(sectionId)

      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 50)
    }
  }, [navigate, sections])

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center z-50">      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mb-6 mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-lg font-semibold">{PERSONAL_INFO.name}</p>
          <p className="text-white/60 text-sm">Loading Portfolio...</p>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-neutral-100 antialiased">
      {/* Enhanced Background with Professional Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#020202]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Professional Navbar */}
      <ProfessionalNavbar
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />



      {/* Main Content with Professional Structure */}
      <div className="flex flex-col min-h-screen pt-16">
        <main className={`flex-1 ${isMobile ? 'pb-24' : 'pb-32'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Routes>
              <Route path="*" element={
                <>
                  {sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className={`relative ${section.id === 'hero'
                        ? 'min-h-screen flex items-center justify-center'
                        : 'py-20 min-h-[80vh] flex items-center justify-center'
                        } scroll-mt-20`}
                      data-section={section.id}
                      data-priority={section.priority}
                    >
                      {/* Professional Section Header */}
                      {section.id !== 'hero' && (
                        <div className="absolute left-0 right-0 top-8">
                          <div className="flex items-center justify-center mb-8">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
                            <div className="mx-4 text-xs text-white/40 font-mono bg-black/20 px-3 py-1 rounded-full border border-white/10">
                              {String(index + 1).padStart(2, '0')} / {sections.length.toString().padStart(2, '0')}
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
                          </div>
                        </div>
                      )}

                      {/* Section Content with Professional Wrapper */}
                      <div className="w-full relative">
                        {/* Professional section background effect */}
                        {section.priority === 'high' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 to-purple-500/2 rounded-3xl -mx-8 -my-8 border border-white/5"></div>
                        )}

                        <div className="relative z-10">
                          {section.id === 'hero' && <Hero />}
                          {section.id === 'experience' && <Experience />}
                          {section.id === 'technologies' && <Technologies />}
                          {section.id === 'projects' && <Projects />}
                          {section.id === 'education' && <Education />}
                          {section.id === 'services' && <Services />}
                          {section.id === 'blog' && <Blog />}
                          {section.id === 'contact' && <Contact />}
                        </div>
                      </div>
                    </section>
                  ))}
                </>
              } />
            </Routes>
          </div>
        </main>
      </div>

      {/* Professional Footer */}
      <footer className={`${isMobile
        ? 'relative bg-black/90 border-t border-white/10 backdrop-blur-xl'
        : 'fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-black/80 backdrop-blur-xl'
        }`}>
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        )}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <Footer />
        </div>
      </footer>

      {/* Enhanced Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed ${isMobile ? 'bottom-28 right-4' : 'bottom-20 right-6'
          } z-40 transition-all duration-300 transform ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-3 rounded-full hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 border border-white/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </button>

      {/* Professional Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 transition-all duration-300 shadow-lg"
          style={{
            width: `${Math.min(100, (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        ></div>
      </div>

      {/* Professional Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-3">
            {/* Primary navigation - high priority sections */}
            <div className="flex justify-between items-center max-w-sm mx-auto mb-2">
              {sections.filter(s => s.priority === 'high').slice(0, 4).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg scale-105'
                    : 'hover:bg-white/5 hover:scale-105'
                    }`}
                  aria-label={`Navigate to ${section.label}`}
                >
                  <span className="text-lg mb-1">{section.icon}</span>
                  <span className={`text-xs font-medium truncate w-full text-center ${activeSection === section.id
                    ? 'text-cyan-300'
                    : 'text-white/70'
                    }`}>
                    {section.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Secondary navigation - remaining sections */}
            <div className="flex justify-center items-center max-w-xs mx-auto">
              {sections.filter(s => s.priority !== 'high' || sections.filter(sec => sec.priority === 'high').indexOf(s) >= 4).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg'
                    : 'hover:bg-white/5'
                    }`}
                  aria-label={`Navigate to ${section.label}`}
                >
                  <span className="text-sm mb-1">{section.icon}</span>
                  <span className={`text-xs font-medium truncate w-full text-center ${activeSection === section.id
                    ? 'text-cyan-300'
                    : 'text-white/60'
                    }`}>
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Styles */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Professional scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4, #8b5cf6);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #0891b2, #7c3aed);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }
        
        /* Professional focus styles */
        *:focus-visible {
          outline: 2px solid rgba(6,182,212,0.6);
          outline-offset: 2px;
          border-radius: 6px;
        }
        
        /* Grid background pattern */
        .bg-grid-white\/\[0\.02\] {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
        
        /* Professional animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        /* Mobile optimizations */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .mobile-nav-safe {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        
        @media screen and (max-width: 1024px) {
          input, select, textarea {
            font-size: 16px;
          }
        }
        
        /* Performance optimizations */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App