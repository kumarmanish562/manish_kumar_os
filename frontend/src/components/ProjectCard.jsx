import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-cyan-400 font-bold font-mono group-hover:text-cyan-300">
          {project.title}
        </h3>
        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed font-sans">
        {project.desc}
      </p>
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-mono"
      >
        <Github size={14} /> 
        <span>View Source</span>
      </a>
    </div>
  );
};

export default ProjectCard;