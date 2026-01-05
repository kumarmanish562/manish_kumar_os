import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const { portfolioData } = usePortfolio();
    const { projects } = portfolioData || {};

    if (!projects) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            <div className="md:col-span-2 mb-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                    Project Gallery
                </h1>
            </div>

            {projects.map((project, idx) => (
                <motion.div
                    key={project.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-panel group overflow-hidden flex flex-col h-full"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={project.screenshot}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                            <a href={project.links.github} className="p-2 bg-white/10 rounded-full hover:bg-neon-blue hover:text-black transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={project.links.demo} className="p-2 bg-white/10 rounded-full hover:bg-neon-blue hover:text-black transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-neon-blue transition-colors">{project.title}</h3>
                        <p className="text-gray-400 mb-4 flex-1 text-sm leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech_stack.map((tech, i) => (
                                <span key={i} className="px-2 py-1 text-xs font-mono bg-neon-purple/10 border border-neon-purple/30 rounded text-neon-purple">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Projects;
