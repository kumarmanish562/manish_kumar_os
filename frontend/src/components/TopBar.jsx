import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Moon, Sun, X, FileCode, FileJson, FileType, Hash, UserCircle, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ThemeToggle from './ThemeToggle';

const TopBar = () => {
  const { viewMode, toggleViewMode, theme, toggleTheme } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const tabsContainerRef = useRef(null);

  // Real-time Clock State
  const [time, setTime] = useState(new Date());

  // Update Clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. Define all possible files (The "File System")
  const allFiles = {
    '/': { name: 'Home.jsx', icon: FileCode, color: 'text-cyan-400' },
    '/about': { name: 'About.tsx', icon: FileType, color: 'text-blue-500' },
    '/projects': { name: 'Projects.py', icon: Hash, color: 'text-yellow-400' },
    '/skills': { name: 'Skills.json', icon: FileJson, color: 'text-green-400' },
    '/education': { name: 'Education.md', icon: FileType, color: 'text-orange-400' },
    '/experience': { name: 'Experience.log', icon: Terminal, color: 'text-purple-400' },
    '/certifications': { name: 'Certs.pem', icon: FileCode, color: 'text-pink-400' },
    '/resume': { name: 'Resume.pdf', icon: FileType, color: 'text-red-500' },
    '/contact': { name: 'Contact.sh', icon: Terminal, color: 'text-red-400' }
  };

  // 2. State for Open Tabs (Initially only Home)
  const [openTabs, setOpenTabs] = useState([allFiles['/']]);

  // 3. Watch URL changes to "Open" new tabs automatically
  // 3. Watch URL changes to "Open" new tabs automatically
  useEffect(() => {
    const currentFile = allFiles[location.pathname];
    if (currentFile) {
      setOpenTabs(prev => {
        if (prev.find(tab => tab.name === currentFile.name)) {
          return prev;
        }
        return [...prev, currentFile];
      });
    }
  }, [location.pathname]);

  // 4. GSAP Animation for Tabs
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tab-item", {
        y: 10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)"
      });
    }, tabsContainerRef);
    return () => ctx.revert();
  }, [openTabs.length]);

  const closeTab = (e, path) => {
    e.stopPropagation();
    if (openTabs.length === 1) return;
    const newTabs = openTabs.filter(tab => allFiles[path].name !== tab.name);
    setOpenTabs(newTabs);
    if (location.pathname === path) {
      const lastTab = newTabs[newTabs.length - 1];
      const newPath = Object.keys(allFiles).find(key => allFiles[key].name === lastTab.name);
      navigate(newPath);
    }
  };

  const isActive = (path) => location.pathname === path;
  const getPath = (tab) => Object.keys(allFiles).find(key => allFiles[key].name === tab.name);

  return (
    <div className="fixed top-0 left-0 right-0 h-10 z-50 flex items-end justify-between bg-[#0d1117] border-b border-white/5 select-none shadow-2xl shadow-black/50 px-2 md:px-0">

      {/* LEFT SIDE: Name + Tabs */}
      <div className="flex items-center h-full overflow-hidden w-full md:w-auto">

        {/* User Identity (Far Left) */}
        <div className="hidden md:flex items-center gap-2 px-4 h-full bg-[#0d1117] border-r border-white/5 mr-2">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-5 h-5 rounded-full object-cover border border-purple-500/50"
          />
          <span className="text-[12px] font-bold font-mono text-gray-200 tracking-wide">Manish Kumar</span>
        </div>

        {/* Tabs Container */}
        <div ref={tabsContainerRef} className="flex items-end h-full overflow-x-auto no-scrollbar gap-1">
          {openTabs.map((tab) => {
            const path = getPath(tab);
            const active = isActive(path);

            return (
              <div
                key={tab.name}
                onClick={() => navigate(path)}
                className={`
                  tab-item group relative flex items-center gap-2 px-3 h-[34px] min-w-[130px] max-w-[160px] cursor-pointer transition-all duration-300
                  rounded-t-md border-t border-x
                  ${active
                    ? 'bg-[#1e1e1e] text-gray-100 border-cyan-500/50 border-b-0 z-10 translate-y-[1px] shadow-[0_-5px_15px_rgba(0,255,255,0.05)]'
                    : 'bg-[#0d1117] text-gray-500 border-transparent hover:bg-[#161b22] hover:text-gray-300'
                  }
                `}
              >
                {/* Active Indicator Glow */}
                {active && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                )}

                <tab.icon size={13} className={`${tab.color} ${active ? 'animate-pulse' : ''}`} />
                <span className="text-[13px] font-mono truncate flex-1 pt-[1px]">{tab.name}</span>

                <span
                  onClick={(e) => closeTab(e, path)}
                  className={`p-0.5 rounded-md hover:bg-white/10 transition-all hover:text-red-400 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <X size={12} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: Clock + Theme + Mode Switch */}
      <div className="hidden md:flex items-center h-full bg-[#0d1117] px-4 gap-4 border-l border-white/5">

        {/* Real-time Clock */}
        <div className="flex items-center gap-2 text-gray-400 px-2 py-1 rounded bg-white/5 border border-white/5">
          <Clock size={12} className="text-cyan-500" />
          <span className="text-[11px] font-mono tracking-widest">{formattedTime}</span>
        </div>

        {/* Theme Toggle Component */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* GUI / Terminal Switch */}
        <button
          onClick={toggleViewMode}
          className={`
            h-7 flex items-center gap-2 px-3 rounded text-[10px] font-bold tracking-widest uppercase transition-all
            ${viewMode === 'terminal'
              ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]'
              : 'bg-green-900/20 text-emerald-400 border border-emerald-500/30 hover:bg-green-900/40 hover:shadow-[0_0_10px_rgba(52,211,153,0.2)]'
            }
          `}
        >
          <Terminal size={12} />
          {viewMode === 'terminal' ? 'GUI_MODE' : 'TERMINAL'}
        </button>
      </div>
    </div>
  );
};

export default TopBar;