import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    Code2, Layers, Terminal, Globe,
    Atom, FileCode2, Coffee, LayoutTemplate,
    Server, Wind, Database, GitBranch,
    Cloud, Box, Cpu, Zap, Hash
} from 'lucide-react';

const Skills = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const { skills } = portfolioData || {};

    // --- GSAP Animation Sequence ---
    useGSAP(() => {
        if (!skills) return;

        const tl = gsap.timeline();

        // 1. Header Reveal
        tl.from(".page-title", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
            .from(".page-subtitle", { y: -10, opacity: 0, duration: 0.4 }, "-=0.3");

        // 2. Cards Stagger In
        tl.from(".skill-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)"
        }, "-=0.2");

        // 3. Skill Bars "Charge Up"
        tl.from(".progress-bar-fill", {
            width: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: "power4.out"
        }, "-=0.5");

    }, { scope: containerRef, dependencies: [skills] });

    if (!skills) return null;

    // --- Helper: Icon Mapper ---
    const getSkillIcon = (skillName) => {
        const name = skillName.toLowerCase();
        if (name.includes('react')) return Atom;
        if (name.includes('python')) return Hash;
        if (name.includes('java') && !name.includes('script')) return Coffee;
        if (name.includes('script')) return FileCode2;
        if (name.includes('html') || name.includes('css')) return LayoutTemplate;
        if (name.includes('node') || name.includes('express')) return Server;
        if (name.includes('flask') || name.includes('django')) return Database;
        if (name.includes('tailwind')) return Wind;
        if (name.includes('three')) return Box;
        if (name.includes('git')) return GitBranch;
        if (name.includes('docker') || name.includes('aws')) return Cloud;
        if (name.includes('linux')) return Terminal;
        if (name.includes('ml') || name.includes('ai')) return Cpu;
        return Zap;
    };

    const sections = [
        { title: "Languages", icon: Code2, data: skills.languages, color: "text-cyan-400", border: "group-hover:border-cyan-500/50", bg: "bg-cyan-500" },
        { title: "Frameworks", icon: Layers, data: skills.frameworks, color: "text-purple-400", border: "group-hover:border-purple-500/50", bg: "bg-purple-500" },
        { title: "Tools", icon: Terminal, data: skills.tools, color: "text-yellow-400", border: "group-hover:border-yellow-500/50", bg: "bg-yellow-500" },
        { title: "Soft Skills", icon: Globe, data: skills.soft_skills, color: "text-green-400", border: "group-hover:border-green-500/50", bg: "bg-green-500" }
    ];

    return (
        <div ref={containerRef} className="w-full max-w-7xl mx-auto space-y-12 pb-20 px-4 min-h-[85vh] flex flex-col justify-center">

            {/* Header */}
            <div className="text-center space-y-4 mb-8">
                <h2 className="page-title text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                    TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">ARSENAL</span>
                </h2>
                <div className="page-subtitle flex justify-center items-center gap-2 text-slate-500 dark:text-gray-400 font-mono text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    // SYSTEM_DIAGNOSTIC: SKILL_MATRIX_LOADED
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <TiltCard key={idx} className="skill-card">
                        <div className={`relative p-8 rounded-3xl bg-white/60 dark:bg-[#0f121a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 transition-all duration-500 ${section.border} group h-full overflow-hidden`}>

                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 p-20 ${section.bg} opacity-5 blur-[80px] rounded-full pointer-events-none`}></div>

                            {/* Section Title */}
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-white/5 pb-4">
                                <div className={`p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${section.color} shadow-lg`}>
                                    <section.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">{section.title}</h3>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-6 relative z-10">
                                {section.data?.map((skill, sIdx) => {
                                    // Soft skills are strings, so they won't have an icon property.
                                    // We'll use the 'icon' URL if available.

                                    return (
                                        <div key={sIdx} className="group/item">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex items-center gap-3">
                                                    {/* Icon Rendering Logic */}
                                                    <div className={`p-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover/item:border-${section.color.split('-')[1]}-500/30 transition-colors`}>
                                                        {skill.icon ? (
                                                            <img
                                                                src={skill.icon}
                                                                alt={skill.name}
                                                                className="w-5 h-5 object-contain"
                                                            />
                                                        ) : (
                                                            <div className={`text-slate-500 dark:text-gray-500 group-hover/item:${section.color} transition-colors`}>
                                                                <Zap size={18} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <span className="font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-black dark:group-hover/item:text-white transition-colors">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <span className={`text-xs font-mono opacity-70 dark:opacity-50 group-hover/item:opacity-100 ${section.color}`}>
                                                    {skill.level}%
                                                </span>
                                            </div>

                                            {/* Energy Bar */}
                                            <div className="h-2 w-full bg-slate-200 dark:bg-black/50 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                                                <div
                                                    className={`progress-bar-fill h-full rounded-full relative overflow-hidden ${section.bg} shadow-[0_0_10px_currentColor] opacity-80`}
                                                    style={{ width: `${skill.level}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </TiltCard>
                ))}
            </div>
        </div>
    );
};

// --- Sub-component: 3D Tilt Wrapper for Cards ---
const TiltCard = ({ children, className }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        // Disable on mobile
        if (window.innerWidth < 768) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            className={`${className} perspective-1000`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
};

export default Skills;