"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText, TrendingUp } from "lucide-react"
import type { Aircraft } from "@/types/enhanced-logbook"

interface QuickActionsProps {
  onAddEntry: () => void
  onAddAircraft: () => void
  onShowMarketAnalysis: () => void
  selectedAircraft: Aircraft | null
}

export function QuickActions({ 
  onAddEntry, 
  onAddAircraft, 
  onShowMarketAnalysis,
  selectedAircraft 
}: QuickActionsProps) {
  return (
    <div className="flex gap-4 mb-8">
      <Button 
        onClick={onAddEntry} 
        className="flex items-center gap-2"
        disabled={!selectedAircraft}
        title={!selectedAircraft ? "Please select an aircraft first" : "Add a new flight entry"}
      >
        <Plus className="h-4 w-4" />
        Add New Flight
      </Button>
      <Button 
        variant="outline"
        onClick={onShowMarketAnalysis}
        disabled={!selectedAircraft}
        title={!selectedAircraft ? "Please select an aircraft first" : "View available reports"}
      >
        <FileText className="h-4 w-4 mr-2" />
        View Reports
      </Button>
      <Button onClick={onAddAircraft} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Manage Aircraft
      </Button>
    </div>
  )
} 