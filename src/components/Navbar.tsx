import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 text-white shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-black tracking-tight text-white drop-shadow-lg" style={{letterSpacing: '0.04em'}}>Mayuresh Mankar</div>
        <nav className="hidden md:flex gap-8 text-white font-medium text-lg">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={e => {
                e.preventDefault();
                const anchorId = `${link.id}-anchor`;
                const el = document.getElementById(anchorId);
                if (el) {
                  const yOffset = -80; // Match anchor offset for correct section visibility
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                } else {
                  // Fallback to section ID if anchor doesn't exist
                  const sectionEl = document.getElementById(link.id);
                  if (sectionEl) {
                    const yOffset = -80;
                    const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }
              }}
              className={
                (activeSection === link.id
                  ? 'underline underline-offset-8 decoration-2 decoration-white text-white'
                  : 'hover:underline underline-offset-4 transition-all duration-150 text-white/80')
                + ' px-1 rounded transition-colors duration-200'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-7 h-1 bg-white rounded transition-all duration-200" style={{boxShadow: '0 1px 4px #fff2'}}></span>
          <span className="w-7 h-1 bg-white rounded transition-all duration-200" style={{boxShadow: '0 1px 4px #fff2'}}></span>
          <span className="w-7 h-1 bg-white rounded transition-all duration-200" style={{boxShadow: '0 1px 4px #fff2'}}></span>
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-white font-medium text-lg animate-fade-in-down">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={e => {
                e.preventDefault();
                setMenuOpen(false);
                const anchorId = `${link.id}-anchor`;
                const el = document.getElementById(anchorId);
                if (el) {
                  const yOffset = -80; // Adjust this value to match your navbar height
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                } else {
                  // Fallback to section ID if anchor doesn't exist
                  const sectionEl = document.getElementById(link.id);
                  if (sectionEl) {
                    const yOffset = -80;
                    const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }
              }}
              className={
                (activeSection === link.id
                  ? 'underline underline-offset-8 decoration-2 decoration-white text-white'
                  : 'hover:underline underline-offset-4 transition-all duration-150 text-white/80')
                + ' px-1 rounded transition-colors duration-200'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;