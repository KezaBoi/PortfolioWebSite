import React from 'react';
import {
  Home,
  Briefcase,
  Zap,
  Target,
  BookCopy,
  Mail,
} from 'lucide-react';

// Icon mapping for the new theme
const iconMap = {
  hero: Home,
  experience: Briefcase,
  skills: Zap,
  technologies: Zap, // Alias for skills
  projects: Target,
  education: BookCopy,
  contact: Mail,
};

const FloatingPillSidebar = ({ sections, activeSection, scrollToSection }) => {
  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      {/* Main container: Pill shape with white background and soft shadow */}
      <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200/80">
        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = iconMap[section.id] || Home; // Default to Home icon
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-blue-500/10'
                      : 'hover:bg-gray-200/70'
                    }
                  `}
                  title={section.label}
                  aria-label={`Navigate to ${section.label}`}
                >
                  {/* Active State Indicator: Blue dot */}
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-blue-500 scale-100'
                      : 'bg-transparent scale-0'
                    }
                  `}></div>

                  {/* Icon */}
                  <Icon
                    className={`
                      transition-colors duration-300
                      ${isActive
                        ? 'text-blue-500'
                        : 'text-gray-500 group-hover:text-gray-800'
                      }
                    `}
                    strokeWidth={1.5}
                    size={22}
                  />
                </button>

                {/* Tooltip: Simple and clean */}
                <div className="
                  absolute right-full mr-3 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  pointer-events-none
                  bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-md
                ">
                  {section.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default FloatingPillSidebar;
