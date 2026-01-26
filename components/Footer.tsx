'use client'

import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Footer() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const footerRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', () => setIsHovering(true))
    el.addEventListener('mouseleave', () => setIsHovering(false))
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

const calculateGradient = () => {
  const { x, y } = mousePosition

  return `radial-gradient(
    circle at ${x}% ${y}%,
    hsl(${(x / 100) * 40 + 200}, 85%, 45%) 0%,
    hsl(${(y / 100) * 40 + 210}, 80%, 38%) 30%,
    hsl(215, 75%, 30%) 60%,
    hsl(220, 70%, 24%) 100%
  )`
}


  const calculateGlow = () =>
    `radial-gradient(
      circle at ${mousePosition.x}% ${mousePosition.y}%,
      rgba(59,130,246,${isHovering ? 0.5 : 0.3}) 0%,
      rgba(59,130,246,0.15) 40%,
      transparent 80%
    )`

  const getElementGradient = (color: string, hovered: boolean) => {
    const map: Record<string, string[]> = {
      blue: ['#2453ed9f', '#3d70faac', '#3b82f6'],
      cyan: ['#0e7490', '#0891b2', '#06b6d4'],
      indigo: ['#534bc8c3', '#4438cacd', '#5d5feebb'],
      teal: ['#0f766e', '#0d9488', '#14b8a6'],
      sky: ['#0369a1', '#0ea5e9', '#38bdf8'],
      violet: ['#9545ce', '#9b64f9', '#9d78f4'],
      linkedin: ['#496de3d2', '#1d4fd8e4', '#3b82f6'],
      portfolio: ['#0f766e', '#0d9488', '#14b8a6'],
    }
    const c = map[color] || map.blue
    return hovered
      ? `linear-gradient(135deg, ${c[1]} 0%, ${c[2]} 100%)`
      : `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 100%)`
  }

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden text-white py-16 px-6"
      style={{ background: `${calculateGradient()}, ${calculateGlow()}` }}
    >
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
              My Dang Thi Tra
            </h3>

            <p className="text-gray-200 mb-6">
              Logistics & Supply Chain Student | Transportation Operations
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <a href="mailto:mydtt05@gmail.com">mydtt05@gmail.com</a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <a href="tel:+84867743611">+84 8677 43611</a>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/2 space-y-8">

            {/* LINKS */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-200 text-center lg:text-left">
                Find me online
              </h4>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/mydtt"
                  target="_blank"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all"
                  style={{
                    background: getElementGradient('linkedin', hoveredElement === 'linkedin'),
                    transform: hoveredElement === 'linkedin' ? 'scale(1.05)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredElement('linkedin')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all"
                  style={{
                    background: getElementGradient('portfolio', hoveredElement === 'portfolio'),
                    transform: hoveredElement === 'portfolio' ? 'scale(1.05)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredElement('portfolio')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <Globe className="w-5 h-5" />
                  Portfolio
                </a>
              </div>
            </div>

            {/* CORE */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-200 text-center lg:text-left">
                Core Expertise
              </h4>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { id: 'supply-chain', text: 'Supply Chain', color: 'blue' },
                  { id: 'logistics', text: 'Logistics', color: 'cyan' },
                  { id: 'transportation', text: 'Transportation', color: 'indigo' },
                  { id: 'operations', text: 'Operations', color: 'teal' },
                  { id: 'optimization', text: 'Optimization', color: 'sky' },
                  { id: 'warehousing', text: 'Warehousing', color: 'violet' },
                ].map(item => (
                  <span
                    key={item.id}
                    className="px-4 py-2 rounded-lg border transition-all cursor-pointer text-sm"
                    style={{
                      background: getElementGradient(item.color, hoveredElement === item.id),
                      borderColor: hoveredElement === item.id
                        ? 'rgba(255,255,255,0.35)'
                        : 'rgba(255,255,255,0.15)',
                      transform: hoveredElement === item.id ? 'scale(1.05)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredElement(item.id)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-800/30 text-center text-sm text-blue-200/80">
          © {new Date().getFullYear()} My Dang Thi Tra. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
