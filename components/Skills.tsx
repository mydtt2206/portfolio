'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Truck } from 'lucide-react'

type Skill = {
  title: string
  description: string
}

export default function Skills() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills: Skill[] = useMemo(
    () => [
      {
        title: t('skills.warehouse'),
        description:
          'Demand forecasting, inventory planning, supplier coordination',
      },
      {
        title: t('skills.supplyChain'),
        description:
          'End-to-end supply chain optimization from sourcing to delivery',
      },
      {
        title: t('skills.transport'),
        description:
          'Managing road, sea, and air transportation to reduce cost and lead time',
      },
      {
        title: t('skills.wms'),
        description:
          'Operational planning, KPI tracking, and process standardization',
      },
      {
        title: t('skills.analysis'),
        description:
          'Cost analysis, bottleneck identification, performance reporting',
      },
      {
        title: t('skills.risk'),
        description:
          'Risk assessment, disruption mitigation, contingency planning',
      },
    ],
    [t]
  )

  const tags = useMemo(
    () => [
      t('skills.tag1'),
      t('skills.tag2'),
      t('skills.tag3'),
      t('skills.tag4'),
    ],
    [t]
  )

  useEffect(() => {
    if (!mounted || !sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          setIsActive(true)
          setHasShown(true)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -50% 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [mounted, hasShown])

  if (!mounted) return null

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6 bg-slate-50 overflow-hidden"
    >
      {!isActive && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-blue-600">
          <Truck size={34} strokeWidth={1.8} className="animate-pulse" />
          <span className="text-sm text-slate-500">
            Delivering skills…
          </span>
        </div>
      )}

      <div className="container mx-auto max-w-5xl">
        <h2
          className={`
            text-3xl font-bold text-center mb-12 text-slate-900
            transition-[opacity,transform]
            duration-[800ms]
            ease-[cubic-bezier(.22,1,.36,1)]
            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {t('skills.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {skills.map((skill, index) => {
            const isLeftColumn = index % 2 === 0
            const delay = isLeftColumn
              ? index * 120
              : (index - 1) * 120 + skills.length * 100

            return (
              <div
                key={index}
                className={`
                  transition-[opacity,transform]
                  duration-[900ms]
                  ease-[cubic-bezier(.22,1,.36,1)]
                  ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }
                `}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div
                  className={`
                    p-6 rounded-xl bg-white
                    border border-slate-200
                    transition-transform
                    duration-200
                    ease-out
                    hover:-translate-y-1
                    hover:shadow-lg
                  `}
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {skill.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                px-5 py-2 bg-blue-50 text-blue-700
                rounded-full text-sm
                transition-colors duration-200
                hover:bg-blue-100
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
