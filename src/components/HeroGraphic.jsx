import React from 'react';

const HeroGraphic = () => {
  // Create an array for the data sparks to easily render multiple
  const sparks = Array.from({ length: 8 });

  return (
    <>
      <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
        {/* Ring 1 (Outer) - Slow, clockwise */}
        <div className="absolute h-full w-full animate-[spin_20s_linear_infinite] rounded-full border border-slate-500/30"></div>

        {/* Ring 2 (Middle) - Faster, counter-clockwise, dashed */}
        <div className="absolute h-5/6 w-5/6 animate-[spin_12s_linear_infinite_reverse] rounded-full border-2 border-dashed border-slate-500/50"></div>

        {/* Ring 3 (Inner) - Fast, clockwise */}
        <div className="absolute h-2/3 w-2/3 animate-[spin_8s_linear_infinite] rounded-full border border-cyan-400/50"></div>

        {/* Center Glowing Orb */}
        <div className="absolute h-12 w-12 rounded-full bg-cyan-400/50 shadow-[0_0_20px_4px] shadow-cyan-400/70"></div>
        <div className="absolute h-8 w-8 rounded-full bg-cyan-300"></div>

        {/* Data Sparks */}
        {sparks.map((_, i) => (
          <div
            key={i}
            className="spark absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
            style={{
              '--angle': `${i * 45}deg`,
              '--duration': `${2 + Math.random() * 2}s`,
              '--delay': `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spark-fly {
          0% {
            transform: rotate(var(--angle)) translateY(20px) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateY(150px) scale(0);
            opacity: 0;
          }
        }
        .spark {
          animation: spark-fly var(--duration) var(--delay) infinite ease-out;
        }
      `}</style>
    </>
  );
};

export default HeroGraphic;
