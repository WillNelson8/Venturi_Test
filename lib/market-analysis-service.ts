import type { MarketAnalysis, ComparableAircraft, MarketReport } from "@/types/market-analysis"
import type { Aircraft } from "@/types/enhanced-logbook"

class MarketAnalysisService {
  async getMarketAnalysis(aircraft: Aircraft): Promise<MarketAnalysis> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const comparableAircraft: ComparableAircraft[] = [
      {
        id: "1",
        makeModel: "Cessna 172",
        year: 2017,
        hours: 1150,
        price: 465000,
        location: "Florida",
        condition: "excellent",
        daysOnMarket: 45,
      },
      {
        id: "2",
        makeModel: "Cessna 172",
        year: 2019,
        hours: 890,
        price: 520000,
        location: "California",
        condition: "excellent",
        daysOnMarket: 23,
      },
      {
        id: "3",
        makeModel: "Cessna 172",
        year: 2016,
        hours: 1450,
        price: 425000,
        location: "Texas",
        condition: "good",
        daysOnMarket: 67,
      },
      {
        id: "4",
        makeModel: "Cessna 172",
        year: 2018,
        hours: 1200,
        price: 485000,
        location: "Arizona",
        condition: "excellent",
        daysOnMarket: 34,
      },
    ]

    const valueHistory = [
      { date: "2024-01", value: 465000 },
      { date: "2024-02", value: 470000 },
      { date: "2024-03", value: 475000 },
      { date: "2024-04", value: 480000 },
      { date: "2024-05", value: 485000 },
      { date: "2024-06", value: 485000 },
    ]

    const marketFactors = [
      {
        factor: "Low Flight Hours",
        impact: "positive" as const,
        description: "Aircraft has relatively low hours for its age",
        weight: 0.8,
      },
      {
        factor: "Recent Maintenance",
        impact: "positive" as const,
        description: "Well-maintained with recent annual inspection",
        weight: 0.7,
      },
      {
        factor: "Market Demand",
        impact: "positive" as const,
        description: "High demand for Cessna 172 in current market",
        weight: 0.9,
      },
      {
        factor: "Age Factor",
        impact: "neutral" as const,
        description: "Aircraft age is typical for the market segment",
        weight: 0.5,
      },
    ]

    return {
      aircraftId: aircraft.id,
      currentValue: aircraft.marketValue,
      estimatedValue: 492000,
      marketTrend: "up",
      trendPercentage: 2.3,
      comparableAircraft,
      valueHistory,
      marketFactors,
      lastUpdated: new Date().toISOString(),
    }
  }

  async getMarketReport(aircraftType: string): Promise<MarketReport> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      aircraftType,
      averagePrice: 475000,
      medianPrice: 485000,
      totalListings: 127,
      averageDaysOnMarket: 42,
      priceRange: {
        min: 325000,
        max: 650000,
      },
      regionData: [
        { region: "Southeast", averagePrice: 485000, listings: 34 },
        { region: "Southwest", averagePrice: 495000, listings: 28 },
        { region: "Northeast", averagePrice: 465000, listings: 22 },
        { region: "Northwest", averagePrice: 470000, listings: 18 },
        { region: "Midwest", averagePrice: 455000, listings: 25 },
      ],
    }
  }
}

export const marketAnalysisService = new MarketAnalysisService()
