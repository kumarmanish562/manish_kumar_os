import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = usePortfolio();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative group select-none outline-none cursor-pointer"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* 1. Outer Neon Aura (Glow Effect) */}
      <div
        className={`
          absolute -inset-1 rounded-full blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-75
          ${isDark
            ? "bg-gradient-to-r from-purple-600 to-pink-600"
            : "bg-gradient-to-r from-cyan-400 to-blue-500"
          }
        `}
      />

      {/* 2. Main Capsule Container */}
      <div
        className={`
          relative flex items-center gap-2 px-2 py-1.5 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500
          ${isDark
            ? "bg-[#0b0f16]/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"
            : "bg-white/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          }
        `}
      >
        {/* Sun Icon */}
        <div className="relative z-10 flex items-center justify-center w-5 h-5">
          <motion.div
            animate={{
              scale: isDark ? 0.6 : 1,
              opacity: isDark ? 0.5 : 1,
              rotate: isDark ? -45 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={isDark ? "text-gray-500" : "text-orange-400"}
          >
            <Sun size={14} fill={!isDark ? "currentColor" : "none"} />
          </motion.div>
        </div>

        {/* The Track & Knob */}
        <div className="relative w-9 h-5 rounded-full bg-black/10 dark:bg-black/40 shadow-inner">
          <motion.div
            // REMOVED 'layout' prop here to fix conflict
            animate={{ x: isDark ? 18 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`
              absolute top-0.5 left-0 h-4 w-4 rounded-full flex items-center justify-center
              ${isDark
                ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                : "bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              }
            `}
          >
            {/* Tiny Center Dot */}
            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-blue-400'}`} />
          </motion.div>
        </div>

        {/* Moon Icon */}
        <div className="relative z-10 flex items-center justify-center w-5 h-5">
          <motion.div
            animate={{
              scale: !isDark ? 0.6 : 1,
              opacity: !isDark ? 0.5 : 1,
              rotate: !isDark ? 45 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={isDark ? "text-purple-400" : "text-gray-400"}
          >
            <Moon size={14} fill={isDark ? "currentColor" : "none"} />
          </motion.div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;