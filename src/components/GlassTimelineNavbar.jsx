import React, { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function GlassTimelineNavbar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timelineRef = useRef(null);

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(item => document.querySelector(item.href));
    function onScroll() {
      let found = 0;
      for (let i = 0; i < sectionEls.length; i++) {
        const el = sectionEls[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.33) {
          found = i;
        }
      }
      setActiveIdx(found);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Timeline fill percent
  const fillPercent = activeIdx / (NAV_ITEMS.length - 1);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex justify-center items-center"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        ref={timelineRef}
        className="relative flex flex-col items-center w-full max-w-3xl px-6 py-4 mt-4"
        style={{
          backdropFilter: 'blur(14px)',
          background: 'rgba(255,255,255,0.10)',
          borderRadius: '2rem',
          border: '1.5px solid rgba(255,255,255,0.25)',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)',
        }}
      >
        {/* Timeline line */}
        <div className="absolute left-10 right-10 top-1/2 h-1 bg-white/20 rounded-full overflow-hidden" style={{ zIndex: 1, transform: 'translateY(-50%)' }}>
          <div
            className="h-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${fillPercent * 100}%` }}
          />
        </div>
        {/* Dots and labels */}
        <div className="relative flex w-full justify-between items-center" style={{ zIndex: 2 }}>
          {NAV_ITEMS.map((item, i) => (
            <div key={item.href} className="flex flex-col items-center group cursor-pointer select-none" onClick={() => {
              const el = document.querySelector(item.href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <div
                className={`transition-all duration-300 border-2 ${i === activeIdx ? 'border-cyan-400 shadow-[0_0_24px_4px_rgba(34,211,238,0.5)] bg-cyan-400' : 'border-white/30 bg-white/20'} rounded-full`}
                style={{
                  width: i === activeIdx ? 32 : 18,
                  height: i === activeIdx ? 32 : 18,
                  marginBottom: 8,
                  boxShadow: i === activeIdx ? '0 0 32px 8px rgba(34,211,238,0.25)' : 'none',
                  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                }}
              />
              <span
                className={`text-xs mt-1 font-semibold tracking-wide ${i === activeIdx ? 'text-cyan-400' : 'text-white/70'} group-hover:text-cyan-300 transition`}
                style={{ letterSpacing: 1 }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default GlassTimelineNavbar; 