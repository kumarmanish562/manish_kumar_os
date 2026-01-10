import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
    const { portfolioData } = usePortfolio();
    const { education } = portfolioData || {};

    if (!education) return <div>Loading...</div>;

    return (
        <div className="min-h-[85vh] w-full px-4 lg:px-8 pb-20 pt-10 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full space-y-12">

                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                        ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-600">TIMELINE</span>
                    </h1>
                    <p className="text-slate-500 dark:text-cyan-400 font-mono text-sm tracking-[0.2em]">
                        // LOADING_EDUCATIONAL_RECORDS...
                    </p>
                </div>

                <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent hidden md:block"></div>

                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className={`flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Spacer for Timeline Alignment */}
                            <div className="hidden md:flex flex-1 w-full justify-center items-start pt-2">
                                <div className="w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-cyan-500 shadow-[0_0_10px_rgba(0,243,255,0.5)] z-10 relative">
                                    <div className="absolute inset-0 bg-cyan-400 opacity-50 animate-ping rounded-full"></div>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="flex-1">
                                <div className="p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-black/20 dark:glass-panel border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-colors group relative overflow-hidden backdrop-blur-md shadow-lg">
                                    <div className="absolute top-0 right-0 p-20 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono rounded-full">
                                                {edu.year}
                                            </span>
                                            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <h4 className="text-lg text-slate-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                                            <GraduationCap size={18} />
                                            {edu.college}
                                        </h4>

                                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 leading-relaxed border-l-2 border-slate-300 dark:border-white/10 pl-4">
                                            {edu.desc}
                                        </p>

                                        {edu.achievements && (
                                            <div className="space-y-3">
                                                <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white/80">
                                                    <Award size={14} className="text-yellow-600 dark:text-yellow-500" />
                                                    Achievements
                                                </h5>
                                                <div className="flex flex-wrap gap-2 block">
                                                    {edu.achievements.map((ach, i) => (
                                                        <span key={i} className="text-xs bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 px-2 py-1 rounded text-slate-700 dark:text-gray-300">
                                                            {ach}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
