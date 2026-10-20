
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-50 dark:bg-brand-blue-900"
      aria-hidden="true"
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(#1075BB 1px, transparent 1px), linear-gradient(90deg, #1075BB 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Subtle Radar Sweep */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] opacity-[0.02] dark:opacity-[0.04]"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, #1075BB 10deg, transparent 15deg)'
        }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-20%"],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-brand-blue-500 rounded-full"
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(4,37,61,0.1)] dark:shadow-[inset_0_0_150px_rgba(0,0,0,0.3)]" />
    </div>
  );
};

export default BackgroundAnimation;
