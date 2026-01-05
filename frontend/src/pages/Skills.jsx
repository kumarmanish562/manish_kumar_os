import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const Skills = () => {
    const { portfolioData } = usePortfolio();
    const { skills } = portfolioData || {};

    if (!skills) return <div>Loading...</div>;

    const renderSkillBar = (skill) => (
        <div key={skill.name} className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-gray-300 font-medium">{skill.name}</span>
                <span className="text-gray-500 text-sm">{skill.level}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5">
                <div
                    className="bg-gradient-to-r from-neon-blue to-purple-600 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                    style={{ width: `${skill.level}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-6xl mx-auto"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500 mb-8">
                Technical Arsenal
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Languages */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl text-neon-blue font-mono mb-6 border-b border-white/10 pb-2">Languages</h3>
                    {skills.languages?.map(renderSkillBar)}
                </div>

                {/* Frameworks */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl text-neon-blue font-mono mb-6 border-b border-white/10 pb-2">Frameworks</h3>
                    {skills.frameworks?.map(renderSkillBar)}
                </div>

                {/* Tools */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl text-neon-blue font-mono mb-6 border-b border-white/10 pb-2">Tools</h3>
                    {skills.tools?.map(renderSkillBar)}
                </div>

                {/* Soft Skills */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl text-neon-blue font-mono mb-6 border-b border-white/10 pb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.soft_skills?.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;
