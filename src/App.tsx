import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { initAnalytics, trackPageView } from './utils/analytics';
import { ThemeProvider } from './contexts/ThemeContext';
import MorphingBlob from './components/MorphingBlob';
import { Particles } from './components/magicui/particles';
import PortfolioNeuralNetwork from './components/PortfolioNeuralNetwork';
import Navbar from './components/Navbar';
import TimelineNavbar from './components/TimelineNavbar';

import projectData from './projectData';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const ProjectDetail = lazy(() => import('./components/projects/ProjectDetail'));
const Contact = lazy(() => import('./components/Contact'));
const Resume = lazy(() => import('./components/Resume'));

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'resume', 'testimonials', 'blog', 'contact'];

const App: React.FC = () => {
  const heroContentRef = React.useRef(null);
  const isInView = useInView(heroContentRef, { amount: 0.5 });

  // Initialize analytics on app mount
  useEffect(() => {
    initAnalytics();
    trackPageView(window.location.pathname);
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);
  return (
    <ThemeProvider>
      <Router>
        <TimelineNavbar />
        <div className="ml-0 md:ml-20">
          <main className="bg-black min-h-screen pb-16 text-white">
          <Routes>
            <Route path="/" element={
              <>
                {/* Anchor elements for smooth scrolling */}
                <div id="hero-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                <div id="about-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                <div id="skills-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                <div id="projects-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                <div id="resume-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                <div id="contact-anchor" className="absolute top-0" style={{ height: '1px' }}></div>
                
                <div className="space-y-12 md:space-y-24 mt-1">
                  <motion.section
                    className="relative flex flex-col md:flex-row flex-grow items-center px-4 sm:px-8 md:px-16 pt-8 md:pt-12 pb-0 max-w-none ml-0 overflow-visible mb-[20rem] md:mb-40"
                    id="hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Mobile: custom layout, Desktop: flex layout */}
                    <div className="w-full md:hidden flex flex-col items-center text-center mb-8">
                      <span className="text-base font-semibold text-white tracking-wide mb-2">Hi, I'm</span>
                      <h1 className="text-4xl font-black text-white leading-tight mb-2">
                        Mayuresh Mankar
                        <span className="block mt-3 h-1 w-24 rounded-full bg-white/60 mx-auto" />
                      </h1>
                      <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">I build scalable digital products and SaaS platforms that power businesses and startups.</h2>
                      <div className="flex w-full items-center justify-between mb-4 gap-4">
                        <p className="text-xs text-white font-medium tracking-wide text-left flex-1">
                          Computer Science Professional <span className="mx-1 text-white/40">|</span> SaaS-Focused Developer <span className="mx-1 text-white/40">|</span> Startup Technologist
                        </p>
                        <img
                          src="/assets/man5k.png"
                          alt="AI Face"
                          className="w-24 h-24 object-contain"
                          style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 2px #00aaff)' }}
                        />
                      </div>
                      <p className="text-sm text-white/80 max-w-2xl mb-4 mt-2 font-normal">I specialize in React.js, Next.js, Node.js, and MongoDB—delivering fast, scalable, and maintainable solutions with clean architecture and modern design. Currently advancing my skills in Java DSA and exploring Machine Learning to create smarter, more efficient products.</p>
                      <p className="text-sm text-white/90 max-w-2xl mb-8 font-semibold italic">I don't just build websites—<br />I build products that grow businesses.</p>
                      <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
                        <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center">View My Work</a>
                        <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center">Contact Me</a>
                      </div>
                    </div>
                    {/* Desktop: flex layout, image right, text left */}
                    <div className="hidden md:flex w-full">
                      <div className="order-1 md:order-2 w-1/2 flex items-center justify-center h-64 sm:h-80 md:h-auto z-0 pointer-events-none" style={{ minHeight: '220px' }}>
                        <div className="relative overflow-visible h-full w-full flex items-center justify-center">
                          <motion.img
                            src="/assets/man5k.png"
                            alt="AI Face"
                            className="relative m-auto max-h-[400px] lg:max-h-[500px] max-w-[90%] object-contain z-0 pointer-events-none"
                            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 2px #00aaff)' }}
                            initial={{ opacity: 0, x: -80 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                          <PortfolioNeuralNetwork className="absolute inset-0 w-full h-full z-10" />
                        </div>
                      </div>
                      <div className="order-2 md:order-1 flex flex-col justify-center items-start text-left md:basis-[65%] w-1/2 h-full z-10">
                        <motion.div
                          ref={heroContentRef}
                          initial={{ opacity: 0, y: 40 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="flex-1 flex flex-col justify-start items-start text-left"
                        >
                          <span className="text-base sm:text-lg font-semibold text-white tracking-wide mb-2 text-left">
                            Hi, I'm
                          </span>
                          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-2 relative text-left">
                            Mayuresh Mankar
                            <span className="block mt-3 h-1 w-24 rounded-full bg-white/60" />
                          </h1>
                          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 tracking-tight text-left">
                            I build scalable digital products and SaaS platforms that power businesses and startups.
                          </h2>
                          <p className="text-base sm:text-lg text-white mb-2 font-medium tracking-wide text-left">
                            Computer Science Professional <span className="mx-2 text-white/40">|</span> SaaS-Focused Developer <span className="mx-2 text-white/40">|</span> Startup Technologist
                          </p>
                          <p className="text-sm sm:text-base text-white/80 max-w-2xl mb-4 mt-2 font-normal text-left">
                            I specialize in React.js, Next.js, Node.js, and MongoDB—delivering fast, scalable, and maintainable solutions with clean architecture and modern design. Currently advancing my skills in Java DSA and exploring Machine Learning to create smarter, more efficient products.
                          </p>
                          <p className="text-sm sm:text-base text-white/90 max-w-2xl mb-8 font-semibold italic text-left">
                            I don't just build websites—<br className="hidden md:inline" />I build products that grow businesses.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 mt-2 text-left w-full">
                            <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center">View My Work</a>
                            <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center">Contact Me</a>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.section>
                  <Suspense fallback={<div>Loading...</div>}>
                    <div id="about" className="py-12 md:py-24 mb-[18rem] md:mb-20">
                      <About />
                    </div>
                    <div id="skills" className="py-12 md:py-24">
                      <Skills />
                    </div>
                    <div id="projects" className="py-12 md:py-24">
                      <Projects />
                    </div>
                    <div id="resume" className="py-12 md:py-24">
                      <Resume />
                    </div>
                    <div id="testimonials" className="py-12 md:py-24">
                      <Testimonials />
                    </div>
                    <div id="blog" className="py-12 md:py-24">
                      <Blog />
                    </div>

                    <div id="contact" className="py-12 md:py-24">
                      <Contact />
                    </div>
                  </Suspense>
                </div>
              </>
            } />
            <Route path="/projects/:projectId" element={
              <Suspense fallback={<div>Loading Project...</div>}>
                <ProjectDetail />
              </Suspense>
            } />
          </Routes>
        </main>
        {/* Footer - All Black, White Text */}
        <footer className="bg-black border-t border-white mt-16 py-10 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-6">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-white">Mayuresh Mankar</h3>
              <p className="text-white mt-2">Building digital experiences that matter</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div>
                <h4 className="font-semibold text-white mb-2">Navigation</h4>
                <ul className="flex flex-col md:flex-row gap-4">
                  <li><a href="#hero" className="hover:underline transition">Home</a></li>
                  <li><a href="#about" className="hover:underline transition">About</a></li>
                  <li><a href="#skills" className="hover:underline transition">Skills</a></li>
                  <li><a href="#projects" className="hover:underline transition">Projects</a></li>
                  <li><a href="#resume" className="hover:underline transition">Resume</a></li>
                  <li><a href="#contact" className="hover:underline transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/MayureshMankar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <img src="/assets/icons8-github-logo-94.png" alt="GitHub" className="w-8 h-8 hover:scale-110 transition grayscale" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-white mt-8 text-sm">
            <p>Built with <span className="text-white">❤</span> using React & Vite</p>
            <p>&copy; {new Date().getFullYear()} Mayuresh Mankar. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;