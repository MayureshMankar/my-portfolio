'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  brightness: number
  update: () => void
  draw: () => void
}

interface AnimatedBackgroundProps {
  particleCount?: number
  className?: string
}

// Move ParticleClass outside useEffect for typing
class ParticleClass implements Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  brightness: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.size = Math.random() * 2 + 0.5
    this.opacity = Math.random() * 0.4 + 0.1
    this.brightness = Math.random() * 100 + 50 // White to gray range
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1

    // Subtle pulse effect
    this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.005) * 0.008
    this.opacity = Math.max(0.05, Math.min(0.5, this.opacity))
  }

  draw() {
    this.ctx.save()
    this.ctx.globalAlpha = this.opacity
    this.ctx.fillStyle = `rgb(${this.brightness}, ${this.brightness}, ${this.brightness})`
    this.ctx.shadowBlur = 8
    this.ctx.shadowColor = `rgb(${this.brightness}, ${this.brightness}, ${this.brightness})`
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.restore()
  }
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  particleCount = 40,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<ParticleClass[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new ParticleClass(canvas, ctx))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections with white/gray lines
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - distance) / 600
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
            ctx.lineWidth = 0.3
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Scroll effect
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Subtle parallax effect for particles based on scroll
      particlesRef.current.forEach((particle, i) => {
        particle.y += (scrollY - lastScrollY) * 0.05 * (i % 3 - 1)
      })

      lastScrollY = scrollY
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [particleCount])

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Pure Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle Gray Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
        }}
      />
      
      {/* Morphing Subtle Pattern */}
      <div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.02] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(255, 255, 255, 0.1), rgba(200, 200, 200, 0.05), rgba(255, 255, 255, 0.08), rgba(150, 150, 150, 0.03), rgba(255, 255, 255, 0.1))',
          animation: 'rotate 40s linear infinite'
        }}
      />
      
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent)',
            top: '20%',
            left: '15%',
            animationDelay: '0s',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
            top: '60%',
            right: '25%',
            animationDelay: '2s',
            animationDuration: '3s'
          }}
        />
        <div 
          className="absolute w-2.5 h-2.5 rounded-full opacity-10 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)',
            bottom: '30%',
            left: '70%',
            animationDelay: '1s',
            animationDuration: '5s'
          }}
        />
        <div 
          className="absolute w-1 h-1 rounded-full opacity-25 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent)',
            top: '40%',
            right: '10%',
            animationDelay: '3s',
            animationDuration: '3.5s'
          }}
        />
      </div>
      
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground