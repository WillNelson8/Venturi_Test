"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Wrench, Shield, TrendingUp } from "lucide-react"
import type { LogbookEntry, FlightStats } from "@/types/logbook"
import type { Aircraft } from "@/types/enhanced-logbook"
import { getLogbookEntries, calculateFlightStats } from "@/lib/logbook-store"
import { getAircraft, addAircraft } from "@/lib/enhanced-store"
import { LogbookEntryForm } from "@/components/logbook-entry-form"
import { MaintenanceDashboard } from "@/components/maintenance-dashboard"
import { BlockchainDashboard } from "@/components/blockchain-dashboard"
import { MarketAnalysisComponent } from "@/components/market-analysis"
import { AircraftForm } from "@/components/aircraft-form"
import { Navigation } from "@/components/dashboard/navigation"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AircraftSelection } from "@/components/dashboard/aircraft-selection"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { MarketplaceContent } from "@/components/dashboard/marketplace-content"

export default function EnhancedDashboard() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null)
  const [showAircraftForm, setShowAircraftForm] = useState(false)
  const [entries, setEntries] = useState<LogbookEntry[]>([])
  const [stats, setStats] = useState<FlightStats>({
    totalFlightHours: 0,
    totalLandings: 0,
    totalNightHours: 0,
    totalInstrumentHours: 0,
    totalCrossCountry: 0,
    totalPIC: 0,
    totalDual: 0,
    totalSolo: 0
  })
  const [aircraft, setAircraft] = useState<Aircraft[]>([])
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [entriesData, statsData, aircraftData] = await Promise.all([
        getLogbookEntries(),
        calculateFlightStats(),
        getAircraft(),
      ])
      setEntries(entriesData)
      setStats(statsData)
      setAircraft(aircraftData)
      if (aircraftData.length > 0) {
        setSelectedAircraft(aircraftData[0])
      }
    } catch (err) {
      console.error("Error loading data:", err)
      setError("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEntryAdded = (entry: LogbookEntry) => {
    setShowEntryForm(false)
    loadData()
  }

  const handleAircraftAdded = (aircraft: Aircraft) => {
    addAircraft(aircraft)
    setShowAircraftForm(false)
    loadData()
  }

  const filteredEntries = selectedAircraft
    ? entries.filter((entry) => entry.aircraftIdent === selectedAircraft.registration)
    : entries

  const filteredStats = calculateFlightStats(filteredEntries)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading VENTURI Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-muted-foreground">
            Comprehensive aircraft management with blockchain transparency and automated maintenance
          </p>
        </div>

        <AircraftSelection 
          aircraft={aircraft}
          selectedAircraft={selectedAircraft}
          onAircraftSelect={setSelectedAircraft}
          onAddAircraft={() => setShowAircraftForm(true)}
        />

        <QuickActions 
          onAddEntry={() => setShowEntryForm(true)}
          onAddAircraft={() => setShowAircraftForm(true)}
          onShowMarketAnalysis={() => setShowMarketAnalysis(true)}
          selectedAircraft={selectedAircraft}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Marketplace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent 
              selectedAircraft={selectedAircraft}
              filteredEntries={filteredEntries}
              filteredStats={filteredStats}
            />
          </TabsContent>

          <TabsContent value="maintenance">
            <MaintenanceDashboard />
          </TabsContent>

          <TabsContent value="blockchain">
            <BlockchainDashboard />
          </TabsContent>

          <TabsContent value="marketplace">
            <MarketplaceContent />
          </TabsContent>
        </Tabs>
      </div>

      {showEntryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-background rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <LogbookEntryForm onEntryAdded={handleEntryAdded} onCancel={() => setShowEntryForm(false)} />
          </div>
        </div>
      )}

      {showAircraftForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <AircraftForm onAircraftAdded={handleAircraftAdded} onCancel={() => setShowAircraftForm(false)} />
        </div>
      )}

      {showMarketAnalysis && (
        <MarketAnalysisComponent aircraft={aircraft} onClose={() => setShowMarketAnalysis(false)} />
      )}
    </div>
  )
}
