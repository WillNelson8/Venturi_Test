export interface FlightSensorData {
  id: string
  flightId: string
  timestamp: string
  altitude: number
  airspeed: number
  engineRPM: number
  fuelFlow: number
  oilPressure: number
  oilTemperature: number
  engineHours: number
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface MaintenanceItem {
  id: string
  aircraftId: string
  itemName: string
  partNumber: string
  description: string
  dueHours: number
  currentHours: number
  status: "upcoming" | "due" | "overdue" | "completed"
  priority: "low" | "medium" | "high" | "critical"
  estimatedCost: number
  supplier: string
  lastCompleted?: string
  nextDue: string
  recurringInterval?: number
}

export interface PartOrder {
  id: string
  partNumber: string
  partName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  supplier: string
  status: "pending" | "ordered" | "shipped" | "delivered" | "installed"
  orderDate: string
  expectedDelivery?: string
  trackingNumber?: string
  aircraftId: string
  maintenanceItemId?: string
}

export interface Aircraft {
  id: string
  registration: string
  makeModel: string
  year: number
  serialNumber: string
  currentHours: number
  lastInspection: string
  nextInspection: string
  marketValue: number
  owner: string
  blockchainAddress?: string
}

export interface Supplier {
  id: string
  name: string
  rating: number
  location: string
  specialties: string[]
  certifications: string[]
  averageDeliveryTime: number
  contactInfo: {
    email: string
    phone: string
    website?: string
  }
}

export interface Subscription {
  id: string
  userId: string
  plan: "basic" | "premium"
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate: string
  features: string[]
  price: number
}
