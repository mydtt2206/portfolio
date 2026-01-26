'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Truck,
  Warehouse,
  Route,
  BarChart3,
  ShieldAlert,
  Boxes,
} from 'lucide-react'

type Skill = {
  title: string
  description: string
  icon: React.ReactNode
}

export default function Skills() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [mounted, setMounted] = useState(false)
  const [sectionActive, setSectionActive] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !sectionRef.current) return

    if (window.innerWidth < 768) {
      setSectionActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionActive(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -30% 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [mounted])

  const skills: Skill[] = useMemo(
    () => [
      {
        title: t('skills.warehouse'),
        description:
          'Demand forecasting, inventory planning, supplier coordination',
        icon: <Warehouse size={22} />,
      },
      {
        title: t('skills.supplyChain'),
        description:
          'End-to-end supply chain optimization from sourcing to delivery',
        icon: <Route size={22} />,
      },
      {
        title: t('skills.transport'),
        description:
          'Managing road, sea, and air transportation to reduce cost and lead time',
        icon: <Truck size={22} />,
      },
      {
        title: t('skills.wms'),
        description:
          'Operational planning, KPI tracking, and process standardization',
        icon: <Boxes size={22} />,
      },
      {
        title: t('skills.analysis'),
        description:
          'Cost analysis, bottleneck identification, performance reporting',
        icon: <BarChart3 size={22} />,
      },
      {
        title: t('skills.risk'),
        description:
          'Risk assessment, disruption mitigation, contingency planning',
        icon: <ShieldAlert size={22} />,
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

  if (!mounted) return null

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-slate-50 px-5 py-20 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-slate-900">
          {t('skills.title')}
        </h2>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              index={index}
              sectionActive={sectionActive}
            />
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div
            className="
              flex w-max gap-4
              animate-tag-scroll-slow sm:animate-tag-scroll
              hover:[animation-play-state:paused]
              motion-reduce:animate-none
            "
          >
            {[...tags, ...tags, ...tags].map((tag, index) => (
              <span
                key={index}
                className="
                  whitespace-nowrap
                  px-5 py-2
                  bg-blue-50 text-blue-700
                  rounded-full
                  text-sm
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  index,
  sectionActive,
}: {
  skill: Skill
  index: number
  sectionActive: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setVisible(sectionActive)
      return
    }

    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -15% 0px',
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [sectionActive])

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700
        ease-[cubic-bezier(.22,1,.36,1)]
        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }
      `}
      style={{
        transitionDelay:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? `${index * 120}ms`
            : '0ms',
      }}
    >
      <div className="h-full rounded-xl bg-white border border-slate-200 p-4 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-blue-600 shrink-0">
            {skill.icon}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
              {skill.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {skill.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
