import type { LogbookEntry, FlightStats } from "@/types/logbook"

// In a real application, this would be connected to a database
const logbookEntries: LogbookEntry[] = [
  {
    id: "1",
    date: "2025-05-25",
    aircraftMakeModel: "Cessna 172",
    aircraftIdent: "N12345",
    routeFrom: "KMIA",
    routeTo: "KFLL",
    totalDuration: 1.2,
    airplaneSingleEngineLand: 1.2,
    airplaneSingleEngineSea: 0,
    airplaneMultiEngineLand: 0,
    rotorcraftHelicopter: 0,
    glider: 0,
    landingsDay: 2,
    landingsNight: 0,
    night: 0,
    actualInstrument: 0,
    simulatedInstrument: 0.3,
    approaches: 2,
    crossCountry: 1.2,
    solo: 0,
    pilotInCommand: 1.2,
    secondInCommand: 0,
    dualReceived: 0,
    flightInstructor: 0,
    flightSimulator: 0,
    flightTrainingDevice: 0,
    remarks: "Practice approaches, good weather",
    pilotSignature: "Pat Boone",
    createdAt: "2025-05-25T10:00:00Z",
    updatedAt: "2025-05-25T10:00:00Z",
  },
  {
    id: "2",
    date: "2025-05-24",
    aircraftMakeModel: "Cessna 172",
    aircraftIdent: "N12345",
    routeFrom: "KFLL",
    routeTo: "KPBI",
    totalDuration: 0.8,
    airplaneSingleEngineLand: 0.8,
    airplaneSingleEngineSea: 0,
    airplaneMultiEngineLand: 0,
    rotorcraftHelicopter: 0,
    glider: 0,
    landingsDay: 1,
    landingsNight: 0,
    night: 0,
    actualInstrument: 0,
    simulatedInstrument: 0,
    approaches: 1,
    crossCountry: 0.8,
    solo: 0,
    pilotInCommand: 0.8,
    secondInCommand: 0,
    dualReceived: 0,
    flightInstructor: 0,
    flightSimulator: 0,
    flightTrainingDevice: 0,
    remarks: "Short cross-country flight",
    pilotSignature: "Pat Boone",
    createdAt: "2025-05-24T14:00:00Z",
    updatedAt: "2025-05-24T14:00:00Z",
  },
]

export function getLogbookEntries(): LogbookEntry[] {
  return [...logbookEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function addLogbookEntry(entry: Omit<LogbookEntry, "id" | "createdAt" | "updatedAt">): LogbookEntry {
  const newEntry: LogbookEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  logbookEntries.push(newEntry)
  return newEntry
}

export function updateLogbookEntry(id: string, updates: Partial<LogbookEntry>): LogbookEntry | null {
  const index = logbookEntries.findIndex((entry) => entry.id === id)
  if (index === -1) return null

  logbookEntries[index] = {
    ...logbookEntries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return logbookEntries[index]
}

export function deleteLogbookEntry(id: string): boolean {
  const index = logbookEntries.findIndex((entry) => entry.id === id)
  if (index === -1) return false

  logbookEntries.splice(index, 1)
  return true
}

export function calculateFlightStats(entries: LogbookEntry[] = logbookEntries): FlightStats {
  return entries.reduce(
    (stats, entry) => ({
      totalFlightHours: stats.totalFlightHours + (entry.totalDuration || 0),
      totalLandings: stats.totalLandings + (entry.landingsDay || 0) + (entry.landingsNight || 0),
      totalNightHours: stats.totalNightHours + (entry.night || 0),
      totalInstrumentHours: stats.totalInstrumentHours + (entry.actualInstrument || 0) + (entry.simulatedInstrument || 0),
      totalCrossCountry: stats.totalCrossCountry + (entry.crossCountry || 0),
      totalPIC: stats.totalPIC + (entry.pilotInCommand || 0),
      totalDual: stats.totalDual + (entry.dualReceived || 0),
      totalSolo: stats.totalSolo + (entry.solo || 0),
    }),
    {
      totalFlightHours: 0,
      totalLandings: 0,
      totalNightHours: 0,
      totalInstrumentHours: 0,
      totalCrossCountry: 0,
      totalPIC: 0,
      totalDual: 0,
      totalSolo: 0,
    },
  )
}
