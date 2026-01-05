import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Background3D from './Background3D';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Layout = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    // Simple GSAP entrance for the layout
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="w-full min-h-screen text-white relative overflow-hidden font-display flex flex-col">
      {/* 3D Background */}
      <Background3D />

      {/* Top Navigation */}
      <TopBar />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="pl-16 pt-12 w-full relative z-10 flex flex-col min-h-screen"
      >
        <div ref={contentRef} className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;