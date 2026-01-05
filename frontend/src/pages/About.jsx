
import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Code, Cpu, Globe, Terminal } from 'lucide-react';

const About = () => {
    const { portfolioData } = usePortfolio();
    const { about } = portfolioData || {};
    const cardRef = useRef(null);

    useEffect(() => {
        if (!cardRef.current) return;

        // Floating animation for the "Data Card"
        gsap.to(cardRef.current, {
            y: -15,
            rotationX: 5,
            rotationY: 5,
            duration: 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // Tilt effect on mouse move
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;

            gsap.to(cardRef.current, {
                rotateY: x,
                rotateX: -y,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (!about) return <div className="text-center mt-20 text-neon-blue animate-pulse">Initializing Data Stream...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-12 px-4"
        >
            {/* Left: Text Content */}
            <div className="flex-1 space-y-8 max-w-2xl z-10">
                <div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        className="h-1 bg-neon-blue mb-4"
                    />
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight"
                    >
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">IDENTITY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-neon-blue/60 font-mono text-sm"
                    >
                        // ACCESSING RESTRICTED BIOS_DATA...
                    </motion.p>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6 border-l-4 border-l-neon-purple"
                >
                    <h3 className="text-xl text-white font-semibold mb-3 flex items-center gap-2">
                        <Terminal size={20} className="text-neon-purple" />
                        Operator Bio
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                        {about.bio}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel p-5"
                    >
                        <h3 className="text-lg text-neon-blue font-mono mb-2 flex items-center gap-2">
                            <Cpu size={18} /> Core Capabilities
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {about.skills_summary}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="glass-panel p-5"
                    >
                        <h3 className="text-lg text-neon-blue font-mono mb-2 flex items-center gap-2">
                            <Globe size={18} /> Current Mission
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {about.goal}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right: Floating Data Card (Visual) */}
            <div className="flex-1 flex justify-center items-center perspective-1000 relative">
                {/* Background Glows */}
                <div className="absolute w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

                <div
                    ref={cardRef}
                    className="w-full max-w-sm"
                >
                    <div className="glass-panel p-1 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl transform-style-3d">
                        <div className="bg-black/80 rounded-xl p-6 relative overflow-hidden h-[400px] flex flex-col items-center justify-center border border-white/5">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            <div className="relative z-10 text-center space-y-6">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full p-[2px] animate-spin-slow">
                                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                        <Code size={40} className="text-white" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white">Full Stack Dev</h2>
                                    <p className="text-gray-400 text-sm font-mono mt-1">Level 25 Architect</p>
                                </div>

                                <div className="flex justify-center gap-2 flex-wrap px-4">
                                    {['React', 'Node', 'Python', 'ThreeJS'].map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neon-blue">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mt-8">
                                    <div className="h-full bg-neon-blue w-[85%] shadow-[0_0_10px_#00f3ff]"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-mono">
                                    <span>SYSTEM_INTEGRITY</span>
                                    <span>98%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
