import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, X, FileCode, FileJson, FileType, Hash, Clock, UserCircle, GraduationCap, Briefcase, Award, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const TopBar = () => {
  const { viewMode, toggleViewMode } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const tabsContainerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real-time Clock State
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. File System Definition
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

  // Nav Items for Mobile Menu
  const navItems = [
    { name: 'Home', path: '/', icon: FileCode },
    { name: 'About', path: '/about', icon: FileType },
    { name: 'Projects', path: '/projects', icon: Hash },
    { name: 'Skills', path: '/skills', icon: FileJson },
    { name: 'Experience', path: '/experience', icon: Briefcase },
    { name: 'Education', path: '/education', icon: GraduationCap },
    { name: 'Certifications', path: '/certifications', icon: Award },
    { name: 'Resume', path: '/resume', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Terminal },
  ];

  // 2. Open Tabs State
  const [openTabs, setOpenTabs] = useState([allFiles['/']]);

  // 3. Sync Tabs with URL & Auto-Scroll
  useEffect(() => {
    const currentFile = allFiles[location.pathname];
    if (currentFile) {
      setOpenTabs(prev => {
        if (!prev.find(tab => tab.name === currentFile.name)) {
          return [...prev, currentFile];
        }
        return prev;
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  }, [location.pathname]);

  // FIX: Auto-scroll to the active tab whenever it changes
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeElement = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [location.pathname, openTabs.length]);

  // Close Tab Logic
  const closeTab = (e, path) => {
    e.stopPropagation();
    if (openTabs.length === 1) return;

    const newTabs = openTabs.filter(tab => allFiles[path]?.name !== tab.name);
    setOpenTabs(newTabs);

    if (location.pathname === path) {
      const lastTab = newTabs[newTabs.length - 1];
      const newPath = Object.keys(allFiles).find(key => allFiles[key].name === lastTab.name);
      if (newPath) navigate(newPath);
    }
  };

  const isActive = (path) => location.pathname === path;
  const getPath = (tab) => Object.keys(allFiles).find(key => allFiles[key].name === tab.name);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-10 z-50 flex items-center justify-between bg-white dark:bg-[#0d1117] border-b border-slate-200 dark:border-white/5 select-none shadow-sm dark:shadow-2xl dark:shadow-black/50 px-2 lg:px-0 transition-colors duration-300">

        {/* LEFT SIDE: Hamburger + Identity + Tabs */}
        <div className="flex items-center h-full overflow-hidden w-full lg:w-auto gap-2 lg:gap-0">

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <div className="space-y-[3px] w-5"><div className="h-0.5 w-full bg-current rounded-full"></div><div className="h-0.5 w-full bg-current rounded-full"></div><div className="h-0.5 w-full bg-current rounded-full"></div></div>}
          </button>

          {/* User Identity */}
          <div className="hidden lg:flex items-center gap-2 px-4 h-full bg-white dark:bg-[#0d1117] border-r border-slate-200 dark:border-white/5 mr-2 shrink-0 transition-colors duration-300">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-purple-500/50 bg-black">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
              />
              <UserCircle className="w-full h-full text-gray-400 hidden" />
            </div>
            <span className="text-[12px] font-bold font-mono text-slate-900 dark:text-gray-200 tracking-wide transition-colors duration-300">Manish Kumar</span>
          </div>

          {/* Tabs Container */}
          <div
            ref={tabsContainerRef}
            className="flex items-end h-full overflow-x-auto gap-1 no-scrollbar mask-gradient flex-1 lg:flex-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {openTabs.map((tab) => {
              if (!tab) return null;
              const path = getPath(tab);
              const active = isActive(path);

              return (
                <div
                  key={tab.name}
                  onClick={() => navigate(path)}
                  data-active={active}
                  className={`
                    group relative flex items-center gap-2 px-3 h-[34px] min-w-[120px] lg:min-w-[140px] max-w-[160px] lg:max-w-[180px] cursor-pointer transition-all duration-200
                    rounded-t-md border-t border-x flex-shrink-0
                    ${active
                      ? 'bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-gray-100 border-cyan-500/50 border-b-slate-100 dark:border-b-[#1e1e1e] z-10 translate-y-[1px] shadow-[0_-5px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_-5px_15px_rgba(0,255,255,0.05)]'
                      : 'bg-white dark:bg-[#0d1117] text-slate-500 dark:text-gray-400 border-transparent hover:bg-slate-50 dark:hover:bg-[#1f242c] hover:text-slate-900 dark:hover:text-gray-300'
                    }
                  `}
                >
                  {/* Active Glow Bar */}
                  {active && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] dark:shadow-[0_0_10px_#22d3ee]"></div>
                  )}

                  <tab.icon size={13} className={`${tab.color} ${active ? 'animate-pulse' : ''} shrink-0`} />
                  <span className="text-[13px] font-mono truncate flex-1 pt-[1px]">{tab.name}</span>

                  <span
                    onClick={(e) => closeTab(e, path)}
                    className={`p-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:text-red-500 dark:hover:text-red-400 shrink-0 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <X size={12} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Tools (Desktop) */}
        <div className="hidden lg:flex items-center h-full bg-white dark:bg-[#0d1117] px-4 gap-4 border-l border-slate-200 dark:border-white/5 shrink-0 transition-colors duration-300">

          {/* Clock */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-colors duration-300">
            <Clock size={12} className="text-cyan-600 dark:text-cyan-500" />
            <span className="text-[11px] font-mono tracking-widest">{formattedTime}</span>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* Mode Switch */}
          <button
            onClick={() => toggleViewMode('terminal')}
            className="h-7 flex items-center gap-2 px-3 rounded-md border border-green-500/50 bg-green-500/5 hover:bg-green-500/10 text-green-500 text-[11px] font-mono font-bold tracking-wider transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            <span className="text-lg leading-none mb-1">&gt;_</span>
            TERMINAL
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-50/20 dark:bg-[#0d1117]/30 backdrop-blur-md md:hidden flex flex-col pt-16 px-6 pb-6 animate-in fade-in duration-200">

          {/* Glass Container for Menu Items */}
          <div className="bg-white/70 dark:bg-[#161b22]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl mt-4 flex flex-col gap-4">
            <div className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-2 px-2 border-b border-white/10 pb-2">Navigation System</div>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 overflow-hidden ${location.pathname === item.path
                  ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/5 text-slate-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/30'
                  }`}
              >
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>

                <div className={`p-2 rounded-lg ${location.pathname === item.path ? 'bg-cyan-500/10' : 'bg-transparent'}`}>
                  <item.icon size={20} className={location.pathname === item.path ? 'animate-pulse' : ''} />
                </div>
                <span className="font-medium tracking-wide">{item.name}</span>

                {location.pathname === item.path && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_currentColor] animate-ping"></div>
                )}
                {location.pathname === item.path && (
                  <div className="absolute right-4 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_currentColor]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Tools */}
          <div className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-white/10">

            {/* Theme Toggle Wrapper */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-xl backdrop-blur-xl transition-all">
              <span className="text-[10px] font-mono text-slate-600 dark:text-gray-400 uppercase tracking-widest">Theme</span>
              <div className="scale-90 origin-right">
                <ThemeToggle />
              </div>
            </div>

            {/* Terminal Button */}
            <button
              onClick={() => toggleViewMode('terminal')}
              className="group relative flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-xl hover:bg-green-500/20 active:scale-95 transition-all"
            >
              <Terminal size={14} className="text-green-700 dark:text-green-400" />
              <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">Terminal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;