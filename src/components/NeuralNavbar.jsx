import React, { useRef, useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const NODE_RADIUS = 22;
const LINE_COLOR = 'rgba(0,255,255,0.55)';
const ACTIVE_COLOR = 'rgba(0,255,255,1)';
const INACTIVE_COLOR = 'rgba(255,255,255,0.55)';

function NeuralNavbar() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(0);
  const [pulse, setPulse] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const navRef = useRef(null);
  const svgRef = useRef(null);

  // Responsive width
  useEffect(() => {
    function updateWidth() {
      if (navRef.current) {
        setContainerWidth(navRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Pulse animation
  useEffect(() => {
    if (pulse === null) return;
    let raf;
    let progress = 0;
    function animate() {
      progress += 0.04;
      if (progress < 1) {
        setPulse({ ...pulse, progress });
        raf = requestAnimationFrame(animate);
      } else {
        setPulse(null);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, [pulse]);

  // Scroll to section on click
  const handleClick = (idx, href) => {
    setActive(idx);
    setPulse({ from: active, to: idx, progress: 0 });
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate node positions based on containerWidth
  const usableWidth = Math.max(containerWidth, 400); // fallback min width
  const gap = usableWidth / (NAV_ITEMS.length - 1);
  const nodes = NAV_ITEMS.map((item, i) => ({
    x: gap * i,
    y: 32,
    label: item.label,
    href: item.href,
  }));
  const width = usableWidth;
  const height = 64;

  return (
    <nav
      ref={navRef}
      className="w-full flex justify-center items-center py-6 bg-black"
      style={{ background: 'rgba(0,0,0,0.98)', zIndex: 50, overflowX: 'visible' }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: 'block', overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        {/* Lines */}
        {nodes.slice(0, -1).map((node, i) => (
          <line
            key={i}
            x1={node.x}
            y1={node.y}
            x2={nodes[i + 1].x}
            y2={nodes[i + 1].y}
            stroke={LINE_COLOR}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
        {/* Pulse animation */}
        {pulse && (
          <circle
            cx={
              nodes[pulse.from].x +
              (nodes[pulse.to].x - nodes[pulse.from].x) * pulse.progress
            }
            cy={nodes[pulse.from].y}
            r={NODE_RADIUS * 0.5 + 4 * Math.sin(Math.PI * pulse.progress)}
            fill={ACTIVE_COLOR}
            opacity={0.7 + 0.3 * Math.sin(Math.PI * pulse.progress)}
          />
        )}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(i, node.href)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={
                i === active
                  ? NODE_RADIUS + 6
                  : hovered === i
                  ? NODE_RADIUS + 2
                  : NODE_RADIUS
              }
              fill={i === active ? ACTIVE_COLOR : INACTIVE_COLOR}
              filter={
                i === active || hovered === i
                  ? 'drop-shadow(0 0 32px #00ffff)' : 'none'
              }
              style={{ transition: 'all 0.25s cubic-bezier(.4,2,.6,1)' }}
            />
            <text
              x={node.x}
              y={node.y + NODE_RADIUS + 22}
              textAnchor="middle"
              fill="#fff"
              fontSize={15}
              fontWeight={i === active ? 700 : 400}
              style={{ pointerEvents: 'none', userSelect: 'none', letterSpacing: 1 }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </nav>
  );
}

export default NeuralNavbar; 