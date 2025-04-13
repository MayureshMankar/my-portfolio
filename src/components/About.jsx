import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaSync, FaCode, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useLayoutEffect(() => {
    if (frontRef.current && backRef.current && containerRef.current) {
      const frontHeight = frontRef.current.offsetHeight;
      const backHeight = backRef.current.offsetHeight;
      containerRef.current.style.minHeight = `${Math.max(frontHeight, backHeight)}px`;
    }
  }, [flipped]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 px-4 w-full flex flex-col items-center justify-center min-h-screen"
      style={{ background: '#000000' }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Left subtle grid tiles - adjust size and position based on screen */}
      <div className="hidden lg:flex flex-col gap-4 absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: -200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: -200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
          }}
        >
          <span className="text-white/70 text-xs lg:text-sm font-semibold italic">"Innovate"</span>
        </motion.div>
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: -200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: -200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.4 }
          }}
        >
          <span className="text-white/70 text-xs lg:text-sm font-semibold italic">"Collaborate"</span>
        </motion.div>
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: -200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: -200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.6 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.6 }
          }}
        >
          <span className="text-white/70 text-xs lg:text-sm font-semibold italic">"Deliver"</span>
        </motion.div>
      </div>

      {/* Right subtle grid tiles with icons - adjust size and position based on screen */}
      <div className="hidden lg:flex flex-col gap-4 absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: 200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: 200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.3 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.3 }
          }}
        >
          <span className="text-white/70 text-lg lg:text-xl"><FaCode /></span>
        </motion.div>
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: 200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: 200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.5 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.5 }
          }}
        >
          <span className="text-white/70 text-lg lg:text-xl"><FaLightbulb /></span>
        </motion.div>
        <motion.div
          className="w-32 h-16 lg:w-40 lg:h-20 xl:w-64 xl:h-32 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, x: 200, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 0.7, 
            x: 0, 
            scale: 1
          } : { opacity: 0, x: 200, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeOut', delay: 0.7 },
            x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 },
            scale: { duration: 0.8, ease: 'easeOut', delay: 0.7 }
          }}
        >
          <span className="text-white/70 text-lg lg:text-xl"><FaSync /></span>
        </motion.div>
      </div>

      {/* About content with flip animation */}
      <div className="relative z-10 w-full max-w-3xl mx-auto py-12 px-4 md:px-12" style={{ perspective: '1200px' }} ref={containerRef}>
        <motion.div
          className="w-full h-full"
          animate={flipped ? 'back' : 'front'}
          variants={{
            front: { rotateY: 0, scale: 1, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' },
            back: { rotateY: 180, scale: 1, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' },
            flipping: { scale: 0.96, boxShadow: '0 16px 48px 0 rgba(0,0,0,0.45)' },
          }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          style={{ transformStyle: 'preserve-3d', minHeight: '340px', position: 'relative' }}
          onUpdate={latest => {
            const y = latest.rotateY || 0;
            if (containerRef.current) {
              if (y > 80 && y < 100) {
                containerRef.current.style.transform = 'scale(0.96)';
                containerRef.current.style.boxShadow = '0 16px 48px 0 rgba(0,0,0,0.45)';
              } else {
                containerRef.current.style.transform = 'scale(1)';
                containerRef.current.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.25)';
              }
            }
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            {!flipped && (
              <motion.div
                key="front"
                ref={frontRef}
                className="absolute inset-0 w-full h-full flex flex-col justify-center"
                style={{ backfaceVisibility: 'hidden' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white text-center" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
                  About Me
                </h2>
                <p className="text-lg md:text-xl mb-6 text-white/90 text-center">
                  I'm Mayuresh Mankar — a product-focused engineer passionate about transforming ideas into scalable digital products. With a foundation in Computer Science and a focus on business-driven solutions, I bridge technology with real-world outcomes.
                </p>
                <p className="text-base md:text-lg mb-6 text-white/80 text-center">
                  My expertise spans full-stack development and backend architecture, with a strong emphasis on clean, maintainable systems designed for scale. I help startups and businesses turn concepts into reliable, growth-oriented products.
                </p>
                <p className="text-base md:text-lg mb-8 text-white/70 text-center">
                  I believe impactful products are built through collaboration, strategic thinking, and continuous iteration—combining engineering precision with a product-first approach.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
                  <button
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 bg-transparent"
                    onClick={() => setFlipped(true)}
                  >
                    More About Me <FaSync className="inline ml-2" />
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center bg-transparent"
                  >
                    Let's Connect
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center bg-transparent flex items-center justify-center"
                  >
                    <FaSync className="mr-2" /> Download Resume
                  </a>
                </div>
              </motion.div>
            )}
            {flipped && (
              <motion.div
                key="back"
                ref={backRef}
                className="absolute inset-0 w-full h-full flex flex-col justify-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">More About Me</h3>
                <ul className="space-y-4 mb-8 text-white/80 text-base md:text-lg text-center">
                  <li>I love tackling complex problems and turning them into elegant, scalable solutions.</li>
                  <li>My approach is always user-focused, blending technical depth with real-world impact.</li>
                  <li>I thrive in collaborative teams and believe the best products are built together.</li>
                  <li>Continuous learning and curiosity drive my growth as a developer and product thinker.</li>
                  <li>Outside of coding, I enjoy reading, exploring new tech, and sharing knowledge with others.</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
                  <button
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 bg-transparent"
                    onClick={() => setFlipped(false)}
                  >
                    Back to Story <FaSync className="inline ml-2" />
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 text-center bg-transparent"
                  >
                    Let's Connect
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About;