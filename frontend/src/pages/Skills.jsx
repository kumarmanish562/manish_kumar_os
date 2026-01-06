import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import {
    Code2, Layers, Terminal, Globe, // Category Icons
    Atom, FileCode2, Coffee, LayoutTemplate, // Language/Framework Icons
    Server, Wind, Database, GitBranch, // Tool Icons
    Cloud, Box, Cpu, Zap, Hash
} from 'lucide-react';

const Skills = () => {
    const { portfolioData } = usePortfolio();
    const { skills } = portfolioData || {};

    if (!skills) return null;

    // --- Helper: Map Skill Names to Lucide Icons ---
    const getSkillIcon = (skillName) => {
        const name = skillName.toLowerCase();

        // Languages
        if (name.includes('react')) return Atom;
        if (name.includes('python')) return Hash; // Python uses # for comments/scripting vibe
        if (name.includes('java') && !name.includes('script')) return Coffee;
        if (name.includes('script')) return FileCode2; // JS/TS
        if (name.includes('html') || name.includes('css')) return LayoutTemplate;

        // Frameworks & Backend
        if (name.includes('node') || name.includes('express')) return Server;
        if (name.includes('flask') || name.includes('django')) return Database; // Backend/DB context
        if (name.includes('tailwind')) return Wind; // Tailwind = Wind
        if (name.includes('three')) return Box; // 3D = Box

        // Tools
        if (name.includes('git')) return GitBranch;
        if (name.includes('docker') || name.includes('container')) return Box;
        if (name.includes('aws') || name.includes('cloud')) return Cloud;
        if (name.includes('linux')) return Terminal;
        if (name.includes('ml') || name.includes('ai')) return Cpu;

        // Default
        return Zap;
    };

    const sections = [
        { title: "Languages", icon: Code2, data: skills.languages, color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500" },
        { title: "Frameworks", icon: Layers, data: skills.frameworks, color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500" },
        { title: "Tools", icon: Terminal, data: skills.tools, color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500" },
        { title: "Soft Skills", icon: Globe, data: skills.soft_skills?.map(s => ({ name: s, level: 100 })), color: "text-green-400", border: "border-green-500/20", bg: "bg-green-500" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto space-y-12 pb-20"
        >
            {/* Page Header */}
            <div className="text-center space-y-4 mb-16">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arsenal</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
                    // DECRYPTING SKILL_SET_MATRIX...
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className={`group relative p-8 rounded-3xl bg-[#0f121a]/60 backdrop-blur-md border border-white/5 ${section.border} hover:bg-white/5 transition-colors duration-500`}
                    >
                        {/* Hover Gradient Glow */}
                        <div className={`absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-transparent via-${section.color.split('-')[1]}-500/10 to-transparent pointer-events-none`} />

                        <div className="relative z-10 space-y-8">
                            {/* Section Header */}
                            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${section.color} border border-white/5`}>
                                    <section.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-200 tracking-wide">{section.title}</h3>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-6">
                                {section.data?.map((skill, sIdx) => {
                                    const SkillIcon = getSkillIcon(skill.name);

                                    return (
                                        <div key={sIdx} className="group/skill relative">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex items-center gap-3">
                                                    {/* Individual Skill Icon */}
                                                    <div className={`text-gray-500 group-hover/skill:${section.color} transition-colors duration-300`}>
                                                        <SkillIcon size={18} />
                                                    </div>
                                                    <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <span className={`text-xs font-mono opacity-0 group-hover/skill:opacity-100 transition-opacity ${section.color}`}>
                                                    {skill.level}%
                                                </span>
                                            </div>

                                            {/* Progress Bar Container */}
                                            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1), ease: "easeOut" }}
                                                    className={`h-full rounded-full relative overflow-hidden`}
                                                >
                                                    <div className={`absolute inset-0 opacity-80 ${section.bg}`} />
                                                    {/* Shimmer Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Skills;