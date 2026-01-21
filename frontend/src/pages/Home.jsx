import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, MousePointer2, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';

const Home = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const colors = [
        '#06b6d4', // Cyan
        '#8b5cf6', // Violet
        '#d946ef', // Fuchsia
        '#f43f5e', // Rose
        '#f59e0b', // Amber
        '#10b981', // Emerald
        '#3b82f6'  // Blue
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColorIndex((prev) => (prev + 1) % colors.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [colors.length]);

    // --- 3D TILT LOGIC ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        // Disable tilt on small screens
        if (window.innerWidth < 768) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center (from -0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (!portfolioData) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] animate-pulse">
                        INITIALIZING_CORE...
                    </span>
                </div>
            </div>
        );
    }
    const { home } = portfolioData;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="min-h-[85vh] flex items-center justify-center w-full px-4 overflow-hidden pt-10 md:pt-0"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 w-full max-w-7xl items-center">

                {/* LEFT: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-20 space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-950/30 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-widest backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        SYSTEM_ONLINE
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                        {home.name.split(" ")[0]} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">
                            {home.name.split(" ").slice(1).join(" ")}.
                        </span>
                    </h1>

                    {/* Added Headline */}
                    <h2 className="text-lg md:text-2xl text-cyan-700 dark:text-cyan-300 font-mono tracking-wide">
                        {home.headline}
                    </h2>

                    <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed font-light lg:border-l-2 lg:border-slate-300/50 lg:dark:border-white/10 lg:pl-6 mx-auto lg:mx-0">
                        {home.intro}
                    </p>

                    <div className="flex gap-4 md:gap-5 pt-4 justify-center lg:justify-start">
                        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-2 text-sm md:text-base">
                            View Work <ArrowRight size={18} />
                        </button>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 md:px-8 py-3 md:py-4 bg-slate-100 border border-slate-300 text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm md:text-base">
                            Contact Me
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT: Interactive 3D Tilt Card */}
                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px] order-1 lg:order-2 w-full">
                    <motion.div
                        style={{
                            rotateX: window.innerWidth >= 768 ? rotateX : 0,
                            rotateY: window.innerWidth >= 768 ? rotateY : 0,
                            borderColor: colors[currentColorIndex],
                            boxShadow: `0 0 30px ${colors[currentColorIndex]}40`
                        }}
                        whileHover={{ scale: window.innerWidth >= 768 ? 1.05 : 1, cursor: "grab" }}
                        drag={window.innerWidth >= 768}
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-xs md:max-w-md h-[460px] md:h-[560px] rounded-[2.5rem] bg-white/60 dark:bg-[#0f121a]/80 backdrop-blur-2xl border-2 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col items-center relative overflow-visible group transition-colors duration-1000 ease-in-out"
                    >
                        {/* Internal Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 dark:from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]" />

                        {/* --- FRAME ELEMENTS (Dynamic Icons) --- */}

                        {/* TOP LABEL - GitHub */}
                        <a
                            href="https://github.com/kumarmanish562"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-slate-500 dark:text-white/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors z-30 cursor-pointer whitespace-nowrap"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Github size={12} />
                            </motion.div>
                            <span className="text-[10px] font-mono tracking-widest uppercase">kumarmanish562</span>
                        </a>

                        {/* RIGHT LABEL - Email */}
                        <a
                            href="mailto:kumar.manish.in.0328@gmail.com"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-4 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-90 flex items-center gap-1.5 text-slate-500 dark:text-white/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors z-30 whitespace-nowrap cursor-pointer"
                        >
                            <span className="text-[10px] font-mono tracking-widest uppercase">kumar.manish.in.0328@gmail.com</span>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Mail size={12} className="-rotate-90" />
                            </motion.div>
                        </a>

                        {/* BOTTOM LABEL - LinkedIn */}
                        <a
                            href="https://linkedin.com/in/kumarmanish562"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-slate-500 dark:text-white/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors z-30 cursor-pointer whitespace-nowrap"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Linkedin size={12} />
                            </motion.div>
                            <span className="text-[10px] font-mono tracking-widest uppercase">kumarmanish562</span>
                        </a>

                        {/* LEFT LABEL - Discord */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText('kumarmanish562');
                                alert('Discord ID copied!');
                            }}
                            className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 flex items-center gap-1.5 text-slate-500 dark:text-white/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors z-30 whitespace-nowrap cursor-pointer"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <MessageSquare size={12} className="rotate-90" />
                            </motion.div>
                            <span className="text-[10px] font-mono tracking-widest uppercase">kumarmanish562</span>
                        </div>

                        {/* Image */}
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/5 z-10">
                            <img
                                src={home.profile_image}
                                alt={home.name}
                                className={`w-full h-full object-cover transition-all duration-1000 scale-105 ${
                                    // Mobile: Auto-cycle; Desktop: Hover-based
                                    window.innerWidth < 768
                                        ? (Math.floor(Date.now() / 2500) % 2 === 0 ? 'grayscale-0' : 'grayscale')
                                        : 'grayscale group-hover:grayscale-0'
                                    }`}
                                onError={(e) => { e.target.src = 'https://placehold.co/400x600/111827/00f3ff?text=User'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-black/90 via-transparent to-transparent group-hover:from-black/90 transition-all duration-700"></div>

                            <div className="absolute bottom-8 left-6 z-10 text-left">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors duration-700">{home.name}</h2>
                                <p className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-400 font-mono text-xs tracking-wider mt-1 opacity-80 transition-colors duration-700">
                                    {home.social_handle || '@core_dev'}
                                </p>
                            </div>
                        </div>

                        {/* Drag Hint - Re-positioned to not conflict with labels */}
                        <div className="absolute top-6 right-6 p-2 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white transition-colors z-20">
                            <MousePointer2 size={14} />
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Home;