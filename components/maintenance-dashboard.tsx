"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Package, DollarSign, Calendar } from "lucide-react"
import type { MaintenanceItem, PartOrder, Supplier } from "@/types/enhanced-logbook"
import { getMaintenanceItems, getPartOrders, getSuppliers, addPartOrder } from "@/lib/enhanced-store"

export function MaintenanceDashboard() {
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([])
  const [partOrders, setPartOrders] = useState<PartOrder[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    setMaintenanceItems(getMaintenanceItems())
    setPartOrders(getPartOrders())
    setSuppliers(getSuppliers())
  }, [])

  const getPriorityColor = (priority: string) => {
    const safeP = (priority || "").toLowerCase()
    switch (safeP) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    const safeS = (status || "").toLowerCase()
    switch (safeS) {
      case "overdue":
        return "text-red-600"
      case "due":
        return "text-orange-600"
      case "upcoming":
        return "text-yellow-600"
      case "completed":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getOrderStatusColor = (status: string) => {
    const safeS = (status || "").toLowerCase()
    switch (safeS) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "ordered":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-yellow-100 text-yellow-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "installed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (item: MaintenanceItem) => {
    const hoursUntilDue = item.dueHours - item.currentHours
    const totalInterval = item.recurringInterval || 100
    const progress = Math.max(0, Math.min(100, ((totalInterval - hoursUntilDue) / totalInterval) * 100))
    return progress
  }

  const handleOrderPart = (item: MaintenanceItem) => {
    const newOrder = addPartOrder({
      partNumber: item.partNumber,
      partName: item.itemName,
      quantity: 1,
      unitPrice: item.estimatedCost,
      totalPrice: item.estimatedCost,
      supplier: item.supplier,
      status: "pending",
      orderDate: new Date().toISOString(),
      aircraftId: item.aircraftId,
      maintenanceItemId: item.id,
    })
    setPartOrders([...partOrders, newOrder])
  }

  const upcomingItems = maintenanceItems.filter((item) => (item?.status || "") === "upcoming")
  const dueItems = maintenanceItems.filter((item) => (item?.status || "") === "due")
  const overdueItems = maintenanceItems.filter((item) => (item?.status || "") === "overdue")

  const totalMaintenanceCost = maintenanceItems.reduce((sum, item) => sum + (item?.estimatedCost || 0), 0)
  const pendingOrdersValue = partOrders
    .filter((order) => {
      const status = order?.status || ""
      return status === "pending" || status === "ordered"
    })
    .reduce((sum, order) => sum + (order?.totalPrice || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueItems.length + dueItems.length}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Items</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{upcomingItems.length}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {partOrders.filter((o) => o.status === "pending" || o.status === "ordered").length}
            </div>
            <p className="text-xs text-muted-foreground">${pendingOrdersValue.toFixed(2)} value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Annual Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMaintenanceCost.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Based on current schedule</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="maintenance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="orders">Part Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Due Hours</TableHead>
                    <TableHead>Hours Remaining</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceItems.map((item) => {
                    const hoursRemaining = item.dueHours - item.currentHours
                    const progress = calculateProgress(item)

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.itemName}</div>
                            <div className="text-sm text-muted-foreground">{item.partNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(item.priority)} text-white`}>{item.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={progress} className="w-20" />
                            <div className="text-xs text-muted-foreground">{progress.toFixed(0)}%</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.dueHours}</TableCell>
                        <TableCell className={getStatusColor(item.status)}>
                          {hoursRemaining > 0 ? `${hoursRemaining.toFixed(1)} hrs` : "OVERDUE"}
                        </TableCell>
                        <TableCell>${item.estimatedCost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => handleOrderPart(item)}>
                            Order Part
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Part Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Tracking</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.partName}</div>
                          <div className="text-sm text-muted-foreground">{order.partNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {order.trackingNumber ? (
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            {order.trackingNumber}
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({supplier.rating})</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{supplier.location}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Specialties</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {supplier.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Avg. Delivery</div>
                    <div className="text-sm text-muted-foreground">{supplier.averageDeliveryTime} days</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      View Catalog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
