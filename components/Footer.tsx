'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="z-50 bg-white/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform duration-300">
            {t('hero.name', 'My Dang Thi Tra')}
          </Link>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <a
                href="#skills"
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              >
                {t('nav.skills', 'Skills')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a
                href="#projects"
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              >
                {t('nav.projects', 'Projects')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a
                href="#contact"
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              >
                {t('nav.contact')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>

            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}
