import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/utils/providers/SessionProvider'
import { MapProvider } from '@/utils/providers/MapProvider'
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
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
