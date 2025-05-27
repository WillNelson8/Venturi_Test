"use client"

import type { Aircraft } from "@/types/enhanced-logbook"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AircraftSelectionProps {
  aircraft: Aircraft[]
  selectedAircraft: Aircraft | null
  onAircraftSelect: (aircraft: Aircraft | null) => void
  onAddAircraft?: () => void
}

export function AircraftSelection({
  aircraft,
  selectedAircraft,
  onAircraftSelect,
  onAddAircraft,
}: AircraftSelectionProps) {
  if (aircraft.length === 0) {
    return (
      <div className="mb-6">
        <p className="text-muted-foreground mb-2">No aircraft added yet.</p>
        {onAddAircraft && (
          <Button onClick={onAddAircraft} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Aircraft
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="mb-6">
      <Select
        value={selectedAircraft?.id}
        onValueChange={(value) => {
          const ac = aircraft.find((a) => a.id === value)
          onAircraftSelect(ac || null)
        }}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select an aircraft" />
        </SelectTrigger>
        <SelectContent>
          {aircraft.map((ac) => (
            <SelectItem key={ac.id} value={ac.id}>
              {ac.registration} - {ac.makeModel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 