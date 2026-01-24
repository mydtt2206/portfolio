import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientProviders from './ClientProviders'
import { cookies, headers } from 'next/headers'

export const metadata = {
  title: 'Portfolio - My Dang Thi Tra | Transportation Operations Manager & Supply Chain',
  description:
    'Portfolio My Dang Thi Tra , vận tải và quản lý chuỗi cung ứng',
}

async function getLang() {
  const cookieStore = await cookies()
  const headerStore = await headers()

  const cookieLang = cookieStore.get('i18next')?.value
  const headerLang = headerStore
    .get('accept-language')
    ?.split(',')[0]
    ?.slice(0, 2)

  return cookieLang || headerLang || 'vi'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = await getLang()

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col">
        <ClientProviders lang={lang}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
