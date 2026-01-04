import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';

const Certifications = () => {
    const { portfolioData } = usePortfolio();
    const { certifications } = portfolioData || {};

    if (!certifications) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto space-y-8"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                Certifications
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-6 flex items-start gap-4 hover:bg-white/5 transition-colors"
                    >
                        <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple">
                            <Award size={24} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                            <p className="text-gray-400 mb-2">{cert.issuer}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                <Calendar size={12} />
                                {cert.date}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Certifications;
