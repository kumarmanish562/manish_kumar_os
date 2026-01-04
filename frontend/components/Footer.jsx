import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-12 border-t border-white/5 bg-[#0d1117]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div className="mb-4 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} Manish Kumar. All rights reserved.</p>
                    <p className="text-xs mt-1">Built with React, Flask & Antigravity</p>
                </div>

                <div className="flex items-center space-x-6">
                    <a href="#" className="hover:text-neon-blue transition-colors"><Github size={18} /></a>
                    <a href="#" className="hover:text-neon-blue transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-neon-blue transition-colors"><Twitter size={18} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
