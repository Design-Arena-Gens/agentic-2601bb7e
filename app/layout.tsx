import './globals.css'
import type { Metadata } from 'next'
import { Sidebar } from '@/components/Sidebar'
import { Topbar } from '@/components/Topbar'

export const metadata: Metadata = {
  title: 'LIMS Lockbox',
  description: 'Lightweight LIMS for sample lockbox tracking',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="container-page">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
