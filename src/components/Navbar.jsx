import React, { useState, useEffect } from "react";
import {
  Menu, X, Github, Linkedin, Instagram, Facebook, Twitter, Terminal, Globe
} from "lucide-react";
import logo from "../assets/logo.png";
import { PERSONAL_INFO } from "../data/portfolio";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["hero", "services", "education", "experience", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Contact", href: "#contact" },
  ];

  const SOCIAL_ICONS = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
  };

  const socialLinks = Object.entries(PERSONAL_INFO.social).map(([key, href]) => ({
    icon: SOCIAL_ICONS[key.toLowerCase()] || Globe,
    href: href
  })).filter(link => link.href);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* --- Logo Area --- */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <img
              src={logo}
              width={40}
              height={40}
              alt="Logo"
              className="relative rounded-full border border-white/10"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white font-bold tracking-tight text-sm">PORTFOLIO</span>
            <span className="text-[10px] text-blue-400 font-mono tracking-widest">DEVELOPER</span>
          </div>
        </a>

        {/* --- Desktop Navigation --- */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveSection(link.href.substring(1))}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${activeSection === link.href.substring(1)
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* --- Right Side: Socials & Mobile Toggle --- */}
        <div className="flex items-center gap-6">

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
            {socialLinks.slice(0, 3).map((social, index) => { // Showing top 3 on nav to save space
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Connect Button */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-lg text-xs font-mono text-white transition-all duration-300 group"
          >
            <Terminal size={14} className="text-blue-400 group-hover:text-white" />
            <span>LET'S TALK</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#050505] z-40 transition-transform duration-300 pt-24 px-6 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-gray-300 hover:text-blue-400 hover:pl-4 transition-all duration-300 border-b border-white/5 pb-4"
            >
              {link.name}
            </a>
          ))}

          <div className="flex gap-6 mt-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;