import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './pages/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlameFox',
  description: 'Fire detection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
