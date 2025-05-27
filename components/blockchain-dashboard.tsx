"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Link, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import type { BlockchainTransaction, OnChainLogbook } from "@/types/blockchain"
import { blockchainService } from "@/lib/blockchain-service"

export function BlockchainDashboard() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [onChainData, setOnChainData] = useState<OnChainLogbook | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    setIsLoading(true)
    try {
      // Simulate loading blockchain data
      const mockTransactions: BlockchainTransaction[] = [
        {
          id: "1",
          transactionHash: "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87",
          blockNumber: 18234567,
          timestamp: "2025-05-25T10:30:00Z",
          type: "flight_log",
          data: {
            aircraftId: "N12345",
            flightHours: 1.2,
            route: "KMIA-KFLL",
            pilotSignature: "Pat Boone",
          },
          gasUsed: 42150,
          status: "confirmed",
        },
        {
          id: "2",
          transactionHash: "0x8f3e2b1a9c7d5e4f6a8b9c0d1e2f3a4b5c6d7e8f",
          blockNumber: 18234568,
          timestamp: "2025-05-24T14:15:00Z",
          type: "maintenance",
          data: {
            aircraftId: "N12345",
            itemName: "Oil Change",
            partNumber: "OIL-15W50-6QT",
            status: "completed",
          },
          gasUsed: 38920,
          status: "confirmed",
        },
        {
          id: "3",
          transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
          blockNumber: 18234569,
          timestamp: "2025-05-23T09:45:00Z",
          type: "part_order",
          data: {
            partNumber: "SPARK-REM40E",
            supplier: "Champion Aerospace",
            quantity: 4,
            totalPrice: 280.0,
          },
          gasUsed: 35670,
          status: "confirmed",
        },
      ]

      const mockOnChainData = await blockchainService.getOnChainLogbook("N12345")

      setTransactions(mockTransactions)
      setOnChainData(mockOnChainData)
    } catch (error) {
      console.error("Error loading blockchain data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactionTypeColor = (type: string) => {
    const safeType = (type || "").toLowerCase()
    switch (safeType) {
      case "flight_log":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-green-100 text-green-800"
      case "part_order":
        return "bg-purple-100 text-purple-800"
      case "inspection":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    const safeStatus = (status || "").toLowerCase()
    switch (safeStatus) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const totalGasUsed = transactions.reduce((sum, tx) => sum + (tx?.gasUsed || 0), 0)
  const confirmedTransactions = transactions.filter((tx) => (tx?.status || "") === "confirmed").length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Chain Records</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedTransactions}</div>
            <p className="text-xs text-muted-foreground">Verified transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Link className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Ethereum</div>
            <p className="text-xs text-muted-foreground">Sepolia Testnet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Used</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalGasUsed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total gas consumed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {onChainData?.verificationStatus === "verified" ? "VERIFIED" : "PENDING"}
            </div>
            <p className="text-xs text-muted-foreground">Aircraft logbook status</p>
          </CardContent>
        </Card>
      </div>

      {/* Contract Information */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Contract Address</div>
              <div className="font-mono text-sm bg-muted p-2 rounded">{blockchainService.getContractAddress()}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Network</div>
              <div className="font-mono text-sm bg-muted p-2 rounded">{blockchainService.getNetwork()}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View on Etherscan
            </Button>
            <Button variant="outline" size="sm">
              Download ABI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="logbook">On-Chain Logbook</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Gas Used</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tx.status)}
                          <span className="capitalize">{tx.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTransactionTypeColor(tx.type)}>{tx.type.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">
                          {tx.transactionHash.slice(0, 10)}...{tx.transactionHash.slice(-8)}
                        </div>
                      </TableCell>
                      <TableCell>{tx.blockNumber.toLocaleString()}</TableCell>
                      <TableCell>{tx.gasUsed.toLocaleString()}</TableCell>
                      <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logbook" className="space-y-4">
          {onChainData && (
            <Card>
              <CardHeader>
                <CardTitle>On-Chain Logbook Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{onChainData.totalHours}</div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{onChainData.totalFlights}</div>
                    <div className="text-sm text-muted-foreground">Total Flights</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{onChainData.maintenanceHistory.length}</div>
                    <div className="text-sm text-muted-foreground">Maintenance Records</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Maintenance History (Transaction Hashes)</h4>
                  <div className="space-y-2">
                    {onChainData.maintenanceHistory.map((hash, index) => (
                      <div key={index} className="font-mono text-sm bg-muted p-2 rounded">
                        {hash}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Verification Status</h4>
                  <Badge
                    className={
                      onChainData.verificationStatus === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {onChainData.verificationStatus.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["flight_log", "maintenance", "part_order", "inspection"].map((type) => {
                    const count = transactions.filter((tx) => tx.type === type).length
                    const percentage = transactions.length > 0 ? (count / transactions.length) * 100 : 0

                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="capitalize">{type.replace("_", " ")}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gas Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{(totalGasUsed / transactions.length).toFixed(0)}</div>
                    <div className="text-sm text-muted-foreground">Avg Gas per Transaction</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">
                      {Math.max(...transactions.map((tx) => tx.gasUsed)).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Highest Gas Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
