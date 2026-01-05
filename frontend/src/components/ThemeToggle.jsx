import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative group cursor-pointer outline-none select-none"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Glow Effect */}
      <div className={`
          absolute -inset-0.5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${isDark ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-cyan-400 to-blue-500'}
      `}></div>

      {/* Main Container */}
      <div className={`
          relative flex items-center justify-between gap-3 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-500
          ${isDark
          ? 'bg-[#0d1117] border-purple-500/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]'
          : 'bg-white border-blue-200 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]'
        }
      `}>

        {/* Sun Icon */}
        <motion.div
          animate={{
            scale: isDark ? 0.8 : 1,
            opacity: isDark ? 0.4 : 1,
            rotate: isDark ? -90 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-orange-400"
        >
          <Sun size={16} fill={!isDark ? "currentColor" : "none"} />
        </motion.div>

        {/* The Toggle Knob Track */}
        <div className={`
            w-10 h-5 rounded-full relative shadow-inner transition-colors duration-500
            ${isDark ? 'bg-gray-800' : 'bg-blue-100'}
        `}>
          {/* The Moving Knob */}
          <motion.div
            layout
            className={`
                    absolute top-0.5 w-4 h-4 rounded-full shadow-sm flex items-center justify-center
                    ${isDark ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]'}
                `}
            animate={{ x: isDark ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {/* Optional tiny dot in center of knob for tech feel */}
            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-blue-300'}`}></div>
          </motion.div>
        </div>

        {/* Moon Icon */}
        <motion.div
          animate={{
            scale: !isDark ? 0.8 : 1,
            opacity: !isDark ? 0.4 : 1,
            rotate: !isDark ? 90 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-purple-400"
        >
          <Moon size={16} fill={isDark ? "currentColor" : "none"} />
        </motion.div>

      </div>
    </button>
  );
};

export default ThemeToggle;
