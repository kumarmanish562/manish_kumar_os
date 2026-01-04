import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { motion } from 'framer-motion';

const About = () => {
    const { portfolioData } = usePortfolio();
    const { about } = portfolioData || {};

    if (!about) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                About Me
            </h1>

            <div className="glass-panel p-8 space-y-6">
                <div>
                    <h3 className="text-xl text-neon-blue font-mono mb-2">// Bio</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {about.bio}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-neon-blue font-mono mb-2">// Skills Summary</h3>
                    <p className="text-gray-300 leading-relaxed">
                        {about.skills_summary}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-neon-blue font-mono mb-2">// Goal</h3>
                    <p className="text-gray-300 leading-relaxed">
                        {about.goal}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
