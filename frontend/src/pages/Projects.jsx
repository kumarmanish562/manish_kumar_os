import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Github, FolderGit2, Layers, ArrowUpRight } from 'lucide-react';

const Projects = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const { projects } = portfolioData || {};

    // --- GSAP Entrance Animation ---
    useGSAP(() => {
        if (!projects) return;

        const tl = gsap.timeline();

        // 1. Header Animation
        tl.from(".page-header", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(".header-line", { width: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");

        // 2. Project Cards Stagger
        tl.from(".project-card", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        }, "-=0.4");

    }, { scope: containerRef, dependencies: [projects] });

    if (!projects) return null;

    return (
        <div ref={containerRef} className="min-h-[85vh] w-full px-4 lg:px-8 pb-20 pt-10">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* --- Page Header --- */}
                <div className="page-header space-y-4">
                    <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm tracking-widest uppercase">
                        <FolderGit2 size={18} />
                        <span>/root/projects</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">WORKS</span>
                    </h1>
                    <div className="header-line h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                </div>

                {/* --- Projects Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>

            </div>
        </div>
    );
};

// --- Sub-Component: 3D Interactive Card ---
const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle 3D Tilt
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return (
        <div
            className="project-card perspective-1000 group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="relative h-full bg-[#0f121a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl hover:border-cyan-500/30 flex flex-col"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 1. Image Area with Interactive Overlay */}
                <div className="relative h-64 overflow-hidden border-b border-white/5 bg-[#050505]">
                    <img
                        src={project.screenshot}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        onError={(e) => { e.target.src = 'https://placehold.co/800x600/111827/00f3ff?text=Project+Preview'; }}
                    />

                    {/* Overlay (Appears on Hover) */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            Live Demo <ArrowUpRight size={18} />
                        </a>
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-black/50 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            <Github size={20} />
                        </a>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-cyan-400 border-l-2 border-l-cyan-400">
                        v1.0.0
                    </div>
                </div>

                {/* 2. Content Area */}
                <div className="p-8 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-transparent to-[#050505]/50">

                    {/* Title */}
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-6 flex-1 text-sm">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="space-y-3 mt-auto">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                            <Layers size={14} />
                            <span>Tech Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-cyan-200/80 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-400/30 transition-colors duration-500"></div>
            </div>
        </div>
    );
};

export default Projects;