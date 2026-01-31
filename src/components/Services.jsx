import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase, LineChart, Bot, BrainCircuit, Database,
  Globe, Presentation, TrendingUp, Code2, Sparkles, ArrowRight
} from "lucide-react";
import { SERVICES } from "../data/portfolio";

// --- 1. Data Definition (Embedded for stability & custom icons) ---
// --- 1. Data Definition (Embedded for stability & custom icons) ---
const ICON_MAP = {
  "Globe": Globe,
  "LineChart": LineChart,
  "BrainCircuit": BrainCircuit,
  "Database": Database,
  "Presentation": Presentation,
  "TrendingUp": TrendingUp,
  "Bot": Bot,
  "Code2": Code2
};

const SERVICES_DATA = SERVICES.map(service => ({
  ...service,
  icon: ICON_MAP[service.icon] || Globe
}));

// --- 2. Shared Background (Matches Experience/Education) ---
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

  const symbols = ['$', '€', '£', '∑', '📈', '🤖', '⚡', '📊'];

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

// --- 3. Main Component ---
const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredService, setHoveredService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extract categories
  const categories = useMemo(() => [
    "All", ...new Set(SERVICES_DATA.map(s => s.category))
  ], []);

  // Filter logic
  const filteredServices = useMemo(() => {
    return selectedCategory === "All"
      ? SERVICES_DATA
      : SERVICES_DATA.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Card Component
  const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;
    const bullets = service.description
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace('-', '').trim());

    // Extract main description (before bullets)
    const mainDesc = service.description.split('\n')[0];

    return (
      <div
        className={`group relative flex flex-col h-full rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredService(service.title)}
        onMouseLeave={() => setHoveredService(null)}
      >
        {/* Glow Background */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`
          }}
        />

        <div className="p-8 flex flex-col h-full relative z-10">

          {/* Header: Icon & Category */}
          <div className="flex justify-between items-start mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${service.color}10`,
                border: `1px solid ${service.color}30`,
                boxShadow: `0 0 15px ${service.color}20`
              }}
            >
              <Icon className="w-7 h-7" style={{ color: service.color }} />
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-gray-500 mb-1">SVC-{index + 1}</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded border tracking-wider"
                style={{
                  color: service.color,
                  borderColor: `${service.color}30`,
                  backgroundColor: `${service.color}05`
                }}
              >
                {service.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
            {service.title}
          </h3>

          {/* Main Description */}
          <p className="text-gray-400 text-sm mb-4">
            {mainDesc}
          </p>

          {/* Bullet Points */}
          <ul className="space-y-2 mb-6 flex-grow">
            {bullets.map((point, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-blue-500/50" />
                {point}
              </li>
            ))}
          </ul>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AVAILABLE
            </div>
            <button className="text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 text-white">
              REQUEST
              <ArrowRight size={14} className="text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen py-24 bg-[#050505] overflow-hidden text-white">
      <BackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">SERVICE_CATALOG</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Expert Solutions
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Providing bespoke software solutions, cloud architecture, and data analytics
            to drive digital transformation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-mono bg-white/5 border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
            <Sparkles size={14} className="text-yellow-500" />
            <span>OPEN FOR CONSULTATION & FREELANCE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;