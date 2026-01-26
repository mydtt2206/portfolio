'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const menuItems = [
    { href: '#skills', label: t('nav.skills', 'Skills') },
    { href: '#projects', label: t('nav.projects', 'Projects') },
    { href: '#contact', label: t('nav.contact', 'Contact') },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform"
          >
            {t('hero.name', 'My Dang Thi Tra')}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-gray-700 hover:text-blue-600 transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-blue-50 transition"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-4 rounded-2xl border bg-white shadow-lg overflow-hidden">
            {menuItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  block px-6 py-4 text-gray-700
                  hover:bg-blue-50 hover:text-blue-600
                  transition
                "
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
