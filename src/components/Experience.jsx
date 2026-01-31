import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase, Calendar, MapPin, TrendingUp,
  Code2, Database, PieChart, ArrowUpRight,
  Terminal, Activity
} from "lucide-react";
import { EXPERIENCE } from "../data/portfolio";

// --- 1. Data Definition ---
const EXPERIENCES = EXPERIENCE.map((exp, index) => ({
  ...exp,
  icon: [Code2, TrendingUp, Database, PieChart][index % 4],
  color: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"][index % 4]
}));

// --- 2. Background Effects (Standardized) ---
const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })));
  }, []);

  const symbols = ['💼', '📈', '⚡', '📊', 'Code', '{}'];

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
            left: `${10 + (i * 15)}%`,
            top: `${15 + (i * 20) % 80}%`,
            animation: `bounce ${4 + i}s infinite ease-in-out`
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

// --- 3. Card Component ---
const ExperienceCard = ({ experience, index }) => {
  const Icon = experience.icon;
  const isCurrent = experience.year.toLowerCase().includes("present");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
      }}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${experience.color}15, transparent 70%)`
        }}
      />

      <div className="relative h-full p-8 rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-300 flex flex-col hover:-translate-y-1">

        {/* Header: Icon & ID */}
        <div className="flex justify-between items-start mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${experience.color}10`,
              border: `1px solid ${experience.color}30`
            }}
          >
            <Icon className="w-6 h-6" style={{ color: experience.color }} />
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-gray-500 mb-1">EXP-0{4 - index}</span>
            {isCurrent && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-bold tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* Role & Company */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
          {experience.role}
        </h3>
        <p className="text-sm font-medium text-blue-400 font-mono mb-4">
          @ {experience.company}
        </p>

        {/* Meta Row (Date/Loc) */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{experience.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {experience.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-white/20 group-hover:text-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- 4. Main Section ---
const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-24 bg-[#050505] relative overflow-hidden"
      ref={ref}
    >
      <BackgroundEffects />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">CAREER_LOG</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Experience
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A timeline of professional career.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
            />
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Activity size={14} className="text-green-500" />
            <span>TOTAL EXPERIENCE: 5+ YEARS</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ExperienceSection;