import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Code, Database, GraduationCap, Briefcase, Award, FileText, Mail } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 h-full bg-[#0d1117]/90 border-r border-white/10 flex flex-col items-center py-4 z-40 mt-12 fixed left-0 top-0 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col space-y-4">
        <NavIcon to="/" icon={<Home size={20} />} label="Home" />
        <NavIcon to="/about" icon={<User size={20} />} label="About" />
        <NavIcon to="/skills" icon={<Code size={20} />} label="Skills" />
        <NavIcon to="/projects" icon={<Database size={20} />} label="Projects" />
        <NavIcon to="/education" icon={<GraduationCap size={20} />} label="Education" />
        <NavIcon to="/experience" icon={<Briefcase size={20} />} label="Experience" />
        <NavIcon to="/certifications" icon={<Award size={20} />} label="Certifications" />
        <NavIcon to="/resume" icon={<FileText size={20} />} label="Resume" />
        <NavIcon to="/contact" icon={<Mail size={20} />} label="Contact" />
      </div>
    </div>
  );
};

const NavIcon = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `p-3 rounded-lg transition-all duration-300 relative group ` +
      (isActive ? "text-[#00f3ff] bg-white/10 shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5")
    }
  >
    {icon}
    <span className="absolute left-14 bg-black/90 border border-white/10 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none backdrop-blur-sm">
      {label}
    </span>
  </NavLink>
);

export default Sidebar;
