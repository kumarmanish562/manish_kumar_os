import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Phone } from 'lucide-react';

const Contact = () => {
    const { portfolioData } = usePortfolio();
    const { contact } = portfolioData || {};
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate sending
        setTimeout(() => setFormStatus('success'), 2000);
    };

    if (!contact) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12"
        >
            {/* Contact Info */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                    Get In Touch
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
                </p>

                <div className="space-y-4">
                    <a href={`mailto:${contact.email}`} className="glass-panel p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                        <div className="p-3 bg-neon-blue/10 rounded-full text-neon-blue group-hover:scale-110 transition-transform">
                            <Mail size={20} />
                        </div>
                        <span className="text-gray-300">{contact.email}</span>
                    </a>

                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="glass-panel p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
                            <Linkedin size={20} />
                        </div>
                        <span className="text-gray-300">LinkedIn Profile</span>
                    </a>

                    <a href={contact.github} target="_blank" rel="noreferrer" className="glass-panel p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                        <div className="p-3 bg-gray-500/10 rounded-full text-gray-300 group-hover:scale-110 transition-transform">
                            <Github size={20} />
                        </div>
                        <span className="text-gray-300">GitHub Profile</span>
                    </a>

                    {contact.phone && (
                        <div className="glass-panel p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                            <div className="p-3 bg-green-500/10 rounded-full text-green-500 group-hover:scale-110 transition-transform">
                                <Phone size={20} />
                            </div>
                            <span className="text-gray-300">{contact.phone}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

                {formStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                            <Send size={30} />
                        </div>
                        <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                        <p className="text-gray-400 mt-2">I'll get back to you as soon as possible.</p>
                        <button onClick={() => setFormStatus('idle')} className="mt-6 text-neon-blue hover:underline">Send another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors resize-none"
                                placeholder="Hello, I'd like to work with you..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full glass-btn py-3 mt-2 bg-neon-blue/10 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20 flex items-center justify-center gap-2"
                        >
                            {formStatus === 'submitting' ? 'Sending...' : (
                                <>
                                    Send Message
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </motion.div>
    );
};

export default Contact;
