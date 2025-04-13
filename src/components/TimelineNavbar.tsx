import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaHome, FaUser, FaCode, FaFolderOpen, FaComments, FaFileAlt, FaEnvelope, FaBlog } from 'react-icons/fa';

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const TimelineNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll handler with navbar visibility
  const handleScroll = useCallback(() => {
    // Always update refs to latest DOM nodes (for lazy-loaded sections)
    SECTIONS.forEach(({ id }) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
    const currentScrollY = window.scrollY;

    // Find active section with improved detection
    let current = SECTIONS[0].id;
    let minDistance = Infinity;
    for (const { id } of SECTIONS) {
      const el = sectionRefs.current[id];
      if (el) {
        const rect = el.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(center - elementCenter);
        if (distance < minDistance && rect.top <= center && rect.bottom >= center) {
          minDistance = distance;
          current = id;
        }
      }
    }
    setActiveSection(current);

    // Enhanced progress calculation
    const firstSection = sectionRefs.current[SECTIONS[0].id];
    const lastSection = sectionRefs.current[SECTIONS[SECTIONS.length - 1].id];
    if (firstSection && lastSection) {
      const start = firstSection.offsetTop;
      const end = lastSection.offsetTop + lastSection.offsetHeight;
      const total = end - start;
      const scrolled = Math.max(0, currentScrollY - start);
      const newProgress = Math.min(1, Math.max(0, scrolled / total));
      setProgress(newProgress);
    }
  }, []);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 20;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Icon mapping for mobile menu
  const sectionIcons = {
    hero: <FaHome />,
    about: <FaUser />,
    skills: <FaCode />,
    projects: <FaFolderOpen />,
    resume: <FaFileAlt />,
    testimonials: <FaComments />,
    blog: <FaBlog />,
    contact: <FaEnvelope />,
  };

  return (
    <>
      {/* Desktop/Tablet Timeline Navbar */}
      <aside
        className="hidden sm:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center z-50"
        style={{
          background: 'rgba(0,0,0,0.22)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderRight: 'none',
          boxShadow: 'none'
        }}
      >
        {/* Animated background glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.1) ${progress * 50}%, 
            rgba(147, 51, 234, 0.1) ${progress * 100}%, 
            transparent 100%)`
          }}
        />
        {/* Timeline container */}
        <div 
          ref={timelineRef}
          className="relative flex flex-col items-center justify-between h-4/5 w-8"
        >
          {/* Enhanced progress line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-white/10 to-white/20 rounded-full overflow-hidden">
            {/* Animated progress fill */}
            <div
              className="absolute left-0 top-0 w-full rounded-full transition-all duration-500 ease-out"
              style={{
                height: `${progress * 100}%`,
                background: 'linear-gradient(180deg, #fff 0%, #e5e7eb 100%)',
                boxShadow: '0 0 20px #fff6'
              }}
            />
            {/* Glowing progress indicator */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500 ease-out"
              style={{
                top: `${Math.max(0, Math.min(100, progress * 100 - 1))}%`,
                background: 'radial-gradient(circle, #fff 0%, #e5e7eb 100%)',
                boxShadow: '0 0 15px #fff8, 0 0 30px #fff4',
                opacity: progress > 0 ? 1 : 0
              }}
            />
          </div>
          {/* Timeline nodes - evenly distributed */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-between z-10">
            {SECTIONS.map(({ id, label }, idx) => {
              const isActive = activeSection === id;
              const isHovered = hoveredSection === id;
              const isCompleted = progress > (idx / (SECTIONS.length - 1));
              // Render main node
              return (
                <div key={id} className="flex flex-col items-center group relative">
                  {/* Node */}
                  <button
                    onClick={() => scrollToSection(id)}
                    onMouseEnter={() => setHoveredSection(id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className="relative z-10 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ease-out cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-opacity-50"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #fff, #e5e7eb)'
                        : isCompleted
                        ? 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
                        : 'rgba(255,255,255,0.10)',
                      border: isActive
                        ? '2px solid #fff'
                        : '2px solid rgba(255,255,255,0.3)',
                      transform: isActive ? 'scale(1.2)' : isHovered ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive
                        ? '0 0 16px #fff8'
                        : isCompleted
                        ? '0 0 8px #fff4'
                        : 'none'
                    }}
                    aria-label={`Navigate to ${label} section`}
                    type="button"
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 14 : 10,
                        height: isActive ? 14 : 10,
                        background: isActive
                          ? 'linear-gradient(135deg, #fff, #e5e7eb)'
                          : isCompleted
                          ? 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
                          : '#fff',
                        opacity: isActive || isCompleted ? 1 : 0.8,
                        boxShadow: isActive ? '0 0 8px #fff8' : 'none'
                      }}
                    />
                  </button>
                  {/* Dots between nodes (except after last node) */}
                  {idx < SECTIONS.length - 1 && (
                    <div className="flex flex-col items-center py-1 relative overflow-visible" style={{ minHeight: 32 }}>
                      {Array.from({ length: 6 }).map((_, dotIdx) => {
                        // Calculate the progress for this dot
                        const dotProgress = (idx + (dotIdx + 1) / 7) / (SECTIONS.length - 1);
                        const filled = progress >= dotProgress;
                        // Animate dots moving toward the next node
                        const animationDuration = 1.2;
                        const delay = (dotIdx / 6) * animationDuration;
                        return (
                          <span
                            key={dotIdx}
                            className="my-[2px] rounded-full transition-all duration-300 animate-dot-move"
                            style={{
                              width: 6,
                              height: 6,
                              background: filled ? 'linear-gradient(135deg, #fff, #e5e7eb)' : 'rgba(255,255,255,0.18)',
                              boxShadow: filled ? '0 0 4px #fff8' : 'none',
                              display: 'block',
                              animationDelay: `${delay}s`,
                              opacity: filled ? 1 : 0.5
                            }}
                          />
                        );
                      })}
                      {/* Keyframes for dot movement */}
                      <style>{`
                        @keyframes dot-move {
                          0% { transform: translateY(0); opacity: 0.5; }
                          20% { opacity: 1; }
                          80% { opacity: 1; }
                          100% { transform: translateY(24px); opacity: 0.5; }
                        }
                        .animate-dot-move {
                          animation: dot-move 1.2s linear infinite;
                        }
                      `}</style>
                    </div>
                  )}
                  {/* Tooltip label: show only for hovered node, next to hovered node */}
                  {isHovered && (
                    <div
                      className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ease-out whitespace-nowrap z-50"
                      style={{
                        opacity: 1,
                        transform: 'translateY(-50%) translateX(0)',
                      }}
                    >
                      <div
                        className="px-4 py-2 rounded-lg text-base font-semibold text-white shadow-lg"
                        style={{
                          background: 'rgba(20,20,20,0.98)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                          letterSpacing: '0.04em',
                          minWidth: 90,
                          textAlign: 'center'
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  )}
                  {/* Mini label always visible */}
                  <span
                    className="mt-2 text-[9px] font-semibold transition-all duration-300 select-none tracking-wider"
                    style={{
                      color: isActive ? '#fff' : isCompleted ? '#e5e7eb' : 'rgba(255,255,255,0.5)',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      textShadow: isActive ? '0 0 10px #fff8' : 'none'
                    }}
                  >
                    {label === 'Testimonials' ? 'TEST' : label === 'Blog' ? 'BLOG' : label.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Progress percentage indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-white/60 transition-opacity duration-300"
          style={{ opacity: progress > 0 ? 1 : 0 }}
        >
          {Math.round(progress * 100)}%
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-black/90 border-t border-white/10 flex justify-around items-center py-2 backdrop-blur-md">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={
              (activeSection === id
                ? 'text-white'
                : 'text-white/60 hover:text-white') +
              ' flex flex-col items-center justify-center px-2 focus:outline-none focus:text-white transition-all duration-150'
            }
            aria-label={label}
            type="button"
          >
            <span className="text-xl mb-0.5">{sectionIcons[id]}</span>
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default TimelineNavbar;