import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';

// Components
import Layout from '/src/components/Layout';
import Terminal from '/src/components/Terminal';

// Pages
import Home from '/src/pages/Home';
import About from '/src/pages/About';
import Skills from '/src/pages/Skills';
import Projects from '/src/pages/Projects';
import Education from '/src/pages/Education';
import Experience from '/src/pages/Experience';
import Certifications from '/src/pages/Certifications';
import Resume from '/src/pages/Resume';
import Contact from '/src/pages/Contact';

const App = () => {
  const { viewMode } = usePortfolio();

  return (
    <BrowserRouter>
      {viewMode === 'terminal' ? (
        <Terminal />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="education" element={<Education />} />
            <Route path="experience" element={<Experience />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;