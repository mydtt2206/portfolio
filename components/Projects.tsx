'use client'

import Image from 'next/image'
import { projects } from '@/data/projects'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export default function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted || !sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -20% 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) return null

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`
        py-24 px-6 bg-gray-50
        transition-[opacity,transform]
        duration-[900ms]
        ease-[cubic-bezier(.22,1,.36,1)]
        ${
          isActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-16'
        }
      `}
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`
            text-3xl font-bold text-center mb-12 text-slate-900
            transition-all duration-700
            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {t('projects.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                bg-white rounded-xl border border-slate-200
                overflow-hidden
                transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                hover:shadow-xl hover:-translate-y-1
                ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }
              `}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative h-60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                  {project.category.map(cat => (
                    <span
                      key={cat}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">
                    {t('projects.technologies')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 mb-4 text-sm">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {project.results && (
                  <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold text-green-600 mb-2 text-sm">
                      {t('projects.results')}:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {project.results.map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
