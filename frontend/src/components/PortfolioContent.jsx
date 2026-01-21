import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Projects from '../pages/Projects';
import Experience from '../pages/Experience';
import Education from '../pages/Education';
import Certifications from '../pages/Certifications';
import Resume from '../pages/Resume';
import Contact from '../pages/Contact';
import Footer from './Footer';

const PortfolioContent = () => {
    return (
        <div className="flex flex-col w-full gap-8 md:gap-16">
            <section id="home" className="min-h-screen flex flex-col justify-center py-4 md:py-0">
                <Home />
            </section>
            <section id="about" className="min-h-screen flex flex-col justify-center py-8">
                <About />
            </section>
            <section id="skills" className="min-h-screen flex flex-col justify-center py-8">
                <Skills />
            </section>
            <section id="projects" className="min-h-screen flex flex-col justify-center py-8">
                <Projects />
            </section>
            <section id="experience" className="min-h-screen flex flex-col justify-center py-8">
                <Experience />
            </section>
            <section id="education" className="min-h-screen flex flex-col justify-center py-8">
                <Education />
            </section>
            <section id="certifications" className="min-h-screen flex flex-col justify-center py-8">
                <Certifications />
            </section>
            <section id="resume" className="min-h-screen flex flex-col justify-center py-8">
                <Resume />
            </section>
            <section id="contact" className="min-h-screen flex flex-col justify-center py-8">
                <Contact />
            </section>
            <Footer />
        </div>
    );
};

export default PortfolioContent;
