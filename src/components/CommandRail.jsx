import React from 'react';
import {
  Terminal,
  Briefcase,
  Zap,
  Crosshair,
  BookCopy,
  Mail,
} from 'lucide-react';

// Icon mapping based on gemini.md and logical choices
const iconMap = {
  hero: Terminal,
  experience: Briefcase,
  skills: Zap,
  technologies: Zap, // Alias for skills
  projects: Crosshair,
  education: BookCopy,
  contact: Mail,
};

const CommandRail = ({ sections, activeSection, scrollToSection }) => {
  return (
    <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      {/* Main container with glassmorphism and glowing border */}
      <div className="bg-slate-950/50 backdrop-blur-xl rounded-[10px] border border-white/10 shadow-2xl">
        {/* Use a simple div for the rectangular strip */}
        <div className="p-2 space-y-1">
          {sections.map((section, index) => {
            const Icon = iconMap[section.id] || Terminal; // Default to Terminal icon
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    group flex items-center w-full px-3 py-2.5 rounded-md transition-all duration-300
                    relative overflow-hidden
                    ${isActive
                      ? 'bg-cyan-500/10'
                      : 'hover:bg-white/10'
                    }
                  `}
                  title={section.label}
                  aria-label={`Navigate to ${section.label}`}
                >
                  {/* Active State Indicator: Glowing left border */}
                  <div className={`
                    absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300
                    ${isActive
                      ? 'bg-cyan-400 shadow-[0_0_12px_2px] shadow-cyan-500/80'
                      : 'bg-transparent'
                    }
                  `}></div>

                  {/* Numbering */}
                  <span className="text-[10px] font-mono text-slate-600 mr-2.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon with glowing effect for active state */}
                  <Icon
                    className={`
                      transition-all duration-300
                      ${isActive
                        ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                        : 'text-slate-400 group-hover:text-white'
                      }
                    `}
                    strokeWidth={1.5}
                    size={20}
                  />
                </button>

                {/* Tooltip: Code hint style */}
                <div className="
                  absolute left-full ml-4 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  pointer-events-none
                  bg-slate-900/80 border border-white/10 rounded-md px-3 py-1.5
                  backdrop-blur-sm shadow-lg
                ">
                  <p className="font-mono text-xs text-cyan-400 whitespace-nowrap">
                    <span className="text-slate-500">//</span> {section.label.toUpperCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CommandRail;
