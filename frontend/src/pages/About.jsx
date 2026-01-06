import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Code2, Cpu, Globe, Terminal, Database, Server, Zap } from 'lucide-react';

const About = () => {
    const cardRef = useRef(null);

    // --- 3D Tilt & Float Animation ---
    useEffect(() => {
        if (!cardRef.current) return;

        // 1. Idle Floating Animation (Zero-G)
        gsap.to(cardRef.current, {
            y: -20,
            rotationX: 5,
            rotationY: 5,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // 2. Mouse Tilt Interaction
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20; // Tilt intensity
            const y = (clientY / window.innerHeight - 0.5) * 20;

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

    // --- Data ---
    const skills = [
        { name: 'React / Vite', icon: Code2, color: 'text-cyan-400' },
        { name: 'Python / Flask', icon: Server, color: 'text-yellow-400' },
        { name: 'Machine Learning', icon: Cpu, color: 'text-purple-400' },
        { name: 'Tailwind CSS', icon: Zap, color: 'text-blue-400' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 px-4 w-full"
        >
            {/* LEFT COLUMN: Narrative & Info */}
            <div className="flex-1 space-y-8 max-w-2xl z-10">

                {/* Header Section */}
                <div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        transition={{ duration: 1 }}
                        className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mb-6"
                    />
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none"
                    >
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">IDENTITY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-cyan-500/80 font-mono text-sm tracking-widest"
                    >
                        // ACCESSING RESTRICTED BIOS_DATA...
                    </motion.p>
                </div>

                {/* Main Bio Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 rounded-2xl bg-[#0f121a]/60 backdrop-blur-md border border-white/10 relative overflow-hidden group"
                >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 p-3">
                        <Terminal size={24} className="text-white/20" />
                    </div>

                    <h3 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Operator Profile
                    </h3>

                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                        I am <strong className="text-white font-medium">Manish Kumar</strong>, a passionate Full Stack Developer and B.Tech student exploring the intersection of modern web architectures and Artificial Intelligence.
                        My mission is to build digital ecosystems that feel alive—combining robust Python backends with fluid, antigravity React frontends.
                    </p>
                </motion.div>

                {/* Two Column Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Mission Protocol */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl bg-[#0f121a]/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 transition-colors"
                    >
                        <h3 className="text-md text-cyan-400 font-mono mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <Globe size={16} /> Mission Protocol
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            To democratize AI tools and build the "Operating Systems" of the web. Currently architecting intelligent threat detection systems and portfolio platforms.
                        </p>
                    </motion.div>

                    {/* Core Stack List */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl bg-[#0f121a]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/30 transition-colors"
                    >
                        <h3 className="text-md text-purple-400 font-mono mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <Database size={16} /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill.name} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>


            {/* RIGHT COLUMN: Floating 3D Identity Card */}
            <div className="flex-1 flex justify-center items-center perspective-1000 relative py-10 lg:py-0">

                {/* Background Glow */}
                <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>

                <div ref={cardRef} className="w-full max-w-sm cursor-grab active:cursor-grabbing">

                    {/* Glass Container */}
                    <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl">

                        {/* Inner Card Content */}
                        <div className="bg-[#050505]/90 rounded-[22px] p-8 relative overflow-hidden h-[480px] flex flex-col items-center border border-white/5">

                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                            {/* Avatar / Icon Circle */}
                            <div className="relative z-10 mt-6 mb-6">
                                <div className="w-32 h-32 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow">
                                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative border-4 border-black">
                                        <img
                                            src="https://placehold.co/200x200/1e293b/00f3ff?text=MK"
                                            alt="Manish"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_#22d3ee]">
                                    Online
                                </div>
                            </div>

                            {/* Name & Title */}
                            <div className="relative z-10 text-center space-y-2 mb-8">
                                <h2 className="text-3xl font-bold text-white tracking-tight">Manish Kumar</h2>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm font-mono font-medium">
                                    FULL STACK DEVELOPER
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="relative z-10 w-full grid grid-cols-2 gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-white">20+</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Projects</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-white">LVL 4</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Experience</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative z-10 w-full mt-auto">
                                <div className="flex justify-between text-[10px] text-gray-400 mb-2 uppercase tracking-wider">
                                    <span>System Integrity</span>
                                    <span className="text-green-400">98%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-green-400 w-[98%] shadow-[0_0_10px_#22d3ee]"></div>
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