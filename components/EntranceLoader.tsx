
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface EntranceLoaderProps {
  onFinished: () => void;
}

const EntranceLoader: React.FC<EntranceLoaderProps> = ({ onFinished }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-blue-900"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.2
            }}
            className="relative"
          >
            {/* Geometric background elements for a tech/defense feel */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-brand-blue-500/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-24 border border-brand-blue-400/10 rounded-full"
            />
            
            <div className="relative z-10">
              <Logo className="w-32 h-32" textClassName="text-6xl font-black text-white ml-6" />
            </div>
          </motion.div>

          {/* Loading Bar */}
          <div className="mt-12 w-64 h-1 bg-brand-blue-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="w-full h-full bg-brand-blue-500"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-brand-blue-300 font-mono text-xs tracking-[0.2em] uppercase"
          >
            Initializing Secure Systems
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceLoader;
