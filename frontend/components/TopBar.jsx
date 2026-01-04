import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext'; // Adjust import based on usage
import { Terminal, Moon, Sun, Home, User, Briefcase, Code } from 'lucide-react';

const TopBar = () => {
  const { viewMode, toggleViewMode, theme, toggleTheme } = usePortfolio();

  return (
    <div className="w-full h-12 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50 fixed top-0 left-0">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex items-center space-x-2">
          <Home className="w-4 h-4" />
          <span>portfolio-os</span>
          <span>/</span>
          <span className="text-white">manish_kumar</span>
        </div>
      </div>

      {/* Center: Tab Name (Optional, could simply be decorative) */}
      <div className="hidden md:flex items-center px-4 py-1 bg-white/5 rounded-md border border-white/5 text-xs text-gray-300">
        <Code className="w-3 h-3 mr-2 text-blue-400" />
        home.jsx
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-white/10 transition-colors text-gray-300"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          onClick={() => toggleViewMode()}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border transition-all text-xs font-medium cursor-pointer ${viewMode === 'terminal'
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20'
            : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
            }`}
        >
          <Terminal size={14} />
          <span>{viewMode === 'terminal' ? 'GUI MODE' : 'TERMINAL'}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;