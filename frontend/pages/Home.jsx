import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../src/context/PortfolioContext'; // Adjust import
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Home = () => {
    const { portfolioData, loading } = usePortfolio();
    const profileRef = useRef(null);
    const contentRef = useRef(null);
    const floatingShapesRef = useRef([]);

    useEffect(() => {
        if (loading || !profileRef.current) return;

        // 1. Antigravity Float Animation for Profile
        gsap.to(profileRef.current, {
            y: -20,
            rotation: 2,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // 2. Gentle parallax for background shapes
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(profileRef.current, {
                x: x,
                y: y - 20, // maintain float offset
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [loading]);

    if (loading) return <div className="text-center mt-20">Loading Portfolio OS...</div>;

    // Safely access data
    const { home } = portfolioData || {};
    const { name, headline, intro, buttons } = home || {
        name: "Loading...", headline: "Please wait", intro: "", buttons: []
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-12"
        >
            {/* Left Content */}
            <div className="flex-1 space-y-6 max-w-xl z-10 order-2 md:order-1">
                <div className="overflow-hidden">
                    <motion.h2
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-neon-blue font-mono text-sm tracking-widest mb-2"
                    >
                        HACKING THE REALITY
                    </motion.h2>
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                    >
                        {name}
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-400 font-light border-l-2 border-neon-purple pl-4"
                >
                    {headline}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 leading-relaxed"
                >
                    {intro}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4 pt-4"
                >
                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            className={`glass-btn flex items-center gap-2 group ${idx === 0 ? 'border-neon-blue/50 text-neon-blue' : 'text-white'}`}
                        >
                            {btn.label}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </motion.div>

                <div className="flex gap-6 pt-8 text-gray-400">
                    <Github className="hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="hover:text-blue-400 cursor-pointer transition-colors" />
                    <Mail className="hover:text-red-400 cursor-pointer transition-colors" />
                </div>
            </div>

            {/* Right: Antigravity Profile */}
            <div className="flex-1 flex justify-center items-center relative order-1 md:order-2">
                {/* Floating Glow Behind */}
                <div className="absolute w-[300px] h-[300px] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute w-[200px] h-[200px] bg-neon-blue/20 rounded-full blur-[80px] translate-x-20 translate-y-20"></div>

                {/* Profile Container */}
                <div
                    ref={profileRef}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/10 p-2 glass-panel"
                >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                        <img
                            src="https://via.placeholder.com/400"
                            alt="Profile"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Scanline overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
