import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, ArrowRight, MousePointer2, Code2, Cpu, Globe } from 'lucide-react';

const Home = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    return (
        <div ref={containerRef} className="h-full flex items-center justify-center min-h-[80vh] w-full">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl items-center px-4">

                {/* LEFT COLUMN: Text Content (Span 7 cols) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 z-20 pointer-events-none"
                >
                    {/* New "Tagline" Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-md">
                        <Globe size={12} />
                        <span>BASED IN INDIA</span>
                    </div>

                    {/* Massive Name Headline */}
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                        Manish <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            Kumar.
                        </span>
                    </h1>

                    {/* Detailed Bio / Intro */}
                    <div className="space-y-4 max-w-xl mb-8">
                        <h2 className="text-2xl md:text-3xl font-light text-gray-200">
                            Full Stack Developer <span className="text-gray-600">|</span> AI Enthusiast
                        </h2>

                        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                            I craft high-performance digital ecosystems using <span className="text-cyan-400 font-bold">React</span>, <span className="text-yellow-400 font-bold">Python</span>, and <span className="text-green-400 font-bold">Flask</span>.
                            Currently bridging the gap between futuristic UI design and intelligent backend systems.
                        </p>

                        {/* Tech Stack Mini-List */}
                        <div className="flex gap-4 text-xs font-mono text-gray-500 pt-2">
                            <span className="flex items-center gap-1"><Code2 size={12} /> React / Vite</span>
                            <span className="flex items-center gap-1"><Cpu size={12} /> Machine Learning</span>
                            <span className="flex items-center gap-1"><Globe size={12} /> REST APIs</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pointer-events-auto">
                        <button
                            onClick={() => navigate('/projects')}
                            className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-none overflow-hidden transition-all hover:bg-cyan-50"
                        >
                            <div className="absolute inset-0 border-l-4 border-cyan-500 transition-all duration-300 group-hover:border-l-8" />
                            <span className="relative flex items-center gap-2">
                                View Projects <ArrowRight size={16} />
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/contact')}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/5 transition-all"
                        >
                            Contact Me
                        </button>
                    </div>
                </motion.div>


                {/* RIGHT COLUMN: Floating Card (Span 5 cols) */}
                <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center perspective-1000">
                    <motion.div
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        whileHover={{ scale: 1.02, rotateY: 5, cursor: "grab" }}
                        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [-15, 15, -15],
                            rotate: [2, -2, 2]
                        }}
                        transition={{
                            opacity: { duration: 0.5 },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative w-80 h-[450px] rounded-3xl bg-[#0f121a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group z-30"
                    >
                        {/* Holographic Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Profile Image Area */}
                        <div className="h-full w-full relative">
                            <img
                                src="/profile.jpg"
                                alt="Manish Kumar"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Dark Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </div>

                        {/* Floating Info Card on bottom */}
                        <div className="absolute bottom-6 left-4 right-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Manish Kumar</h3>
                                    <p className="text-cyan-400 text-xs font-mono">@manish_dev</p>
                                </div>
                                <div className="flex gap-3">
                                    <Github size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                                    <Linkedin size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Drag Indicator */}
                        <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/50 group-hover:text-white transition-colors">
                            <MousePointer2 size={14} />
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Home;