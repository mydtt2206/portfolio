'use client'

import Image from 'next/image'
import { projects } from '@/data/projects'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export default function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [isActive, setIsActive] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Intersection Observer for push-up effect
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.3)
      },
      {
        threshold: [0, 0.3, 0.6],
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`
        py-20 px-6 bg-gray-50
        transition-all duration-700 ease-out will-change-[opacity,transform]
        ${
          isActive
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-24 scale-[0.96]'
        }
      `}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {isClient ? t('projects.title') : 'Dự án tiêu biểu'}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="
                bg-white rounded-xl shadow-lg overflow-hidden
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
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
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    {isClient ? t('projects.technologies') : 'Công nghệ sử dụng'}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {project.results && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-green-600 mb-2">
                      {isClient ? t('projects.results') : 'Kết quả đạt được'}:
                    </h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="text-sm">
                          {result}
                        </li>
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
