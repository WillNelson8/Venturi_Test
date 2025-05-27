export interface MarketAnalysis {
  aircraftId: string
  currentValue: number
  estimatedValue: number
  marketTrend: "up" | "down" | "stable"
  trendPercentage: number
  comparableAircraft: ComparableAircraft[]
  valueHistory: ValueHistoryPoint[]
  marketFactors: MarketFactor[]
  lastUpdated: string
}

export interface ComparableAircraft {
  id: string
  makeModel: string
  year: number
  hours: number
  price: number
  location: string
  condition: "excellent" | "good" | "fair" | "poor"
  daysOnMarket: number
}

export interface ValueHistoryPoint {
  date: string
  value: number
}

export interface MarketFactor {
  factor: string
  impact: "positive" | "negative" | "neutral"
  description: string
  weight: number
}

export interface MarketReport {
  aircraftType: string
  averagePrice: number
  medianPrice: number
  totalListings: number
  averageDaysOnMarket: number
  priceRange: {
    min: number
    max: number
  }
  regionData: RegionData[]
}

export interface RegionData {
  region: string
  averagePrice: number
  listings: number
}
