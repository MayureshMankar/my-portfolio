import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaServer, FaDatabase, FaTools, FaCloud, FaPalette, FaUsers, FaGithub, FaLinkedin, FaRobot, FaLock } from 'react-icons/fa';
import Lenis from '@studio-freight/lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}

const Skills = () => {
  console.log('Skills component rendered');

  const [showHeroContent, setShowHeroContent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setShowHeroContent(true);
      } else {
        setShowHeroContent(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when overlay is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCategory(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close overlay on outside click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setSelectedCategory(null);
  };

  // Skill categories with icons
  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: <FaCode />,
      skills: [
        { text: 'JavaScript' },
        { text: 'TypeScript' },
        { text: 'Python' },
        { text: 'Java' },
        { text: 'C' },
        { text: 'C++' },
        { text: 'SQL' },
        { text: 'Shell/Bash' },
      ]
    },
    {
      name: 'Frontend',
      icon: <FaCode />,
      skills: [
        { text: 'HTML5' },
        { text: 'CSS3' },
        { text: 'JavaScript (ES6+)' },
        { text: 'TypeScript' },
        { text: 'React.js' },
        { text: 'Next.js' },
        { text: 'Vue.js' },
        { text: 'Tailwind CSS' },
        { text: 'Zustand' },
        { text: 'Vite' },
      ]
    },
    {
      name: 'Backend',
      icon: <FaServer />,
      skills: [
        { text: 'Node.js' },
        { text: 'Express.js' },
        { text: 'Django' },
        { text: 'Flask' },
        { text: 'REST APIs' },
        { text: 'GraphQL' },
      ]
    },
    {
      name: 'Databases',
      icon: <FaDatabase />,
      skills: [
        { text: 'MongoDB' },
        { text: 'PostgreSQL' },
        { text: 'MySQL' },
        { text: 'SQLite' },
        { text: 'Redis' },
        { text: 'Firebase' },
        { text: 'Supabase' },
      ]
    },
    {
      name: 'Cloud & DevOps',
      icon: <FaCloud />,
      skills: [
        { text: 'AWS' },
        { text: 'Azure' },
        { text: 'Google Cloud' },
        { text: 'Vercel' },
        { text: 'Netlify' },
        { text: 'Heroku' },
        { text: 'Docker' },
        { text: 'CI/CD' },
        { text: 'GitHub Actions' },
        { text: 'Linux' },
      ]
    },
    {
      name: 'AI & Data',
      icon: <FaRobot />,
      skills: [
        { text: 'Python' },
        { text: 'Pandas' },
        { text: 'NumPy' },
        { text: 'scikit-learn' },
        { text: 'TensorFlow' },
        { text: 'PyTorch' },
        { text: 'OpenAI API' },
        { text: 'LangChain' },
        { text: 'Prompt Engineering' },
        { text: 'Automation Scripting' },
        { text: 'No-code AI Tools' },
      ]
    },
    {
      name: 'Development Tools',
      icon: <FaTools />,
      skills: [
        { text: 'Git' },
        { text: 'GitHub' },
        { text: 'GitLab' },
        { text: 'Bitbucket' },
        { text: 'Postman' },
        { text: 'VS Code' },
      ]
    },
    {
      name: 'Deployment',
      icon: <FaCloud />,
      skills: [
        { text: 'Vercel' },
        { text: 'Netlify' },
        { text: 'Heroku' },
        { text: 'AWS Amplify' },
        { text: 'Firebase Hosting' },
        { text: 'DigitalOcean' },
        { text: 'Render' },
        { text: 'GitHub Pages' },
        { text: 'Docker Hub' },
        { text: 'Cloudflare Pages' },
      ]
    },
    {
      name: 'Security',
      icon: <FaLock />,
      skills: [
        { text: 'OAuth' },
        { text: 'JWT' },
        { text: 'HTTPS' },
        { text: 'Helmet.js' },
        { text: 'Auth0' },
        { text: 'CSP (Content Security Policy)' },
        { text: 'Rate Limiting' },
        { text: 'Input Validation' },
      ]
    },
  ];

  // Add a description for each category
  const categoryDescriptions = {
    'Programming Languages': 'Languages I use to build robust, scalable, and efficient software.',
    'Frontend': 'Frameworks and tools for crafting beautiful, responsive user interfaces.',
    'Backend': 'Technologies powering APIs, business logic, and scalable server-side apps.',
    'Databases': 'Databases and storage solutions for reliable, high-performance data.',
    'Cloud & DevOps': 'Cloud platforms and DevOps tools for deployment, automation, and scaling.',
    'Deployment': 'Services and platforms I use to launch and host applications.',
    'Security': 'Practices and tools to keep applications and data secure.',
    'AI & Data': 'Technologies for machine learning, data analysis, and automation.',
    'Development Tools': 'Productivity tools, editors, and platforms for efficient development.',
    'Soft Skills': 'Collaboration, leadership, and problem-solving abilities.',
  };

  const frontCardDescriptions = {
    'Programming Languages': 'Versatile in many languages.',
    'Frontend': 'Build beautiful, interactive UIs.',
    'Backend': 'Powerful APIs & server logic.',
    'Databases': 'Store and retrieve data efficiently.',
    'Cloud & DevOps': 'Deploy, scale, and automate with ease.',
    'Deployment': 'Launch your ideas to the world.',
    'Security': 'Keep your apps safe & secure.',
    'AI & Data': 'Smarter apps with AI & analytics.',
    'Development Tools': 'Work faster, code smarter.',
    'Soft Skills': 'Teamwork, leadership, and growth.',
  };

  const heroContentRef = useRef(null);
  const isInView = useInView(heroContentRef, { threshold: 0.5 }); // 0.5 = 50% in view

  return (
    <motion.section
      className="py-16 px-4 bg-black text-white"
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-labelledby="skills-title"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-center text-white" id="skills-title">
        Tech Stack & Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, idx) => {
          // 3 columns: 0,3,6... left; 1,4,7... center; 2,5,8... right
          const col = idx % 3;
          let initial, animate;
          if (col === 0) {
            initial = { opacity: 0, x: -60, scale: 0.94 };
            animate = { opacity: 1, x: 0, scale: 1 };
          } else if (col === 2) {
            initial = { opacity: 0, x: 60, scale: 0.94 };
            animate = { opacity: 1, x: 0, scale: 1 };
          } else {
            initial = { opacity: 0, y: 40, scale: 0.94 };
            animate = { opacity: 1, y: 0, scale: 1 };
          }
          return (
            <motion.div
              key={idx}
              className="relative p-[1.5px] rounded-2xl shadow-xl group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl"
              style={{ perspective: '1200px' }}
              initial={initial}
              whileInView={animate}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.85, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
              exit={initial}
              onClick={() => setSelectedCategory(category)}
            >
            {/* Card Content */}
            <div
              className="rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-black/40 backdrop-blur-xl border border-white/20 group-hover:from-white/40 group-hover:to-black/60 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-5 min-h-[170px] shadow-xl"
              style={{
                boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.18)',
                border: '1.5px solid rgba(255,255,255,0.10)',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(0,0,0,0.18) 100%)',
              }}
            >
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 shadow-md mb-2">
                <span className="text-2xl md:text-3xl text-white drop-shadow-lg">{category.icon}</span>
              </span>
              <span className="font-extrabold text-lg md:text-2xl tracking-tight text-white mb-2">
                {category.name}
              </span>
              <span className="text-sm md:text-lg text-white/80 text-center mb-2 min-h-[22px] font-semibold">
                {frontCardDescriptions[category.name] || ''}
              </span>
              <button
                className="mt-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-semibold text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                tabIndex={-1}
                aria-label={`View details for ${category.name}`}
              >
                View Details
              </button>
            </div>
          </motion.div>
        );
      })}
      </div>
      {/* Fullscreen Overlay for Details */}
      {selectedCategory && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg transition-all duration-300"
        >
          <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-black/40 rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 max-w-2xl w-full mx-4 flex flex-col items-center animate-fadeIn"
            style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', border: '1.5px solid rgba(255,255,255,0.18)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl bg-black/30 rounded-full p-2 transition-all"
              onClick={() => setSelectedCategory(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{selectedCategory.icon}</span>
              <span className="text-3xl font-bold text-white drop-shadow-lg">{selectedCategory.name}</span>
            </div>
            <p className="text-lg text-white/90 mb-6 text-center max-w-xl">{categoryDescriptions[selectedCategory.name]}</p>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {selectedCategory.skills.map((skill, i) => (
                <div key={i} className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-base font-medium shadow-sm backdrop-blur-sm min-w-[90px]">
                  {/* Removed imgSrc and altText as they are not in the new skillCategories structure */}
                  <span>{skill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-12 text-center">
        <a 
          href="https://github.com/MayureshMankar" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-200 mr-4"
        >
          <FaGithub className="w-5 h-5" />
          GitHub Profile
        </a>
        <a 
          href="https://www.linkedin.com/in/mayuresh-mankar" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-200"
        >
          <FaLinkedin className="w-5 h-5" />
          LinkedIn Profile
        </a>
      </div>
    </motion.section>
  );
};

export default Skills;
