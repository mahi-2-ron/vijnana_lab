import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  color?: string; // Tailwind color name e.g., 'green', 'blue'
  onClick?: () => void;
}

// Fix for Framer Motion type definitions in strict environments
const MotionDiv = motion.div as any;

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = true, 
  color = 'blue',
  onClick 
}) => {
  
  // Map color prop to specific glow classes
  const glowColors: Record<string, string> = {
    green: 'hover:shadow-green-500/30 hover:border-green-400/40',
    amber: 'hover:shadow-amber-500/30 hover:border-amber-400/40',
    red: 'hover:shadow-red-500/30 hover:border-red-400/40',
    blue: 'hover:shadow-blue-500/30 hover:border-blue-400/40',
    purple: 'hover:shadow-purple-500/30 hover:border-purple-400/40',
    gray: 'hover:shadow-gray-500/30 hover:border-gray-400/40',
    indigo: 'hover:shadow-indigo-500/30 hover:border-indigo-400/40',
    emerald: 'hover:shadow-emerald-500/30 hover:border-emerald-400/40',
    cyan: 'hover:shadow-cyan-500/30 hover:border-cyan-400/40',
    lime: 'hover:shadow-lime-500/30 hover:border-lime-400/40',
  };

  const glowClass = glowColors[color] || glowColors['gray'];

  return (
    <MotionDiv
      className={`
        glass-panel rounded-3xl p-6 transition-colors duration-300
        ${hoverEffect ? `hover:shadow-xl ${glowClass} cursor-pointer` : ''}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </MotionDiv>
  );
};

export default GlassCard;