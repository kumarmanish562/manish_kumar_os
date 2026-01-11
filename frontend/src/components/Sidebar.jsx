import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Code2, Briefcase, GraduationCap, Mail, FileText, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Sidebar = () => {
  const { theme } = usePortfolio(); // Although theme is applied via class, we might need it for logic or forcing re-renders if needed, but CSS dark mode is enough
  // Actually, standard Tailwind 'dark:' prefix works if 'dark' class is on HTML/Body. 
  // Since we rely on index.css setting the class, we can just use tailwind classes.

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
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">

      {/* Glass Container */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col gap-2 p-2 rounded-2xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] shadow-2xl transition-colors duration-300"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
              ${isActive
                ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -left-1 w-1 h-4 bg-cyan-500 dark:bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
                )}

                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />

                {/* Tooltip */}
                <div className="absolute left-14 px-3 py-1.5 bg-white dark:bg-[#1a1f2e] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                  {/* Triangle */}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white dark:bg-[#1a1f2e] border-l border-b border-slate-200 dark:border-white/10 rotate-45"></div>
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