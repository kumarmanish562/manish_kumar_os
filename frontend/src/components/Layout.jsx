import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Background3D from "./Background3D";
import FullScreenTerminal from "./FullScreenTerminal";
import PortfolioContent from "./PortfolioContent";
import { gsap } from "gsap";

const Layout = () => {
  const { viewMode } = usePortfolio();
  const contentRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section on route change
  useEffect(() => {
    // Prevent auto-scrolling if the URL change was triggered by the user scrolling (fromScroll: true)
    if (location.state?.fromScroll) return;

    if (contentRef.current) {
      const sectionId = location.pathname === '/' ? 'home' : location.pathname.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        // Determine offset based on view (optional, but 'start' is usually good)
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname]);

  // Sync scroll to URL
  const handleSectionChange = (sectionId) => {
    const path = sectionId === 'home' ? '/' : `/${sectionId}`;
    if (location.pathname !== path) {
      // Pass state to indicate this navigation was caused by scrolling
      navigate(path, { replace: true, state: { fromScroll: true } });
    }
  };

  // Entrance Animation
  useEffect(() => {
    if (viewMode === 'gui' && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.98, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
    }
  }, [viewMode]);

  if (viewMode === 'terminal') return <FullScreenTerminal />;

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden text-gray-200">

      {/* 1. Background Layer (Fixed & Behind) */}
      <Background3D />

      {/* 2. UI Layer (TopBar & Sidebar) - Clickable */}
      <div className="relative z-50 pointer-events-auto">
        <TopBar />
        <Sidebar scrollContainer={contentRef} onSectionChange={handleSectionChange} />
      </div>

      {/* 3. Content Layer - Scrollable */}
      {/* 'pointer-events-none' on wrapper allows clicks to pass through empty spaces */}
      <div className="absolute inset-0 top-14 left-0 lg:left-20 overflow-hidden pointer-events-none z-10 w-full">
        <main
          ref={contentRef}
          className="h-full w-full overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-20 md:pb-8 pointer-events-auto scroll-smooth custom-scrollbar"
        >
          <div className="max-w-7xl mx-auto min-h-[85vh] flex flex-col">
            <PortfolioContent />
          </div>
        </main>
      </div>

    </div>
  );
};

export default Layout;
