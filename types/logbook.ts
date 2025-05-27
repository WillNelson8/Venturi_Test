export interface LogbookEntry {
  id: string
  date: string
  aircraftMakeModel: string
  aircraftIdent: string
  routeFrom: string
  routeTo: string
  totalDuration: number

  // Aircraft Category and Class
  airplaneSingleEngineLand: number
  airplaneSingleEngineSea: number
  airplaneMultiEngineLand: number
  rotorcraftHelicopter: number
  glider: number

  // Landings
  landingsDay: number
  landingsNight: number

  // Conditions of Flight
  night: number
  actualInstrument: number
  simulatedInstrument: number
  approaches: number

  // Type of Piloting Time
  crossCountry: number
  solo: number
  pilotInCommand: number
  secondInCommand: number
  dualReceived: number
  flightInstructor: number

  // Synthetic Training Devices
  flightSimulator: number
  flightTrainingDevice: number

  remarks: string
  pilotSignature: string

  createdAt: string
  updatedAt: string
}

export interface FlightStats {
  totalFlightHours: number
  totalLandings: number
  totalNightHours: number
  totalInstrumentHours: number
  totalCrossCountry: number
  totalPIC: number
  totalDual: number
  totalSolo: number
}
