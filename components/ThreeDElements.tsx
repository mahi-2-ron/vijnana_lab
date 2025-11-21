
import React from 'react';
import { motion } from 'framer-motion';

// Fix for Framer Motion type definitions
const MotionDiv = motion.div as any;

export const Atom3D: React.FC = () => {
  return (
    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Core Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full animate-pulse"></div>
      
      {/* Nucleus */}
      <MotionDiv 
        className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.6)] z-20 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
         <div className="absolute inset-0 bg-white/20 blur-lg rounded-full"></div>
         <div className="w-full h-full rounded-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
      </MotionDiv>

      {/* Electron Shell 1 */}
      <MotionDiv
        className="absolute w-full h-full border border-cyan-400/40 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: 0 }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] blur-[1px]"></div>
      </MotionDiv>

      {/* Electron Shell 2 */}
      <MotionDiv
        className="absolute w-full h-full border border-purple-400/40 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: 60 }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-300 rounded-full shadow-[0_0_20px_rgba(192,132,252,1)] blur-[1px]"></div>
      </MotionDiv>

      {/* Electron Shell 3 */}
      <MotionDiv
        className="absolute w-full h-full border border-pink-400/40 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: -60 }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-300 rounded-full shadow-[0_0_20px_rgba(244,114,182,1)] blur-[1px]"></div>
      </MotionDiv>
    </div>
  );
};

export const FloatingFloatingElement: React.FC<{ 
    delay?: number, 
    x?: number, 
    y?: number, 
    children: React.ReactNode,
    className?: string 
}> = ({ delay = 0, x = 20, y = 20, children, className }) => {
    return (
        <MotionDiv
            className={`absolute ${className}`}
            animate={{ y: [0, -y, 0], x: [0, x, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, delay: delay, repeat: Infinity, ease: "easeInOut" }}
        >
            {children}
        </MotionDiv>
    )
}
