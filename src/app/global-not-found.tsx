import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { NotFoundContent } from '@/components/NotFoundContent'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { cn } from '@/utilities/ui'

import './(frontend)/globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Page Not Found | SouthAfricanBet.co.za',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html className={cn(bricolage.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon-192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/favicon-512.png" rel="icon" sizes="512x512" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      </head>
      <body>
        <div className="min-h-screen">
          <Header />
          <main>
            <NotFoundContent />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
