import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Code2, Briefcase, GraduationCap, Mail, FileText, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: User, path: '/about', label: 'About' },
    { icon: Code2, path: '/skills', label: 'Skills' },
    { icon: Layers, path: '/projects', label: 'Projects' },
    { icon: Briefcase, path: '/experience', label: 'Experience' },
    { icon: GraduationCap, path: '/education', label: 'Education' },
    { icon: Award, path: '/certifications', label: 'Certs' },
    { icon: FileText, path: '/resume', label: 'Resume' },
    { icon: Mail, path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">

      {/* Glass Container */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col gap-2 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
              ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -left-1 w-1 h-4 bg-cyan-400 rounded-r-full shadow-[0_0_10px_#22d3ee]"
                  />
                )}

                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />

                {/* Tooltip */}
                <div className="absolute left-14 px-3 py-1.5 bg-[#1a1f2e] border border-white/10 text-xs text-white rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                  {/* Triangle */}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a1f2e] border-l border-b border-white/10 rotate-45"></div>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </motion.div>
    </div>
  );
};

export default Sidebar;