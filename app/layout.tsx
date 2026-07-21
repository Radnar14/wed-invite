/**
 * Root Layout - Server Component
 * 
 * Kept as a Server Component to support Next.js metadata exports.
 * All client-side state and interactivity (envelope animation, music player)
 * is delegated to RootLayoutClient component.
 * 
 * ARCHITECTURE:
 * - layout.tsx (server): Metadata, fonts, static structure
 * - layout-client.tsx (client): Envelope state, animations, music control
 * - page.tsx (client): Wedding page content (simplified)
 */

import type { Metadata } from 'next'
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { RootLayoutClient } from './layout-client'
import { COUPLE_NAMES, WEDDING_DISPLAY_DATE_LONG } from '@/lib/wedding-config'

// Custom font definitions
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat'
})

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: '400',
  variable: '--font-great-vibes'
})

export const metadata: Metadata = {
  title: `${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride} | Wedding`,
  description: `Join us in celebrating our love - ${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride} Wedding, ${WEDDING_DISPLAY_DATE_LONG}`,
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} bg-background`}>
      <body className="font-serif antialiased">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}

