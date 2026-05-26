import React from 'react';
import {
  Github, Linkedin, Mail, ShieldCheck, Terminal
} from "lucide-react";

import { PERSONAL_INFO } from "../data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#020202] border-t border-white/10 py-3">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left: Copyright & Status */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2 text-white/80">
            <Terminal size={14} className="text-cyan-500" />
            <span className="font-semibold tracking-tight">{PERSONAL_INFO.name}</span>
          </div>
          <span className="hidden sm:inline text-gray-700">|</span>
          <span>© {currentYear}</span>
          <span className="hidden sm:inline text-gray-700">|</span>
          <div className="flex items-center gap-1.5 text-green-500/80">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="tracking-wider">SYSTEM ONLINE</span>
          </div>
          <span className="hidden sm:inline text-gray-700">|</span>
          <div className="text-gray-500 hover:text-cyan-400 transition-colors">
            <a href={'https://github.com/Anju982/PortfolioWebSite'} target='_blank'>
              <span className="tracking-wider" >UI CREDIT: Anjana Urulugastenna</span>
            </a>
          </div>
        </div>

        {/* Right: Connect */}
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: PERSONAL_INFO.social.github },
            // { icon: Linkedin, href: PERSONAL_INFO.social.linkedin },
            { icon: Mail, href: `mailto:${PERSONAL_INFO.email}` }
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;