import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/utils/providers/SessionProvider'
import { MapProvider } from '@/utils/providers/MapProvider'
import AdSense from '@/components/AdSense'
// import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventHive',
  description: 'An App to find events around the locals',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const session = await getServerSession()
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4386496689063821"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
