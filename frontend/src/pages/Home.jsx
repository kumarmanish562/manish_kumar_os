import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, MousePointer2 } from 'lucide-react';

const Home = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { portfolioData } = usePortfolio();

    // --- 3D TILT LOGIC ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
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
            className="min-h-[85vh] flex items-center justify-center w-full px-4 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl items-center">

                {/* LEFT: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-20 space-y-8 order-2 lg:order-1"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        SYSTEM_ONLINE
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                        {home.name.split(" ")[0]} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            {home.name.split(" ").slice(1).join(" ")}.
                        </span>
                    </h1>

                    {/* Added Headline */}
                    <h2 className="text-xl md:text-2xl text-cyan-300 font-mono tracking-wide">
                        {home.headline}
                    </h2>

                    <p className="text-lg text-gray-400 max-w-xl leading-relaxed font-light border-l-2 border-white/10 pl-6">
                        {home.intro}
                    </p>

                    <div className="flex gap-5 pt-4">
                        <button onClick={() => navigate('/projects')} className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
                            View Work <ArrowRight size={18} />
                        </button>
                        <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
                            Contact Me
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT: Interactive 3D Tilt Card */}
                <div className="relative h-[600px] flex items-center justify-center perspective-[2000px] order-1 lg:order-2">
                    <motion.div
                        style={{ rotateX, rotateY }} // Apply the dynamic rotation here
                        whileHover={{ scale: 1.05, cursor: "grab" }}
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-80 h-[480px] rounded-[2.5rem] bg-[#0f121a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 flex flex-col items-center relative overflow-hidden group"
                    >
                        {/* Internal Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Image */}
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black border border-white/5">
                            <img
                                src={home.profile_image}
                                alt={home.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105"
                                onError={(e) => { e.target.src = 'https://placehold.co/400x600/111827/00f3ff?text=User'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                            <div className="absolute bottom-8 left-6 z-10 text-left">
                                <h2 className="text-3xl font-bold text-white">{home.name}</h2>
                                <p className="text-cyan-400 font-mono text-xs tracking-wider mt-1 opacity-80">
                                    {home.social_handle || '@core_dev'}
                                </p>
                            </div>
                        </div>

                        {/* Drag Hint */}
                        <div className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/50 group-hover:text-white transition-colors z-20">
                            <MousePointer2 size={16} />
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Home;