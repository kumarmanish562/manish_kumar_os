import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';

// Components
import Layout from '/src/components/Layout';
import Terminal from '/src/components/Terminal';

// Pages imports moved to PortfolioContent


const App = () => {
  const { viewMode } = usePortfolio();

  return (
    <BrowserRouter>
      {viewMode === 'terminal' ? (
        <Terminal />
      ) : (
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;