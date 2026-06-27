import type { Metadata } from 'next'
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { MusicPlayer } from "@/components/wedding/music-player"
import ClientMountProvider from '@/components/ClientMountProvider'
import { Doors } from '@/components/wedding/doors'


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
  title: 'John Mark & Chezza | Wedding',
  description: 'Join us in celebrating our love - John Mark & Chezza Wedding, December 28, 2026',
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
        <Doors />
        <ClientMountProvider>
          {children}
        </ClientMountProvider>
        <MusicPlayer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
