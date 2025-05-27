"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Aircraft } from "@/types/enhanced-logbook"

interface AircraftFormProps {
  onAircraftAdded: (aircraft: Aircraft) => void
  onCancel: () => void
}

export function AircraftForm({ onAircraftAdded, onCancel }: AircraftFormProps) {
  const [formData, setFormData] = useState({
    registration: "",
    makeModel: "",
    year: new Date().getFullYear(),
    serialNumber: "",
    currentHours: 0,
    lastInspection: new Date().toISOString().split("T")[0],
    nextInspection: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    marketValue: 0,
    owner: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAircraft: Aircraft = {
      id: crypto.randomUUID(),
      ...formData,
      blockchainAddress: "", // This would be generated when connecting to blockchain
    }
    onAircraftAdded(newAircraft)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Aircraft</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={formData.registration}
                onChange={(e) => handleChange("registration", e.target.value)}
                placeholder="N12345"
                required
              />
            </div>
            <div>
              <Label htmlFor="makeModel">Make & Model</Label>
              <Input
                id="makeModel"
                value={formData.makeModel}
                onChange={(e) => handleChange("makeModel", e.target.value)}
                placeholder="Cessna 172"
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange("year", parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => handleChange("serialNumber", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="currentHours">Current Hours</Label>
              <Input
                id="currentHours"
                type="number"
                step="0.1"
                value={formData.currentHours}
                onChange={(e) => handleChange("currentHours", parseFloat(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="marketValue">Market Value ($)</Label>
              <Input
                id="marketValue"
                type="number"
                value={formData.marketValue}
                onChange={(e) => handleChange("marketValue", parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastInspection">Last Inspection Date</Label>
              <Input
                id="lastInspection"
                type="date"
                value={formData.lastInspection}
                onChange={(e) => handleChange("lastInspection", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="nextInspection">Next Inspection Date</Label>
              <Input
                id="nextInspection"
                type="date"
                value={formData.nextInspection}
                onChange={(e) => handleChange("nextInspection", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="owner">Owner Name</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => handleChange("owner", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Aircraft</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 