import React, { useState, useEffect } from 'react';
import { Home, User, Code2, Briefcase, GraduationCap, Mail, FileText, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ scrollContainer, onSectionChange }) => {
  const [activeId, setActiveId] = useState('home');

  const navItems = [
    { icon: Home, id: 'home', label: 'Home' },
    { icon: User, id: 'about', label: 'About' },
    { icon: Code2, id: 'skills', label: 'Skills' },
    { icon: Layers, id: 'projects', label: 'Projects' },
    { icon: Briefcase, id: 'experience', label: 'Experience' },
    { icon: GraduationCap, id: 'education', label: 'Education' },
    { icon: Award, id: 'certifications', label: 'Certs' },
    { icon: FileText, id: 'resume', label: 'Resume' },
    { icon: Mail, id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id); // Optimistic update
      if (onSectionChange) onSectionChange(id);
    }
  };

  useEffect(() => {
    // Wait for the DOM to be ready and scrollContainer to be set
    const observerOptions = {
      root: scrollContainer?.current || null,
      rootMargin: '-20% 0px -60% 0px', // Adjust so the center/top is the "active" zone
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          if (onSectionChange) onSectionChange(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [scrollContainer, navItems]); // Re-run if container changes

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">

      {/* Glass Container */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col gap-2 p-2 rounded-2xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] shadow-2xl transition-colors duration-300"
      >
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 outline-none
                ${isActive
                  ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
              `}
            >
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
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Sidebar;
