import React, { useEffect, useRef, useState } from 'react';

const PortfolioNeuralNetwork = ({ 
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Neural Node class optimized for portfolio
  class NeuralNode {
    constructor(canvas) {
      this.canvas = canvas;
      // More strategic positioning - create clusters and pathways
      this.x = Math.random() * (canvas.width - 60) + 30;
      this.y = Math.random() * (canvas.height - 60) + 30;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.baseSize = Math.random() * 1.2 + 0.6; // Smaller dots
      this.size = this.baseSize;
      this.connections = [];
      this.activity = 0;
      this.maxActivity = Math.random() * 0.5 + 0.5;
      this.activityDecay = 0.92;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.activationThreshold = Math.random() * 0.3 + 0.1;
      this.lastActivation = 0;
      this.nodeType = Math.random() < 0.3 ? 'hub' : 'regular'; // Some nodes are hubs
    }

    update() {
      // Very subtle movement for professional look
      this.x += this.vx;
      this.y += this.vy;

      // Gentle boundary constraints
      if (this.x < 15 || this.x > this.canvas.width - 15) {
        this.vx = -this.vx * 0.7;
        this.x = Math.max(15, Math.min(this.canvas.width - 15, this.x));
      }
      if (this.y < 15 || this.y > this.canvas.height - 15) {
        this.vy = -this.vy * 0.7;
        this.y = Math.max(15, Math.min(this.canvas.height - 15, this.y));
      }

      // Decay activity
      this.activity *= this.activityDecay;
      this.pulsePhase += 0.08;

      // Smart activation system
      const timeSinceLastActivation = Date.now() - this.lastActivation;
      const activationProbability = this.nodeType === 'hub' ? 0.003 : 0.001;
      
      if (timeSinceLastActivation > 1000 && Math.random() < activationProbability) {
        this.trigger();
      }

      // Update size based on activity
      const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
      this.size = this.baseSize + (this.activity * 2 * pulse);
    }

    trigger() {
      this.activity = Math.min(this.maxActivity, this.activity + 0.7);
      this.lastActivation = Date.now();
      
      // Propagate to connected nodes with intelligent delays
      setTimeout(() => {
        this.connections.forEach(connection => {
          if (connection.strength > 0.25 && Math.random() < 0.8) {
            connection.target.receive(this.activity * connection.strength * 0.6);
          }
        });
      }, Math.random() * 150 + 50);
    }

    receive(activityAmount) {
      this.activity = Math.min(this.maxActivity, this.activity + activityAmount);
      if (this.activity > this.activationThreshold) {
        setTimeout(() => this.trigger(), Math.random() * 100 + 25);
      }
    }

    draw(ctx) {
      // Node is dim by default, glows only on mouse interaction (activity)
      const isActive = this.activity > 0.1;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.18)';
      if (isActive) {
        ctx.shadowColor = 'rgba(255,255,255,0.85)';
        ctx.shadowBlur = 16;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize neural network with strategic connections
  const initNeuralNetwork = (canvas) => {
    nodesRef.current = [];
    
    // Create nodes with some strategic positioning
    for (let i = 0; i < 80; i++) { // Increased node count for denser effect
      nodesRef.current.push(new NeuralNode(canvas));
    }
    
    // Create intelligent connections
    nodesRef.current.forEach((node, i) => {
      node.connections = [];
      
      // Connect to nearby nodes with preference for hubs
      nodesRef.current.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const strength = 1 - (distance / 120);
            let connectionProbability = strength * 0.4;
            
            // Increase probability for hub connections
            if (node.nodeType === 'hub' || otherNode.nodeType === 'hub') {
              connectionProbability *= 1.5;
            }
            
            if (Math.random() < connectionProbability) {
              node.connections.push({
                target: otherNode,
                strength: strength,
                distance: distance,
                pulsePhase: Math.random() * Math.PI * 2,
                maxOpacity: strength * 0.6
              });
            }
          }
        }
      });
    });
  };

  // Draw connections with professional styling
  const drawConnections = (ctx) => {
    nodesRef.current.forEach(node => {
      node.connections.forEach(connection => {
        const { target } = connection;
        ctx.strokeStyle = 'rgba(255,255,255,0)'; // Fully transparent
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas completely for clean look
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first
    drawConnections(ctx);

    // Draw nodes
    nodesRef.current.forEach(node => {
      node.update();
      node.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle canvas resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    setDimensions({ width: rect.width, height: rect.height });
    initNeuralNetwork(canvas);
  };

  // Mouse interactivity: activate nodes near mouse
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mouseX = (e.clientX - rect.left) * dpr;
    const mouseY = (e.clientY - rect.top) * dpr;
    nodesRef.current.forEach(node => {
      const dx = node.x - mouseX;
      const dy = node.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        node.activity = Math.min(node.maxActivity, node.activity + 0.5 * (1 - dist / 90));
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Mouse interactivity
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => {
      // Optionally, fade out activity when mouse leaves
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)'
        }}
      />
    </div>
  );
};

export default PortfolioNeuralNetwork;