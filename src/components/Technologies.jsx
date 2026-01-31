import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import resume from "../assets/resume.pdf";
import { TECHNOLOGIES } from "../data/portfolio";

// --- 1. Icon System (Updated with new Tech) ---
const TechIcon = ({ type, color }) => {
  const icons = {
    // Quant & Finance
    python: "🐍",
    quantlib: "📈",
    trading: "📊",
    risk: "⚖️",
    finance: "💰",
    bloomberg: "💼",

    // AI & GenAI (New)
    openai: "🤖",
    tensorflow: "🧠",
    pytorch: "🔥",
    huggingface: "🤗",
    gemini: "✨",      // Google Gem
    notebooklm: "📓",  // NotebookLM
    neural: "🕸️",
    sklearn: "📉",

    // Cloud & DevOps (New)
    aws: "☁️",        // AWS
    gcp: "🔷",
    cloudflare: "🛡️", // Cloudflare
    docker: "🐳",
    kubernetes: "☸️",
    linux: "💻",

    // OS & Systems
    linux: "💻",
    ubuntu: "🐧",

    // Data & Backend
    numpy: "🔢",
    pandas: "🐼",
    tableau: "📊",
    d3: "📈",
    spark: "⚡",
    kafka: "📡",
    react: "⚛️",
    nodejs: "🟢",
    dotnet: "⚡",
    fastapi: "🚀",
    selenium: "🕷️",   // Web Scraping

    // Databases
    mysql: "🗄️",
    mongodb: "🍃",
    snowflake: "❄️",

    // Security
    kali: "🐉",
    osint: "🔍",
    wireguard: "🔒",

    // DevOps
    terraform: "🏗️",
    azure: "🟦",
    airflow: "🌬️",

    // BI & Visualization

    // BI & Visualization
    powerbi: "📊",
    matplotlib: "📉",
    seaborn: "🌊",

    // Advanced ML
    xgboost: "🚀",
    nltk: "📝",

    // Frameworks
    langchain: "🦜",
    streamlit: "👑",
    angular: "🅰️",
  };

  return (
    <div
      className="text-5xl md:text-6xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2"
      style={{
        filter: `drop-shadow(0 0 15px ${color}50)`,
        textShadow: `0 0 20px ${color}30`
      }}
    >
      {icons[type] || "⚙️"}
    </div>
  );
};

// --- 2. Background Effects (Matches Hero Section) ---
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

  // Floating Symbols (Finance & Tech mixed)
  const symbols = ['$', '₿', 'AI', '∫', '∑', '⚡', '☁️', '🛡️'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black" />

      {/* Animated Particles */}
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

      {/* Floating Code Symbols */}
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

// --- 3. Main Component ---
const TechnologiesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Navigation Logic
  const navigateToProjects = () => {
    navigate('/projects');
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const downloadResume = () => {
    // const link = document.createElement('a');
    // link.href = resume;
    // link.download = 'resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    alert("Resume download disabled in template.");
  };

  // --- Data Definition (Updated) ---
  const technologies = useMemo(() => TECHNOLOGIES, []);

  const categories = useMemo(() => ["All", ...new Set(technologies.map(t => t.category))], [technologies]);

  const filteredTechnologies = useMemo(() => {
    return selectedCategory === "All"
      ? technologies
      : technologies.filter(tech => tech.category === selectedCategory);
  }, [technologies, selectedCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-[#050505] text-white">
      <BackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* --- Section Header --- */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <span className="text-blue-400 text-sm font-mono tracking-wider">SYSTEM_CAPABILITIES</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Technology Stack
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive arsenal of tools specializing in <span className="text-blue-400">Quantitative Finance</span>,
            <span className="text-purple-400"> Generative AI</span>, and secure <span className="text-green-400">Cloud Infrastructure</span>.
          </p>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${selectedCategory === category
                ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- Tech Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={tech.label}
              onMouseEnter={() => setHoveredTech(tech.label)}
              onMouseLeave={() => setHoveredTech(null)}
              className={`group relative p-6 rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Dynamic Glow Border on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 20px ${tech.color}15, 0 0 20px ${tech.color}10`
                }}
              />

              <div className="flex flex-col items-center relative z-10">
                {/* Icon */}
                <div className="mb-6 p-4 rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition-all duration-300">
                  <TechIcon type={tech.icon} color={tech.color} />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {tech.label}
                </h3>
                <span className="text-xs text-gray-500 font-mono mb-4 px-2 py-1 rounded bg-white/5">
                  {tech.category}
                </span>

                {/* HUD Style Progress Bar */}
                <div className="w-full mt-2">
                  <div className="flex justify-between text-xs mb-1.5 text-gray-500 font-mono">
                    <span>MASTERY</span>
                    <span style={{ color: tech.color }}>{tech.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out relative"
                      style={{
                        width: isVisible ? `${tech.level}%` : '0%',
                        backgroundColor: tech.color,
                        boxShadow: `0 0 10px ${tech.color}`
                      }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer / CTA --- */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex gap-4 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
            <button
              onClick={navigateToProjects}
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-900/50"
            >
              View Projects
            </button>
            <button
              onClick={downloadResume}
              className="px-8 py-3 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Download CV
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnologiesSection;