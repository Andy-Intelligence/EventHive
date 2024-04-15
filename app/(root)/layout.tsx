
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import { getServerSession } from 'next-auth'
// import SessionProvider from '@/utils/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


//   const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
{children}
      </body>
    </html>
  );
}
