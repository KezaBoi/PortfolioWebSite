import React, { useState, useEffect } from "react";
import { 
  Newspaper, Calendar, ArrowUpRight, Sparkles, 
  BrainCircuit, ShieldAlert, ScanFace, LineChart, 
  BookOpen, Hash
} from "lucide-react";
import { ARTICLES } from "../constants";

// --- 1. Dynamic Theme Logic ---
// Automatically assigns icons and colors based on article tags
const getArticleTheme = (tags) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("cybersecurity") || tagString.includes("security")) 
    return { icon: ShieldAlert, color: "#ef4444", label: "SECURITY" }; // Red
  
  if (tagString.includes("computer vision") || tagString.includes("facial")) 
    return { icon: ScanFace, color: "#f59e0b", label: "VISION" }; // Amber
  
  if (tagString.includes("rag") || tagString.includes("nlp") || tagString.includes("language")) 
    return { icon: BrainCircuit, color: "#8b5cf6", label: "GEN-AI" }; // Purple
  
  if (tagString.includes("analytics") || tagString.includes("data")) 
    return { icon: LineChart, color: "#3b82f6", label: "ANALYTICS" }; // Blue

  return { icon: BookOpen, color: "#10b981", label: "INSIGHT" }; // Default Green
};

// --- 2. Shared Background (Standardized) ---
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

  const symbols = ['¶', '📝', '🔒', '👁️', '⚡', '📊'];

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
const ArticlesSection = () => {
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ArticleCard = ({ article, index }) => {
    const theme = getArticleTheme(article.tags);
    const Icon = theme.icon;

    return (
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col h-full rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 cursor-pointer ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredArticle(article.title)}
        onMouseLeave={() => setHoveredArticle(null)}
      >
        {/* Glow Background */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${theme.color}15, transparent 70%)`
          }}
        />

        <div className="p-8 flex flex-col h-full relative z-10">
          
          {/* Header: Icon & Meta */}
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${theme.color}10`,
                border: `1px solid ${theme.color}30`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color: theme.color }} />
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-gray-500 mb-1">PUB-00{index + 1}</span>
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider"
                style={{
                  color: theme.color,
                  borderColor: `${theme.color}30`,
                  backgroundColor: `${theme.color}05`
                }}
              >
                {theme.label}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>

          {/* Date & Publication */}
          <div className="flex items-center gap-3 mb-4 text-xs font-mono text-gray-500">
             <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/5">
                <Calendar size={10} />
                <span>{article.date}</span>
             </div>
             <span className="text-gray-600">|</span>
             <span className={`px-2 py-0.5 rounded border border-white/10 ${article.publication === 'Medium' ? 'bg-white/10 text-white' : 'bg-blue-900/20 text-blue-400'}`}>
               {article.publication}
             </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow border-l-2 border-white/5 pl-3 group-hover:border-white/10 transition-colors">
            {article.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-[#151515] text-gray-400 border border-white/5 group-hover:border-white/10 transition-colors"
              >
                <Hash size={8} />
                {tag}
              </div>
            ))}
            {article.tags.length > 3 && (
              <span className="text-[10px] px-2 py-1 rounded bg-[#151515] text-gray-500 border border-white/5">
                +{article.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer: Read Link */}
          <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
             <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
               READ FULL ARTICLE
             </span>
             <div 
               className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 group-hover:bg-white/10"
             >
               <ArrowUpRight className="w-4 h-4 text-blue-400" />
             </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <section className="relative min-h-screen py-24 bg-[#050505] overflow-hidden text-white">
      <BackgroundEffects />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <Newspaper className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">KNOWLEDGE_BASE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Published Insights
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Technical deep dives into <span className="text-blue-400">Web Analytics</span>, <span className="text-purple-400">RAG Architectures</span>, and <span className="text-red-400">Cybersecurity</span> protocols.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ARTICLES.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <a 
             href="https://medium.com/@flintofandrew162" 
             target="_blank" 
             rel="noreferrer"
             className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-blue-500 pb-0.5 group"
          >
             <Sparkles size={14} className="text-yellow-500 group-hover:rotate-12 transition-transform" />
             <span className="text-sm font-mono">VIEW MORE ON MEDIUM</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ArticlesSection;