'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current || !textRef.current) return
      
      const scrollPosition = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      
      const scrollPercent = Math.min(1, Math.max(0, scrollPosition / (sectionTop + sectionHeight)))
      
      const imageTranslateY = scrollPercent * 50
      const imageScale = 1 + scrollPercent * 0.1
      imageRef.current.style.transform = `translateY(${imageTranslateY}px) scale(${imageScale})`
      
      const textOpacity = 1 - scrollPercent * 1.5
      const textTranslateY = scrollPercent * 30
      textRef.current.style.opacity = `${Math.max(0, textOpacity)}`
      textRef.current.style.transform = `translateY(${textTranslateY}px)`
      
      const bgIntensity = 0.5 + scrollPercent * 0.5
      sectionRef.current.style.background = `
        linear-gradient(135deg, 
          rgba(59, 130, 246, ${0.1 * bgIntensity}) 0%, 
          rgba(229, 231, 235, ${0.4 * bgIntensity}) 100%
        )
      `
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 min-h-[90vh] flex items-center transition-all duration-300"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={textRef} className="md:w-1/2 transition-all duration-300">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {t('hero.viewProjects')}
              </button>
              <button 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {t('hero.downloadCV')}
              </button>
            </div>
          </div>
          
          <div ref={imageRef} className="md:w-1/2 transition-all duration-300">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <Image
                src="/avatar.jpg"
                alt={t('hero.imageAlt')}
                fill
                className="rounded-full object-cover border-4 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              />
              
              {isInView && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping"></div>
                  <div className="absolute inset-4 rounded-full border-2 border-blue-400/20 animate-pulse"></div>
                </>
              )}

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce hidden md:block"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400/20 rounded-full animate-bounce delay-75 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}