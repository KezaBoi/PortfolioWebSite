import React from 'react';

const CyberBackground = () => {
  return (
    <>
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-950">
        {/* Base Radial Gradient */}
        <div className="absolute inset-0 -z-40 h-full w-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900 to-black"></div>

        {/* CSS Grid Pattern */}
        <div
          className="absolute inset-0 -z-30 h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0A0F21 1px, transparent 1px), linear-gradient(to bottom, #0A0F21 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        {/* Vignette Mask */}
        <div
          className="absolute inset-0 -z-20 h-full w-full"
          style={{
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
          }}
        ></div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Cyan Orb */}
          <div className="orb-1 absolute -top-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-cyan-400/20 opacity-50 blur-3xl filter"></div>
          {/* Blue Orb */}
          <div className="orb-2 absolute -bottom-1/4 right-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/20 opacity-50 blur-3xl filter"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes move-orb-1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(100px, 50px) scale(1.2);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes move-orb-2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-100px, -50px) scale(0.8);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .orb-1 {
          animation: move-orb-1 20s infinite alternate ease-in-out;
        }
        .orb-2 {
          animation: move-orb-2 25s infinite alternate ease-in-out;
        }
      `}</style>
    </>
  );
};

export default CyberBackground;
