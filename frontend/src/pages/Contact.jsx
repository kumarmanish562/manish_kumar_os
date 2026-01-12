import React, { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Linkedin, Github, Send, Phone, Signal, Radio, ShieldCheck, CheckCircle2, Loader2, MapPin } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const { contact } = portfolioData || {};
    const [formStatus, setFormStatus] = useState('idle');

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Header Reveal
        tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
            .from(".header-line", { width: 0, duration: 0.8, ease: "power2.out" }, "-=0.3");

        // 2. Left Column (Channels) - Removed animation to ensure visibility
        // tl.from(".contact-channel", {
        //     x: -30,
        //     opacity: 0,
        //     stagger: 0.1,
        //     duration: 0.5,
        //     ease: "back.out(1.5)"
        // }, "-=0.5");

        // 3. Right Column (Form)
        tl.from(".secure-form", {
            x: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.8");

    }, { scope: containerRef });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setFormStatus('success');
            gsap.fromTo(".success-message",
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" }
            );
        }, 2000);
    };

    return (
        <div ref={containerRef} className="min-h-[85vh] w-full px-4 lg:px-8 pb-20 pt-10 flex items-center">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* LEFT COLUMN: Info & Channels */}
                <div className="space-y-12">

                    {/* Header */}
                    <div className="page-header space-y-4">
                        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs tracking-widest uppercase">
                            <Radio size={14} className="animate-pulse" />
                            <span>Signal_Strength: 100%</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            ESTABLISH <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">CONNECTION</span>
                        </h1>
                        <div className="header-line h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                        <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-md">
                            Open for collaborations and freelance opportunities. Initialize a secure handshake below.
                        </p>
                    </div>

                    {/* Channels Grid */}
                    <div className="space-y-4">
                        <ContactChannel
                            icon={Mail}
                            label="Encrypted Mail"
                            value={contact?.email || "kumar.manish.in.0328@gmail.com"}
                            href={`mailto:${contact?.email || "kumar.manish.in.0328@gmail.com"}`}
                            color="text-cyan-400"
                        />
                        <ContactChannel
                            icon={Phone}
                            label="Voice Line"
                            value={contact?.phone || "+91-9334170932"}
                            href={`tel:${contact?.phone || "+919334170932"}`}
                            color="text-green-400"
                        />
                        <ContactChannel
                            icon={MapPin}
                            label="Base of Operations"
                            value="Bhilai, Chhattisgarh / Remote"
                            href="#"
                            color="text-pink-400"
                        />
                        <ContactChannel
                            icon={Linkedin}
                            label="LinkedIn Uplink"
                            value="kumarmanish562"
                            href={contact?.linkedin || "https://www.linkedin.com/in/kumarmanish562"}
                            color="text-blue-400"
                        />
                        <ContactChannel
                            icon={Github}
                            label="Code Repository"
                            value="kumarmanish562"
                            href={contact?.github || "https://github.com/kumarmanish562"}
                            color="text-purple-400"
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: Secure Form */}
                <div className="secure-form relative">

                    {/* Background Decorative Elements */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>

                    <div className="relative bg-white/60 dark:bg-[#0f121a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">

                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-white/5 pb-4">

                            <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400">
                                <ShieldCheck size={12} />
                                <span className="text-slate-500 dark:text-current">SECURE_TRANSMISSION</span>
                            </div>
                        </div>

                        {formStatus === 'success' ? (
                            <div className="success-message h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                    <CheckCircle2 size={40} className="text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Transmission Complete</h3>
                                    <p className="text-slate-600 dark:text-gray-400 max-w-xs mx-auto">
                                        Your message has been encrypted and delivered to the mainframe.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-cyan-400 transition-colors"
                                >
                                    Initialize New Uplink
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="group">
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500 mb-2 uppercase tracking-wider group-focus-within:text-cyan-500 dark:group-focus-within:text-cyan-300">
                                        // Sender_ID
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className="w-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-cyan-500/5 transition-all"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500 mb-2 uppercase tracking-wider group-focus-within:text-cyan-500 dark:group-focus-within:text-cyan-300">
                                        // Reply_Frequency
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@domain.com"
                                        className="w-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-cyan-500/5 transition-all"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500 mb-2 uppercase tracking-wider group-focus-within:text-cyan-500 dark:group-focus-within:text-cyan-300">
                                        // Payload_Data
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Initialize message sequence..."
                                        className="w-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-cyan-500/5 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>ENCRYPTING DATA...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>INITIATE UPLOAD</span>
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

const ContactChannel = ({ icon: Icon, label, value, href, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-channel group flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.08] transition-all cursor-pointer shadow-sm"
    >
        <div className={`p-3 rounded-lg bg-black/5 dark:bg-black/30 ${color} group-hover:scale-110 transition-transform shrink-0`}>
            <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-wider mb-1">{label}</div>
            <div className="text-slate-900 dark:text-white font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors break-all md:break-normal">
                {value}
            </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-white/30 shrink-0">
            <Signal size={18} />
        </div>
    </a>
);

export default Contact;