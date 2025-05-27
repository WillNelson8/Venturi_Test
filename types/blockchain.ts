export interface BlockchainTransaction {
  id: string
  transactionHash: string
  blockNumber: number
  timestamp: string
  type: "flight_log" | "maintenance" | "part_order" | "inspection"
  data: any
  gasUsed: number
  status: "pending" | "confirmed" | "failed"
}

export interface SmartContractData {
  contractAddress: string
  abi: any[]
  network: "mainnet" | "sepolia" | "polygon"
}

export interface OnChainLogbook {
  aircraftId: string
  totalHours: number
  totalFlights: number
  lastUpdate: string
  maintenanceHistory: string[]
  ownershipHistory: string[]
  verificationStatus: "verified" | "pending" | "unverified"
}
