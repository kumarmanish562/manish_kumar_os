import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // 1. Theme State (Initialize from localStorage or default to 'dark')
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  // 2. View Mode State (GUI vs Terminal)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-view-mode') || 'gui';
    }
    return 'gui';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-view-mode', viewMode);
  }, [viewMode]);

  // 3. Data State
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('portfolio-theme', newTheme);
      return newTheme;
    });
  };

  // 5. Toggle View Mode Function
  const toggleViewMode = (mode) => {
    if (mode) {
      setViewMode(mode);
    } else {
      setViewMode((prev) => (prev === 'gui' ? 'terminal' : 'gui'));
    }
  };

  // 6. Apply Theme to Body (Tailwind dark mode handling)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // 7. Fetch data from Flask backend (CRITICAL: Preserved from original)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const value = {
    theme,
    toggleTheme,
    viewMode,
    toggleViewMode,
    portfolioData,
    loading
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
