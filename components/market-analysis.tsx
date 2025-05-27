"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, DollarSign, Calendar, MapPin, Star, FileText } from "lucide-react"
import type { MarketAnalysis, MarketReport } from "@/types/market-analysis"
import type { Aircraft } from "@/types/enhanced-logbook"
import { marketAnalysisService } from "@/lib/market-analysis-service"

interface MarketAnalysisProps {
  aircraft: Aircraft[]
  onClose: () => void
}

export function MarketAnalysisComponent({ aircraft, onClose }: MarketAnalysisProps) {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(aircraft[0] || null)
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [marketReport, setMarketReport] = useState<MarketReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedAircraft) {
      loadAnalysis()
    }
  }, [selectedAircraft])

  const loadAnalysis = async () => {
    if (!selectedAircraft) return

    setIsLoading(true)
    try {
      const [analysisData, reportData] = await Promise.all([
        marketAnalysisService.getMarketAnalysis(selectedAircraft),
        marketAnalysisService.getMarketReport(selectedAircraft.makeModel),
      ])
      setAnalysis(analysisData)
      setMarketReport(reportData)
    } catch (error) {
      console.error("Error loading market analysis:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateMarketReport = async (aircraft: Aircraft, analysis: MarketAnalysis, marketReport: MarketReport) => {
    const reportContent = `
      AIRCRAFT MARKET ANALYSIS REPORT
      =============================
      
      Aircraft Information:
      -------------------
      Registration: ${aircraft.registration}
      Make & Model: ${aircraft.makeModel}
      Year: ${aircraft.year}
      Current Hours: ${aircraft.currentHours}
      Last Inspection: ${new Date(aircraft.lastInspection).toLocaleDateString()}
      Next Inspection: ${new Date(aircraft.nextInspection).toLocaleDateString()}
      
      Market Valuation:
      ---------------
      Current Book Value: $${analysis.currentValue.toLocaleString()}
      Estimated Market Value: $${analysis.estimatedValue.toLocaleString()}
      Market Trend: ${analysis.marketTrend.toUpperCase()} (${analysis.trendPercentage > 0 ? '+' : ''}${analysis.trendPercentage}%)
      
      Market Overview:
      --------------
      Average Price: $${marketReport.averagePrice.toLocaleString()}
      Median Price: $${marketReport.medianPrice.toLocaleString()}
      Total Listings: ${marketReport.totalListings}
      Average Days on Market: ${marketReport.averageDaysOnMarket}
      Price Range: $${marketReport.priceRange.min.toLocaleString()} - $${marketReport.priceRange.max.toLocaleString()}
      
      Regional Market Data:
      -------------------
      ${marketReport.regionData.map(region => 
        `${region.region}: $${region.averagePrice.toLocaleString()} (${region.listings} listings)`
      ).join('\n')}
      
      Comparable Aircraft:
      -----------------
      ${analysis.comparableAircraft.map(comp => 
        `${comp.makeModel} (${comp.year}) - $${comp.price.toLocaleString()} - ${comp.condition} condition - ${comp.hours} hours`
      ).join('\n')}
      
      Value Factors:
      ------------
      ${analysis.marketFactors.map(factor => 
        `${factor.factor} (${factor.impact.toUpperCase()}) - ${factor.description}`
      ).join('\n')}
      
      Report Generated: ${new Date().toLocaleString()}
    `

    // Create a blob and download the report
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `market-analysis-${aircraft.registration}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Analyzing market data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Market Analysis</CardTitle>
          <div className="flex gap-2">
            {analysis && marketReport && (
              <Button
                variant="outline"
                onClick={() => generateMarketReport(selectedAircraft!, analysis, marketReport)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Aircraft Selection */}
          <div className="flex gap-2 flex-wrap">
            {aircraft.map((ac) => (
              <Button
                key={ac.id}
                variant={selectedAircraft?.id === ac.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAircraft(ac)}
              >
                {ac.registration} - {ac.makeModel}
              </Button>
            ))}
          </div>

          {analysis && marketReport && (
            <Tabs defaultValue="valuation" className="space-y-4">
              <TabsList>
                <TabsTrigger value="valuation">Aircraft Valuation</TabsTrigger>
                <TabsTrigger value="comparables">Comparable Sales</TabsTrigger>
                <TabsTrigger value="market">Market Report</TabsTrigger>
                <TabsTrigger value="factors">Value Factors</TabsTrigger>
              </TabsList>

              <TabsContent value="valuation" className="space-y-4">
                {/* Valuation Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                      <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${analysis.currentValue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Book value</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Estimated Market Value</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${analysis.estimatedValue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Based on market analysis</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
                      {getTrendIcon(analysis.marketTrend)}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${getTrendColor(analysis.marketTrend)}`}>
                        {analysis.trendPercentage > 0 ? "+" : ""}
                        {analysis.trendPercentage}%
                      </div>
                      <p className="text-xs text-muted-foreground">6-month trend</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Value History Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Value History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.valueHistory.map((point, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{point.date}</span>
                          <span className="font-medium">${point.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparables" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparable Aircraft</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Aircraft</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead>Days on Market</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysis.comparableAircraft.map((comp) => (
                          <TableRow key={comp.id}>
                            <TableCell className="font-medium">{comp.makeModel}</TableCell>
                            <TableCell>{comp.year}</TableCell>
                            <TableCell>{comp.hours.toLocaleString()}</TableCell>
                            <TableCell className="font-medium">${comp.price.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {comp.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getConditionColor(comp.condition)}>{comp.condition}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {comp.daysOnMarket} days
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="space-y-4">
                {/* Market Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">${marketReport.averagePrice.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Median Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">${marketReport.medianPrice.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{marketReport.totalListings}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Days on Market</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{marketReport.averageDaysOnMarket}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Regional Data */}
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Market Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketReport.regionData.map((region, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{region.region}</div>
                            <div className="text-sm text-muted-foreground">{region.listings} listings</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${region.averagePrice.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">avg. price</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="factors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Value Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.marketFactors.map((factor, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{factor.factor}</span>
                              <Badge className={getImpactColor(factor.impact)}>{factor.impact}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{factor.weight}/1.0</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                          <Progress value={factor.weight * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
