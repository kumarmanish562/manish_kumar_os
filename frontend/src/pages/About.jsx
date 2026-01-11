import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Code2, Cpu, Globe, Terminal, Database, Server, Zap, ShieldCheck, MousePointer2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
    const cardRef = useRef(null);
    const { portfolioData } = usePortfolio();

    // --- 3D Drag & Rotate Animation ---
    const isDragging = useRef(false);

    useEffect(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;

        const handleMouseDown = () => {
            // Disable on mobile
            if (window.innerWidth < 768) return;
            isDragging.current = true;
            document.body.style.cursor = 'grabbing';
            gsap.to(card, { scale: 0.98, duration: 0.2 });
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = 'default';
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
        };

        const handleMouseMove = (e) => {
            if (!isDragging.current) return;
            // Double check
            if (window.innerWidth < 768) return;

            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 50; // High sensitivity for drag
            const y = (clientY / window.innerHeight - 0.5) * 50;

            gsap.to(card, {
                rotateY: x,
                rotateX: -y,
                duration: 0.1, // Instant response
                ease: "none",
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            });
        };

        card.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [portfolioData]);

    // 1. Loading State
    if (!portfolioData) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] animate-pulse">
                        ACCESSING_DATABASE...
                    </span>
                </div>
            </div>
        );
    }
    const { about, home, projects } = portfolioData;

    // --- Static Data (Preserved) ---
    const skills = [
        { name: 'React / Vite', icon: Code2, color: 'text-cyan-400' },
        { name: 'Python / Flask', icon: Server, color: 'text-yellow-400' },
        { name: 'Machine Learning', icon: Cpu, color: 'text-purple-400' },
        { name: 'Tailwind CSS', icon: Zap, color: 'text-blue-400' },
    ];

    return (
        <div className="min-h-[85vh] flex items-center justify-center w-full px-4 lg:px-8 overflow-hidden pt-10 md:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl">

                {/* LEFT COLUMN: Narrative & Info (Span 7) */}
                <div className="lg:col-span-7 space-y-8 z-10 order-2 lg:order-1">

                    {/* Header */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="h-1 bg-gradient-to-r from-cyan-500 to-transparent"
                        />
                        <motion.h1
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter"
                        >
                            SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">IDENTITY</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-cyan-500 font-mono text-sm tracking-[0.2em]"
                        >
                            // DECRYPTING_USER_DATA...
                        </motion.p>
                    </div>

                    {/* Main Bio Panel */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-8 rounded-2xl bg-white/60 dark:bg-black/20 backdrop-blur-md border-l-4 border-l-cyan-500 shadow-xl relative group dark:glass-panel"
                    >
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-50 transition-opacity">
                            <Terminal size={32} className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                            Operator Profile
                        </h3>
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-lg font-light">
                            {about.bio}
                        </p>
                    </motion.div>

                    {/* Secondary Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mission Protocol */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3 text-cyan-600 dark:text-cyan-400">
                                <Globe size={20} />
                                <h4 className="font-mono text-sm uppercase tracking-wider">Mission Protocol</h4>
                            </div>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                {about.goal}
                            </p>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="p-6 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3 text-purple-600 dark:text-purple-400">
                                <Database size={20} />
                                <h4 className="font-mono text-sm uppercase tracking-wider">Skills Summary</h4>
                            </div>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                {about.skills_summary}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Holographic Card (Span 5) */}
                <div className="lg:col-span-5 flex items-center justify-center perspective-[2000px] z-20">
                    <div ref={cardRef} className="relative w-80 lg:w-96 cursor-grab active:cursor-grabbing group" style={{ transformStyle: 'preserve-3d' }}>

                        {/* Glowing Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-[60px] rounded-full -z-10 pointer-events-none"></div>

                        {/* Glass Card Container */}
                        <div className="relative border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden pb-8 transform-style-3d bg-white/10 dark:bg-black/40 backdrop-blur-sm">

                            {/* Drag Hint */}
                            <div className="absolute top-6 right-6 p-2 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white transition-colors z-50 pointer-events-none">
                                <MousePointer2 size={14} />
                            </div>

                            {/* Background Video Layer - Deepest Layer */}
                            <div className="absolute inset-0 translate-z-[-50px] scale-110">
                                <video
                                    src="/about_visual.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-60"
                                />
                            </div>

                            {/* Glass Tint Layer */}
                            <div className="absolute inset-0 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-xl translate-z-0"></div>

                            {/* Animated Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none translate-z-[10px]"></div>

                            {/* Scanning Line Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[100%] w-full animate-float pointer-events-none translate-z-[20px]"></div>

                            {/* CONTENT LAYER - Popped Out */}
                            <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                                {/* Avatar Section */}
                                <div className="relative flex justify-center mb-6 mt-4">
                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-black">
                                            <img
                                                src={home.profile_image}
                                                alt="Profile"
                                                className="w-full h-full object-cover text-white"
                                                onError={(e) => { e.target.src = 'https://placehold.co/200x200/1e293b/00f3ff?text=User'; }}
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 bg-black/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest shadow-lg">
                                        Online
                                    </div>
                                </div>

                                {/* Identity Info */}
                                <div className="text-center space-y-2 mb-8">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Manish Kumar</h2>
                                    <p className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-[0.15em] px-2">
                                        {home.headline}
                                    </p>
                                </div>

                                {/* Stats Row */}
                                <div className="flex justify-center mb-2">
                                    <div className="bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors w-2/3 shadow-lg backdrop-blur-md">
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{projects?.length || 0}+</div>
                                        <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-wider font-mono mt-1">Total Projects</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-float {
                    animation: float 3s linear infinite;
                }
            `}</style>
        </div >
    );
};

export default About;