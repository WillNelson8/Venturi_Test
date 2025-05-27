import type { Aircraft, MaintenanceItem, PartOrder, Supplier, FlightSensorData } from "@/types/enhanced-logbook"

// Sample aircraft data
let aircraft: Aircraft[] = []

// Sample maintenance items
const maintenanceItems: MaintenanceItem[] = [
  {
    id: "1",
    aircraftId: "1",
    itemName: "Oil Change",
    partNumber: "OIL-15W50-6QT",
    description: "Engine oil change with filter replacement",
    dueHours: 1300,
    currentHours: 1247.3,
    status: "upcoming",
    priority: "medium",
    estimatedCost: 125.0,
    supplier: "Aircraft Spruce",
    nextDue: "2025-06-15",
    recurringInterval: 50,
  },
  {
    id: "2",
    aircraftId: "1",
    itemName: "Annual Inspection",
    partNumber: "INSP-ANNUAL",
    description: "FAA required annual inspection",
    dueHours: 1300,
    currentHours: 1247.3,
    status: "upcoming",
    priority: "critical",
    estimatedCost: 2500.0,
    supplier: "Certified Maintenance Shop",
    nextDue: "2025-12-15",
  },
  {
    id: "3",
    aircraftId: "1",
    itemName: "Spark Plugs",
    partNumber: "SPARK-REM40E",
    description: "Replace all 4 spark plugs",
    dueHours: 1400,
    currentHours: 1247.3,
    status: "upcoming",
    priority: "medium",
    estimatedCost: 280.0,
    supplier: "Champion Aerospace",
    nextDue: "2025-08-20",
    recurringInterval: 100,
  },
]

// Sample part orders
const partOrders: PartOrder[] = [
  {
    id: "1",
    partNumber: "OIL-15W50-6QT",
    partName: "Phillips 66 X/C 15W-50 Oil (6 Qt)",
    quantity: 1,
    unitPrice: 89.95,
    totalPrice: 89.95,
    supplier: "Aircraft Spruce",
    status: "shipped",
    orderDate: "2025-05-20",
    expectedDelivery: "2025-05-27",
    trackingNumber: "1Z999AA1234567890",
    aircraftId: "1",
    maintenanceItemId: "1",
  },
]

// Sample suppliers
const suppliers: Supplier[] = [
  {
    id: "1",
    name: "Aircraft Spruce",
    rating: 4.8,
    location: "Corona, CA",
    specialties: ["Engine Parts", "Avionics", "Tools"],
    certifications: ["FAA Approved", "PMA Parts"],
    averageDeliveryTime: 3,
    contactInfo: {
      email: "orders@aircraftspruce.com",
      phone: "877-4-SPRUCE",
      website: "https://aircraftspruce.com",
    },
  },
  {
    id: "2",
    name: "Champion Aerospace",
    rating: 4.9,
    location: "Liberty, SC",
    specialties: ["Ignition Systems", "Spark Plugs", "Filters"],
    certifications: ["FAA PMA", "EASA Approved"],
    averageDeliveryTime: 2,
    contactInfo: {
      email: "sales@championaerospace.com",
      phone: "864-843-7000",
      website: "https://championaerospace.com",
    },
  },
]

// Sample flight sensor data
const flightSensorData: FlightSensorData[] = [
  {
    id: "1",
    flightId: "flight-1",
    timestamp: "2025-05-25T10:30:00Z",
    altitude: 3500,
    airspeed: 120,
    engineRPM: 2400,
    fuelFlow: 8.5,
    oilPressure: 75,
    oilTemperature: 180,
    engineHours: 1247.3,
    coordinates: {
      latitude: 25.7617,
      longitude: -80.1918,
    },
  },
]

export function getAircraft(): Aircraft[] {
  return aircraft.map((ac) => ({
    ...ac,
    registration: ac.registration || "",
    makeModel: ac.makeModel || "",
    owner: ac.owner || "",
    blockchainAddress: ac.blockchainAddress || "",
  }))
}

export function getMaintenanceItems(aircraftId?: string): MaintenanceItem[] {
  const items = aircraftId ? maintenanceItems.filter((item) => item.aircraftId === aircraftId) : [...maintenanceItems]

  return items.map((item) => ({
    ...item,
    itemName: item.itemName || "",
    partNumber: item.partNumber || "",
    description: item.description || "",
    supplier: item.supplier || "",
    remarks: item.remarks || "",
  }))
}

export function getPartOrders(aircraftId?: string): PartOrder[] {
  const orders = aircraftId ? partOrders.filter((order) => order.aircraftId === aircraftId) : [...partOrders]

  return orders.map((order) => ({
    ...order,
    partNumber: order.partNumber || "",
    partName: order.partName || "",
    supplier: order.supplier || "",
    trackingNumber: order.trackingNumber || "",
  }))
}

export function getSuppliers(): Supplier[] {
  return suppliers.map((supplier) => ({
    ...supplier,
    name: supplier.name || "",
    location: supplier.location || "",
    specialties: supplier.specialties || [],
    certifications: supplier.certifications || [],
  }))
}

export function getFlightSensorData(flightId?: string): FlightSensorData[] {
  if (flightId) {
    return flightSensorData.filter((data) => data.flightId === flightId)
  }
  return [...flightSensorData]
}

export function addPartOrder(order: Omit<PartOrder, "id">): PartOrder {
  const newOrder: PartOrder = {
    ...order,
    id: Date.now().toString(),
  }
  partOrders.push(newOrder)
  return newOrder
}

export function updatePartOrderStatus(orderId: string, status: PartOrder["status"]): PartOrder | null {
  const order = partOrders.find((o) => o.id === orderId)
  if (order) {
    order.status = status
    return order
  }
  return null
}

export function addAircraft(newAircraft: Aircraft): Aircraft {
  aircraft = [...aircraft, newAircraft]
  return newAircraft
}

export function updateAircraft(updatedAircraft: Aircraft): Aircraft {
  aircraft = aircraft.map((ac) => (ac.id === updatedAircraft.id ? updatedAircraft : ac))
  return updatedAircraft
}

export function deleteAircraft(aircraftId: string): void {
  aircraft = aircraft.filter((ac) => ac.id !== aircraftId)
}
