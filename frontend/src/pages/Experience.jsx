import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const Experience = () => {
    const { portfolioData } = usePortfolio();
    const { experience } = portfolioData || {};

    if (!experience) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                Experience
            </h1>

            <div className="space-y-6">
                {experience.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-6 border-l-4 border-l-neon-purple"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                <h4 className="text-lg text-neon-blue">{exp.company}</h4>
                            </div>
                            <span className="mt-2 md:mt-0 px-3 py-1 bg-white/5 rounded-full text-sm font-mono text-gray-400">
                                {exp.date}
                            </span>
                        </div>

                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.technologies?.map((tech, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Experience;
