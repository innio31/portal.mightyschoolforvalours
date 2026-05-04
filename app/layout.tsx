import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MSV School Portal | Mighty School for Valours',
  description: 'School management portal for students, parents, and staff',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MSV Portal',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#1c3877" />
      </head>
      <body>{children}</body>
    </html>
  )
}