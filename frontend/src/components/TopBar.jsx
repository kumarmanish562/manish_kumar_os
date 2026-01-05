import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLocation } from 'react-router-dom';
import { Terminal, Moon, Sun, Home, FolderGit2, Activity, Wifi, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopBar = () => {
  const { viewMode, toggleViewMode, theme, toggleTheme } = usePortfolio();
  const location = useLocation();

  // Helper to get "filename" based on route
  const getFileName = (pathname) => {
    switch (pathname) {
      case '/': return 'Home.jsx';
      case '/about': return 'About.tsx';
      case '/projects': return 'Projects.py';
      case '/skills': return 'Skills.json';
      case '/contact': return 'Contact.sh';
      default: return `${pathname.replace('/', '')}.js`;
    }
  };

  // Helper to get icon color based on extension
  const getFileIconColor = (filename) => {
    if (filename.endsWith('.jsx')) return 'text-cyan-400';
    if (filename.endsWith('.tsx')) return 'text-blue-500';
    if (filename.endsWith('.py')) return 'text-yellow-400';
    if (filename.endsWith('.json')) return 'text-green-400';
    if (filename.endsWith('.sh')) return 'text-red-400';
    return 'text-gray-400';
  };

  const fileName = getFileName(location.pathname);

  return (
    <div className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-6 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-xl shadow-lg shadow-black/20">

      {/* Left: System Controls & Breadcrumbs */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group">
          <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors shadow shadow-red-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors shadow shadow-yellow-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors shadow shadow-green-500/20"></div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="text-neon-blue flex items-center gap-1">
            <FolderGit2 size={12} />
            main
          </span>
          <span className="text-gray-600">/</span>
          <span>portfolio-os</span>
          <span className="text-gray-600">/</span>
          <span className="text-white">manish_kumar</span>
        </div>
      </div>

      {/* Center: Dynamic Active File Pill */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <div className="flex items-center gap-3 px-6 py-1.5 bg-black/40 border border-white/5 rounded-full backdrop-blur-md shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={fileName}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-sm font-medium font-mono text-gray-200"
            >
              <Command size={14} className={getFileIconColor(fileName)} />
              {fileName}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Controls & Status */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Wifi size={12} className="text-green-500" />
            <span>Online</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10"></div>
          <div className="flex items-center gap-1.5">
            <Activity size={12} className="text-blue-500 animate-pulse" />
            <span>Live</span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-white/10 mx-2 hidden lg:block"></div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all ring-1 ring-white/5 hover:ring-white/20 active:scale-95"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button
          onClick={() => toggleViewMode()}
          className={`
            relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all active:scale-95 ring-1
            ${viewMode === 'terminal'
              ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-400 ring-cyan-500/30 hover:ring-cyan-500/50'
              : 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-emerald-400 ring-emerald-500/30 hover:ring-emerald-500/50'
            }
          `}
        >
          <div className={`absolute inset-0 opacity-20 ${viewMode === 'terminal' ? 'bg-cyan-500' : 'bg-emerald-500'} blur-xl`}></div>
          <Terminal size={14} strokeWidth={2.5} />
          <span className="relative z-10">{viewMode === 'terminal' ? 'GUI_MODE' : 'TERMINAL'}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;