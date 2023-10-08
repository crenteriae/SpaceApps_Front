"use client"
import './globals.css'
import type { Metadata } from 'next'
import Header from './pages/header'
import { Libre_Baskerville, Open_Sans } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";


const libre_baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-librebaskerville'
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${libre_baskerville.variable} font-serif ${open_sans.variable} font-sans`}>
        <NextUIProvider>
          <Header/>
          {children}
        </NextUIProvider>
        </body>
      </html>
  )
}
