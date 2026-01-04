import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
    const { portfolioData } = usePortfolio();
    const { education } = portfolioData || {};

    if (!education) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                Education
            </h1>

            <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GraduationCap size={120} />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">{education.degree}</h2>
                <h3 className="text-xl text-neon-blue mb-4">{education.college}</h3>

                <div className="flex items-center gap-4 text-gray-400 mb-6 font-mono text-sm">
                    <span className="bg-white/5 px-3 py-1 rounded">{education.year}</span>
                    <span className="bg-white/5 px-3 py-1 rounded">{education.major}</span>
                </div>

                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <Award size={18} className="text-yellow-500" />
                        Achievements
                    </h4>
                    <ul className="space-y-2">
                        {education.achievements?.map((ach, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-300">
                                <span className="w-1.5 h-1.5 bg-neon-blue rounded-full"></span>
                                {ach}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default Education;
