"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Settings, TrendingUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
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
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Analysis
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <ThemeToggle />
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Blockchain Synced</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 