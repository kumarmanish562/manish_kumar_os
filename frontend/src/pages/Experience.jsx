import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Briefcase, Calendar, Building2, ChevronRight, Terminal } from 'lucide-react';

const Experience = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const { experience } = portfolioData || {};

    useGSAP(() => {
        if (!experience) return;

        const tl = gsap.timeline();

        // 1. Header & Timeline Line Draw
        tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
            .from(".timeline-line", { height: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.4");

        // 2. Experience Nodes Pop In
        tl.from(".timeline-node", {
            x: -20,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.5)"
        }, "-=1.2");

        // 3. Cards Slide In
        tl.from(".experience-card", {
            x: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=1.4");

    }, { scope: containerRef, dependencies: [experience] });

    if (!experience) return null;

    return (
        <div ref={containerRef} className="min-h-[85vh] w-full px-4 lg:px-8 pb-20 pt-10">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* --- Page Header --- */}
                <div className="page-header text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                        CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TRAJECTORY</span>
                    </h1>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 font-mono text-xs">
                        <Terminal size={12} />
                        <span>// LOADING_HISTORY_LOGS...</span>
                    </div>
                </div>

                {/* --- Timeline Container --- */}
                <div className="relative pl-4 md:pl-8">

                    {/* The Glowing Vertical Line */}
                    <div className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-50"></div>

                    <div className="space-y-12">
                        {experience.map((exp, idx) => (
                            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 group">

                                {/* Timeline Node (The Dot) */}
                                <div className="timeline-node absolute left-0 md:relative md:left-auto flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-white animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="experience-card pl-10 md:pl-0">
                                    <div className="relative p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-[#0f121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 group-hover:border-cyan-500/30 transition-all duration-300 shadow-xl overflow-hidden">

                                        {/* Hover Glow Effect */}
                                        <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500 pointer-events-none"></div>

                                        {/* Header Row: Role & Date */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-white/5 pb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300 mt-1">
                                                    <Building2 size={16} />
                                                    <span className="font-mono text-sm tracking-wide">{exp.company}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 text-xs font-mono">
                                                <Calendar size={14} />
                                                {exp.date}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-4">
                                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                                                {exp.description}
                                            </p>

                                            {/* Tech Stack Pills */}
                                            {exp.technologies && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {exp.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
                                                        >
                                                            <ChevronRight size={10} /> {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Experience;