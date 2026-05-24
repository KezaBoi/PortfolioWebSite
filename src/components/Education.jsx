import React, { useState, useEffect } from "react";
import { GraduationCap, Calendar, BookOpen, MapPin, Sparkles, ScrollText, Award } from "lucide-react";

// --- Data Definition (Embedded to prevent import errors) ---
import { EDUCATION } from "../data/portfolio";

// --- Data Definition (Embedded to prevent import errors) ---
const EDUCATION_DATA = EDUCATION.map((edu, index) => ({
  ...edu,
  type: "Degree",
  icon: index === 0 ? "master" : "bachelor"
}));

const CERTIFICATIONS_DATA = [
  {
    title: "Community Services",
    issuer: "Strategix",
    year: "2023",
    type: "Cert 3"
  }
];

// --- Background Effects ---
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

  const symbols = ['🎓', 'A+', 'Σ', '∫', '📊', '⚡'];

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

// --- Main Component ---
const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const EducationCard = ({ edu, index }) => {
    // Theme colors based on the screenshot (Gold for Distinction/Grade)
    const isMaster = edu.icon === "master";
    const themeColor = "#f59e0b"; // Amber/Gold color for icons and badges

    return (
      <div
        className={`group relative flex flex-col h-full rounded-2xl bg-[#0a0a0a] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {/* Glow Background */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${themeColor}15, transparent 70%)`
          }}
        />

        <div className="p-8 flex flex-col h-full relative z-10">

          {/* Top Row: Icon Left, Record Info Right */}
          <div className="flex justify-between items-start mb-8">
            {/* Icon Box */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${themeColor}10`, // Low opacity amber background
                border: `1px solid ${themeColor}30`,
              }}
            >
              {isMaster ? (
                <GraduationCap className="w-8 h-8 text-yellow-500" />
              ) : (
                <ScrollText className="w-8 h-8 text-yellow-200" />
              )}
            </div>

            {/* Meta Data (Record ID & Result Badge) */}
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Record: 00{index + 1}
              </span>

              {/* Result Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] text-gray-400 font-mono mr-1">GPA</div>
                <Award className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-bold text-white tracking-wide">
                  {edu.grade.includes("GPA") ? edu.grade.split(' ')[1] : "First Class" }
                </span>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {edu.degree}
          </h3>

          {/* University Name (Monospace Blue) */}
          <div className="flex items-center gap-2 mb-6">
            <ScrollText size={14} className="text-blue-500" />
            <span className="text-blue-400 font-mono text-sm tracking-tight">
              {edu.institution}
            </span>
          </div>

          {/* Date & Location Row */}
          <div className="flex items-center gap-6 mb-6 text-sm text-gray-500 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{edu.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{edu.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {edu.description}
          </p>

          {/* Core Modules (Pills) */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <BookOpen className="w-3 h-3" />
              <span>Core Modules</span>
            </div>
            <div className="flex flex-wrap gap-2">
              
              {edu.modules.map((mod, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-[11px] font-mono rounded bg-[#1a1a1a] text-gray-300 border border-white/10 hover:border-white/30 transition-colors"
                >
                  {mod}
                </span>
              ))}
            </div>
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
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">ACADEMIC_RECORDS</span>
          </div>

          {/* Title Gradient */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Education
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Academic background and continuous professional development.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION_DATA.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>

        {/* Certifications Grid */}
        <div className={`mt-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-4">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-mono tracking-wider">CERTIFICATIONS</span>
            </div>
            <h3 className="text-3xl font-bold text-white">Professional Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS_DATA.map((cert, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{cert.year}</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">{cert.type}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">{cert.title}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Badge */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 text-gray-500 text-xs font-mono bg-[#111] border border-white/10 px-6 py-2 rounded-full">
            <Sparkles size={12} className="text-yellow-500" />
            <span>CONTINUOUS LEARNING: ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;