'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState, useMemo } from 'react'

type Skill = {
  name: string
  level: number
  animatedLevel: number
}

export default function Skills() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [hasAnimated, setHasAnimated] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>([])

  const skills = useMemo(
    () => [
      { name: t('skills.warehouse'), level: 90 },
      { name: t('skills.supplyChain'), level: 85 },
      { name: t('skills.transport'), level: 80 },
      { name: t('skills.wms'), level: 88 },
      { name: t('skills.analysis'), level: 82 },
      { name: t('skills.risk'), level: 75 },
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

  // Init animated values
  useEffect(() => {
    setAnimatedSkills(skills.map(skill => ({ ...skill, animatedLevel: 0 })))
  }, [skills])

  // Intersection Observer
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio > 0.45
        setIsActive(visible)

        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateSkills()
        }
      },
      {
        threshold: [0, 0.3, 0.5, 0.8],
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  // Progress bar animation
  const animateSkills = () => {
    const duration = 1200
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++

      setAnimatedSkills(prev =>
        prev.map(skill => ({
          ...skill,
          animatedLevel: Math.min(
            skill.level,
            (currentStep / steps) * skill.level
          ),
        }))
      )

      if (currentStep >= steps) clearInterval(timer)
    }, stepTime)
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`
        py-20 px-6 bg-white
        transition-all duration-700 ease-out will-change-[opacity,transform,filter]
        ${
          isActive
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-30 scale-[0.94] blur-[2px]'
        }
      `}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('skills.title')}
        </h2>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          {animatedSkills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-blue-600">
                  {Math.round(skill.animatedLevel)}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${skill.animatedLevel}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="
                bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-center
                transition-all duration-300
                hover:scale-110 hover:bg-blue-100
              "
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
  