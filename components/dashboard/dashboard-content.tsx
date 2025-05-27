"use client"

import type { Aircraft } from "@/types/enhanced-logbook"
import type { LogbookEntry, FlightStats } from "@/types/logbook"
import { format } from "date-fns"
import { DashboardStats } from "@/components/dashboard-stats"
import { LogbookTable } from "@/components/logbook-table"

interface DashboardContentProps {
  selectedAircraft: Aircraft | null
  filteredEntries: LogbookEntry[]
  filteredStats: FlightStats
}

export function DashboardContent({ selectedAircraft, filteredEntries, filteredStats }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <DashboardStats stats={filteredStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LogbookTable entries={filteredEntries} />
        </div>
        <div>
          <div className="bg-card rounded-xl p-6 shadow">
            <h3 className="text-lg font-medium mb-4">Aircraft Details</h3>
            {selectedAircraft ? (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Registration:</span> {selectedAircraft.registration}
                </div>
                <div>
                  <span className="font-semibold">Make & Model:</span> {selectedAircraft.makeModel}
                </div>
                <div>
                  <span className="font-semibold">Year:</span> {selectedAircraft.year}
                </div>
                <div>
                  <span className="font-semibold">Current Hours:</span> {selectedAircraft.currentHours}
                </div>
                <div>
                  <span className="font-semibold">Next Inspection:</span> {selectedAircraft.nextInspection ? format(new Date(selectedAircraft.nextInspection), "MMM d, yyyy") : "N/A"}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Select an aircraft to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 