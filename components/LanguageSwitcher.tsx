'use client'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const router = useRouter()
  
  // Khởi tạo state với giá trị mặc định chung cho cả server và client
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Chỉ chạy trên client sau khi component đã mount
  useEffect(() => {
    setMounted(true)
    
    // Lấy ngôn ngữ từ i18n, nếu không có thì lấy từ localStorage hoặc mặc định
    const detectedLang = i18n.language || 
                        (typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null) || 
                        'vi'
    
    // Chỉ set state nếu khác với giá trị hiện tại
    const lang = (detectedLang.startsWith('vi') ? 'vi' : 'en') as 'vi' | 'en'
    if (lang !== currentLang) {
      setCurrentLang(lang)
    }
  }, [i18n.language])

  const changeLanguage = (lng: 'vi' | 'en') => {
    if (currentLang === lng) {
      setIsOpen(false)
      return
    }
    
    i18n.changeLanguage(lng)
    setCurrentLang(lng)
    
    // Lưu vào localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lng)
    }
    
    router.push(`/${lng}`)
    setIsOpen(false)
    
    // Reload sau 100ms để cập nhật toàn bộ trang
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    }, 100)
  }

  // Sử dụng state mounted để tránh hydration mismatch
  const displayLang = mounted ? (currentLang === 'vi' ? 'VI' : 'EN') : 'VI'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          bg-white border border-gray-200
          hover:bg-gray-50 transition-all duration-200
          ${isOpen ? 'ring-2 ring-blue-100' : ''}
        `}
      >
        <Globe className="w-4 h-4 text-gray-600" />
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">
            {displayLang}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
            <div className="p-2">
              <button
                onClick={() => changeLanguage('vi')}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg
                  transition-colors duration-150
                  ${currentLang === 'vi' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <span className="font-medium">Tiếng Việt</span>
                {currentLang === 'vi' && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => changeLanguage('en')}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg mt-1
                  transition-colors duration-150
                  ${currentLang === 'en' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <span className="font-medium">English</span>
                {currentLang === 'en' && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}