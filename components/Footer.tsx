'use client'

import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Footer() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    const footerElement = footerRef.current
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove)
      footerElement.addEventListener('mouseenter', handleMouseEnter)
      footerElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        footerElement.removeEventListener('mousemove', handleMouseMove)
        footerElement.removeEventListener('mouseenter', handleMouseEnter)
        footerElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]) 

  const calculateGradient = () => {
    const { x, y } = mousePosition
    
    const centerColor = `hsl(${(x / 100) * 60 + 200}, 80%, 25%)`
    const edgeColor1 = `hsl(220, 80%, 15%)`
    const edgeColor2 = `hsl(230, 70%, 12%)`
    
    return `radial-gradient(
      circle at ${x}% ${y}%,
      ${centerColor} 0%,
      hsl(${(y / 100) * 60 + 210}, 75%, 20%) 30%,
      ${edgeColor1} 60%,
      ${edgeColor2} 100%
    )`
  }

  const calculateGlow = () => {
    const { x, y } = mousePosition
    const opacity = isHovering ? 0.5 : 0.3 
    
    return `radial-gradient(
      circle at ${x}% ${y}%,
      rgba(59, 130, 246, ${opacity}) 0%,
      rgba(59, 130, 246, ${opacity * 0.2}) 40%,
      transparent 80%
    )`
  }

  const getElementGradient = (color: string, isHovered: boolean) => {
    const colors = {
      blue: ['#2c4cb69f', '#1d4fd8ac', '#3b82f6'],
      cyan: ['#0e7490', '#0891b2', '#06b6d4'],
      indigo: ['#534bc8c3', '#4438cacd', '#5d5feebb'],
      teal: ['#0f766e', '#0d9488', '#14b8a6'],
      sky: ['#0369a1', '#0ea5e9', '#38bdf8'],
      violet: ['#9545ce', '#9b64f9', '#9d78f4'],
      linkedin: ['#496de3d2', '#1d4fd8e4', '#3b82f6'],
      portfolio: ['#0f766e', '#0d9488', '#14b8a6'] 
    }

    const colorSet = colors[color as keyof typeof colors] || colors.blue
    
    if (isHovered) {
      return `linear-gradient(135deg, ${colorSet[1]} 0%, ${colorSet[2]} 100%)`
    }
    
    return `linear-gradient(135deg, ${colorSet[0]} 0%, ${colorSet[1]} 100%)`
  }

  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  return (
    <footer 
      id="contact"
      ref={footerRef}
      className="relative text-white py-16 px-6 overflow-hidden transition-all duration-300"
      style={{
        background: `${calculateGradient()}, ${calculateGlow()}`,
        transition: 'background 0.5s ease-out',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          opacity: isHovering ? 0.8 : 0.6,
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(96, 165, 250, 0.77) 0%,
            rgba(59, 131, 246, 0.92) 30%,
            transparent 70%
          )`,
          filter: 'blur(40px)',
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                My Dang Thi Tra
              </h3>
              <p className="text-gray-200 mb-6 text-lg">
                Logistics & Supply Chain Student | Transportation Operations | Process Optimization
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-2">
                  <div 
                    className="p-2 rounded-lg transition-all backdrop-blur-sm"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 64, 175, 0.6), rgba(30, 64, 175, 0.3))`,
                    }}
                  >
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors">
                    Ho Chi Minh City, Vietnam
                  </span>
                </div>
                
                <div className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-2">
                  <div 
                    className="p-2 rounded-lg transition-all backdrop-blur-sm"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 64, 175, 0.6), rgba(30, 64, 175, 0.3))`,
                    }}
                  >
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <a 
                    href="mailto:mydtt05@gmail.com" 
                    className="text-gray-200 hover:text-white transition-colors hover:underline"
                  >
                    mydtt05@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-2">
                  <div 
                    className="p-2 rounded-lg transition-all backdrop-blur-sm"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 64, 175, 0.6), rgba(30, 64, 175, 0.3))`,
                    }}
                  >
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <a 
                    href="tel:+84867743611" 
                    className="text-gray-200 hover:text-white transition-colors hover:underline"
                  >
                    +84 8677 43611
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-200">
                Find me online
              </h4>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.linkedin.com/in/mydtt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 overflow-hidden group"
                  title="LinkedIn Profile"
                  style={{
                    background: getElementGradient('linkedin', hoveredElement === 'linkedin'),
                    boxShadow: hoveredElement === 'linkedin'
                      ? '0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)'
                      : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transform: hoveredElement === 'linkedin' ? 'scale(1.05)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredElement('linkedin')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href="#" 
                  className="relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 overflow-hidden group"
                  title="Portfolio Website"
                  style={{
                    background: getElementGradient('portfolio', hoveredElement === 'portfolio'),
                    boxShadow: hoveredElement === 'portfolio'
                      ? '0 8px 25px rgba(20, 184, 166, 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)'
                      : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transform: hoveredElement === 'portfolio' ? 'scale(1.05)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredElement('portfolio')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-blue-200">
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'supply-chain', text: "Supply Chain", color: "blue" },
                  { id: 'logistics', text: "Logistics", color: "cyan" },
                  { id: 'transportation', text: "Transportation", color: "indigo" },
                  { id: 'operations', text: "Operations", color: "teal" },
                  { id: 'optimization', text: "Optimization", color: "sky" },
                  { id: 'warehousing', text: "Warehousing", color: "violet" },
                ].map((item) => (
                  <span 
                    key={item.id}
                    className="relative px-4 py-2 rounded-lg border transition-all duration-300 overflow-hidden cursor-pointer"
                    style={{
                      background: getElementGradient(item.color, hoveredElement === item.id),
                      borderColor: hoveredElement === item.id 
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: hoveredElement === item.id
                        ? `0 8px 25px rgba(var(--color-${item.color}-500), 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)`
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                      transform: hoveredElement === item.id ? 'translateY(-2px) scale(1.05)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredElement(item.id)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <span className="font-medium">{item.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800/30 mt-12 pt-8 text-center">
          <p className="text-blue-200/80">
            © {new Date().getFullYear()} My Dang Thi Tra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}