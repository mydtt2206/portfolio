'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const { t } = useTranslation()

  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDesktop(window.innerWidth >= 768)
  }, [])

  useEffect(() => {
    if (!mounted || !isDesktop) return

    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current || !textRef.current) return

      const scrollY = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight

      const progress = Math.min(
        1,
        Math.max(0, (scrollY - sectionTop) / sectionHeight)
      )

      imageRef.current.style.transform = `
        translateY(${progress * 50}px)
        scale(${1 + progress * 0.1})
      `

      textRef.current.style.opacity = `${1 - progress * 1.2}`
      textRef.current.style.transform = `translateY(${progress * 30}px)`

      sectionRef.current.style.background = `
        linear-gradient(135deg,
          rgba(59,130,246,${0.05 + progress * 0.1}) 0%,
          rgba(229,231,235,${0.2 + progress * 0.2}) 100%
        )
      `
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted, isDesktop])

  const scrollToProjects = () => {
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!mounted) return null

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 px-4 py-20 md:min-h-[90vh] md:flex md:items-center"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          <div
            ref={textRef}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
              <button
                onClick={scrollToProjects}
                className="
                  w-full sm:w-auto
                  bg-blue-600 text-white
                  px-6 py-3 rounded-lg
                  transition-colors duration-300
                  hover:bg-blue-700
                "
              >
                {t('hero.viewProjects')}
              </button>

              <button
                className="
                  w-full sm:w-auto
                  border border-blue-600 text-blue-600
                  px-6 py-3 rounded-lg
                  transition-colors duration-300
                  hover:bg-blue-50
                "
              >
                {t('hero.downloadCV')}
              </button>
            </div>
          </div>

          <div
            ref={imageRef}
            className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
          >
            <div className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-80 md:h-80">

              <Image
                src="/avatar.jpg"
                alt={t('hero.imageAlt')}
                fill
                priority
                className="rounded-full object-cover border-4 border-white shadow-xl"
              />

              <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping" />
              <div className="absolute inset-4 rounded-full border-2 border-blue-400/20 animate-pulse" />

              <div className="absolute -top-5 -right-5 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce" />
              <div className="absolute -bottom-5 -left-5 w-6 h-6 bg-cyan-400/20 rounded-full animate-bounce delay-75" />

            </div>
          </div>



        </div>
      </div>
    </section>
  )
}
