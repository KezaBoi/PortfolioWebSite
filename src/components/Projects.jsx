import React, { useState, useEffect } from 'react';
import { FolderGit2, ExternalLink, Code2, Github, ArrowUpRight, Terminal } from "lucide-react";
import { PROJECTS } from "../constants";


// --- 1. Shared Background (Matches Tech & Experience) ---
const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })));
  }, []);

  const symbols = ['$', '₿', 'AI', '⚡', '💻', '📈', '🛡️', '{}'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-500/20 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s infinite linear`,
            animationDelay: `-${p.delay}s`
          }}
        />
      ))}

      {symbols.map((sym, i) => (
        <div
          key={i}
          className="absolute text-white/5 font-mono text-xl font-bold select-none"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (i * 15) % 80}%`,
            animation: `bounce ${3 + i}s infinite ease-in-out`
          }}
        >
          {sym}
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

// --- 2. Color & Icon Logic ---
const getProjectTheme = (title) => {
  if (title.includes("AI") || title.includes("Machine") || title.includes("Neural"))
    return { color: "#8b5cf6", icon: "🧠", type: "AI MODEL" };
  if (title.includes("Data") || title.includes("Analysis") || title.includes("Fin"))
    return { color: "#10b981", icon: "📊", type: "ANALYTICS" };
  if (title.includes("Web") || title.includes("App") || title.includes("Port"))
    return { color: "#3b82f6", icon: "💻", type: "FULL STACK" };
  if (title.includes("API") || title.includes("Backend") || title.includes("Scrape"))
    return { color: "#f59e0b", icon: "⚙️", type: "SYSTEM" };
  if (title.includes("CLI"))
    return { color: "#f59e0b", icon: ">_", type: "Command Line" };
  return { color: "#6366f1", icon: "🚀", type: "PROJECT" };
};

// --- 3. Main Projects Component ---
const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ProjectCard = ({ project, index }) => {
    const theme = getProjectTheme(project.title);

    return (
      <div
        className={`group relative flex flex-col h-full rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredProject(project.title)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Glow Background Effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)`
          }}
        />

        <div className="p-8 flex flex-col h-full relative z-10">
          {/* Header: Icon + Meta */}
          <div className="flex justify-between items-start mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${project.color}10`,
                border: `1px solid ${project.color}30`,
                boxShadow: `0 0 20px ${project.color}20`
              }}
            >
              <project.icon color={project.color}/>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-gray-500 mb-1">ID: 00{index + 1}</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded border tracking-wider"
                style={{
                  color: project.color,
                  borderColor: `${project.color}30`,
                  backgroundColor: `${project.color}10`
                }}
              >
                {project.type}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow border-l-2 border-white/5 pl-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-[11px] font-mono text-gray-300 bg-white/5 rounded hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer: Links */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <Terminal size={12} />
              <span>STATUS: ACTIVE</span>
            </div>

            <div className="flex gap-3">
              {/* Optional: Add GitHub link logic if needed */}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group/link"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              ) : (
                <span className="text-xs text-gray-600 flex items-center gap-2 cursor-not-allowed">
                  <Code2 size={14} /> Private Repo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 bg-[#050505] overflow-hidden text-white">
      <BackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">PROJECT_DIRECTORY</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Featured Projects
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience with a range of mediums, from embedded systems to fullstack web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-blue-500/50 to-purple-500/50">
            <a
              href="https://github.com/KezaBoi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0a0a0a] rounded-full text-white hover:bg-[#1a1a1a] transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
              <span className="font-semibold">Explore Full Portfolio on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;