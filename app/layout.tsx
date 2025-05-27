import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Venturi - Aviation Logbook',
  description: 'Modern aviation logbook for pilots',
}

const navigationLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/maintenance', label: 'Maintenance' },
  { href: '/blockchain', label: 'Blockchain' },
  { href: '/market', label: 'Market Data' },
  { href: '/profile', label: 'Profile' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-serif">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-[#FF10F0]/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  {/* Logo */}
                  <Link href="/" className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <svg width="120" height="48" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M 20 20 Q 60 20 80 40 Q 60 60 20 60 Z M 180 20 Q 140 20 120 40 Q 140 60 180 60 Z" stroke="#0088ff" strokeWidth="3" fill="none"/>
                          <path d="M 10 30 Q 100 30 190 30" stroke="#00ff88" strokeWidth="2" opacity="0.8">
                            <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" repeatCount="indefinite"/>
                          </path>
                          <path d="M 10 40 Q 100 40 190 40" stroke="#00ff88" strokeWidth="2" opacity="0.6">
                            <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" begin="0.2s" repeatCount="indefinite"/>
                          </path>
                          <path d="M 10 50 Q 100 50 190 50" stroke="#00ff88" strokeWidth="2" opacity="0.4">
                            <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" begin="0.4s" repeatCount="indefinite"/>
                          </path>
                          <circle cx="100" cy="40" r="4" fill="#0088ff">
                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                      </span>
                    </div>
                  </Link>

                  {/* Navigation Links */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="nav-link px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <ThemeToggle />
                    </div>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="md:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="text-foreground hover:text-[#FF10F0] transition-colors">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
