import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Code2, Briefcase, GraduationCap, Mail, Settings, Award, FileText, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: User, path: '/about', label: 'About' },
    { icon: Code2, path: '/skills', label: 'Skills' },
    { icon: Folder, path: '/projects', label: 'Projects' },
    { icon: Briefcase, path: '/experience', label: 'Experience' },
    { icon: GraduationCap, path: '/education', label: 'Education' },
    { icon: Award, path: '/certifications', label: 'Certifications' },
    { icon: FileText, path: '/resume', label: 'Resume' },
    { icon: Mail, path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed left-8 top-0 bottom-0 z-40 hidden md:flex flex-col justify-center pointer-events-none">

      {/* 1. The Vertical Circuit Line (Background Trace) */}
      <div className="absolute left-[19px] top-20 bottom-20 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      <nav className="flex flex-col gap-5 pointer-events-auto">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group relative flex items-center justify-center w-10 h-10 transition-all duration-500
              ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-100 hover:scale-110'}
            `}
          >
            {({ isActive }) => (
              <>
                {/* A. The "Antigravity" Float Animation */}
                <motion.div
                  animate={{ y: isActive ? 0 : [0, -3, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2 // Stagger the floating effect
                  }}
                  className="relative z-10 flex items-center justify-center"
                >
                  {/* B. Active Glow Orb (Behind Icon) */}
                  {isActive && (
                    <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full"></div>
                  )}

                  {/* C. The Icon Itself */}
                  <item.icon
                    size={20}
                    className={`transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-gray-300'}`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </motion.div>

                {/* D. Active Circuit Connection (The "Dot" on the line) */}
                {isActive && (
                  <motion.div
                    layoutId="circuit-active"
                    className="absolute -left-[14px] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                  >
                    {/* Connecting beam to icon */}
                    <div className="absolute top-1/2 left-full w-3 h-[1px] bg-cyan-400/50"></div>
                  </motion.div>
                )}

                {/* E. Minimal Text Label (Only shows on hover) */}
                <div className="absolute left-12 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-200 uppercase bg-black/60 px-2 py-1 rounded border border-white/5 backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar;