import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Download, Github, Linkedin, Mail, Twitter,
  Terminal, Cpu, Database, ShieldCheck, Calendar
} from "lucide-react";
import { HERO_CONTENT, PERSONAL_INFO } from "../data/portfolio";
import profilePic from "../assets/profile.png";

const STAT_ICONS = [Calendar, Cpu, ShieldCheck];

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

// --- 2. Shared Background ---
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

  const symbols = ['$', '∑', '⚡', '🤖', '📊'];

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
            left: `${10 + (i * 18)}%`,
            top: `${15 + (i * 15) % 80}%`,
            animation: `bounce ${4 + i}s infinite ease-in-out`
          }}
        >
          {sym}
        </div>
      ))}
    </div>
  );
};

// --- 3. Typing Effect Component ---
const Typewriter = ({ phrases }) => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        setCurrentPhrase(current.substring(0, currentPhrase.length - 1));
      } else {
        setCurrentPhrase(current.substring(0, currentPhrase.length + 1));
      }

      if (!isDeleting && currentPhrase === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentPhrase === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, phraseIndex, phrases]);

  return (
    <div className="font-mono text-sm md:text-base text-blue-400 min-h-[24px]">
      <span className="text-gray-500 mr-2">$</span>
      {currentPhrase}
      <span className="animate-pulse inline-block w-2 h-4 bg-blue-500 ml-1 align-middle" />
    </div>
  );
};

// --- 4. Main Hero Component ---
const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      <BackgroundEffects />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* --- Left Column: Content (7 Cols) --- */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >

            {/* Badge & Typewriter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">SYSTEM ONLINE: TRADING ALGORITHMS ACTIVE</span>
              </div>
              <Typewriter phrases={HERO_CONTENT.taglines} />
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                {HERO_CONTENT.greeting} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  {HERO_CONTENT.name}
                </span>
              </h1>
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl border-l-2 border-blue-500/30 pl-6"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo("/projects")}
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg overflow-hidden transition-all shadow-lg shadow-blue-900/20"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  VIEW WORK <ArrowRight size={18} />
                </span>
              </button>

              <button
                onClick={() => navigateTo("/contact")}
                className="px-8 py-4 border border-white/10 hover:border-white/30 hover:bg-white/5 text-white font-bold rounded-lg transition-all flex items-center gap-2"
              >
                CONTACT ME
              </button>

              <a
                href={PERSONAL_INFO.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-gray-300 hover:text-purple-400 rounded-lg transition-all flex items-center justify-center"
                title="Download Resume"
              >
                <Download size={20} />
              </a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6"
            >
              {HERO_CONTENT.stats.map((stat, i) => {
                const Icon = STAT_ICONS[i % STAT_ICONS.length];
                return (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl backdrop-blur-sm hover:border-blue-500/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-6 pt-4">
              {[
                { icon: Github, href: PERSONAL_INFO.social.github },
                { icon: Linkedin, href: PERSONAL_INFO.social.linkedin },
                { icon: Twitter, href: PERSONAL_INFO.social.twitter },
                { icon: Mail, href: `mailto:${PERSONAL_INFO.email}` }
              ].map((social, i) => {
                const Icon = social.icon;
                if (!social.href) return null; // Skip if no link
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </motion.div>

          </motion.div>

          {/* --- Right Column: Image (5 Cols) --- */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Animated Glow Ring */}
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 rounded-full border border-blue-500/20" />
              <div className="absolute inset-4 rounded-full border border-purple-500/20" />

              {/* Rotating Elements */}
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-b-2 border-l-2 border-purple-500/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile Image */}
              <div className="absolute inset-6 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-800 shadow-2xl">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
              </div>

              {/* Floating Orbiting Icons (UPDATED: Z-index & Visibility) */}
              <motion.div
                className="absolute -top-6 left-1/2 z-20 p-3 bg-slate-900 border border-white/20 rounded-full shadow-lg shadow-green-500/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Terminal size={20} className="text-green-400" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 z-20 p-3 bg-slate-900 border border-white/20 rounded-full shadow-lg shadow-blue-500/20"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Database size={20} className="text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;