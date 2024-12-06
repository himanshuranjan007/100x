import './globals.css'

import { Inter } from 'next/font/google'
// import { ThemeProvider } from '@/components/theme-provider'
import { ThemeProvider } from 'next-themes'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Billing System',
  description: 'A modern billing system for managing company rates and generating bills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

