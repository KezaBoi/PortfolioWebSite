import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  MessageSquare, Calendar, Terminal, ArrowRight,
  Globe, ShieldCheck, Wifi
} from "lucide-react";
import { CONTACT } from "../constants";

// --- 1. Shared Background (Standardized) ---
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

  const symbols = ['@', '📞', '📍', '🤝', '⚡', '✉️', '🌐'];

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

// --- 2. Main Component ---
const Contact = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- Handlers ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Network Request
    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  // --- Data Configuration ---
  const contactMethods = [
    {
      id: "C-01",
      title: "Email",
      value: CONTACT.email,
      icon: Mail,
      color: "#3b82f6", // Blue
      link: `mailto:${CONTACT.email}`,
      desc: "Direct encryption channel"
    },
    {
      id: "C-02",
      title: "Phone",
      value: CONTACT.phoneNo,
      icon: Phone,
      color: "#10b981", // Green
      link: `tel:${CONTACT.phoneNo}`,
      desc: "Voice communication line"
    },
    // {
    //   id: "C-03",
    //   title: "HQ Location",
    //   value: "Colombo, Sri Lanka", // Simplified from address for card
    //   icon: MapPin,
    //   color: "#8b5cf6", // Purple
    //   link: null,
    //   desc: "Geospatial coordinates"
    // }
  ];

  return (
    <section className="relative min-h-screen py-24 bg-[#050505] overflow-hidden text-white">
      <BackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* --- Header --- */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
            <Wifi className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-mono tracking-wider">Signals: ONLINE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Initiate Contact
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to deploy algorithmic strategies or discuss FinTech architecture?
            Open a secure channel below.
          </p>
        </div>

        {/* --- Contact Channels (Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                className={`group relative flex flex-col p-6 rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(method.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow Background */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${method.color}15, transparent 70%)`
                  }}
                />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${method.color}15`, border: `1px solid ${method.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: method.color }} />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500">{method.id}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mb-4">{method.desc}</p>
                  <p className="text-sm text-gray-300 font-medium break-words">
                    {method.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* --- Social Network Nodes --- */}
        <div className={`flex justify-center gap-6 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: Github, href: "https://github.com/KezaBoi", color: "#fff" },
            // { icon: Linkedin, href: "https://linkedin.com", color: "#0077b5" },
            // { icon: Globe, href: "https://medium.com", color: "#10b981" }
          ].map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 20px ${social.color}40` }} />
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors relative z-10" />
              </a>
            );
          })}
        </div>

        <div className="text-center mt-8 text-xs font-mono text-gray-600">
          <p>EST. 2026 • SECURE CONNECTION ESTABLISHED</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;