"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { LogbookEntry } from "@/types/logbook"
import { addLogbookEntry } from "@/lib/logbook-store"

interface LogbookEntryFormProps {
  onEntryAdded: (entry: LogbookEntry) => void
  onCancel: () => void
}

export function LogbookEntryForm({ onEntryAdded, onCancel }: LogbookEntryFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    aircraftMakeModel: "",
    aircraftIdent: "",
    routeFrom: "",
    routeTo: "",
    totalDuration: "",
    airplaneSingleEngineLand: "",
    airplaneSingleEngineSea: "",
    airplaneMultiEngineLand: "",
    rotorcraftHelicopter: "",
    glider: "",
    landingsDay: "",
    landingsNight: "",
    night: "",
    actualInstrument: "",
    simulatedInstrument: "",
    approaches: "",
    crossCountry: "",
    solo: "",
    pilotInCommand: "",
    secondInCommand: "",
    dualReceived: "",
    flightInstructor: "",
    flightSimulator: "",
    flightTrainingDevice: "",
    remarks: "",
    pilotSignature: "Pat Boone",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry = addLogbookEntry({
      date: formData.date,
      aircraftMakeModel: formData.aircraftMakeModel,
      aircraftIdent: formData.aircraftIdent,
      routeFrom: formData.routeFrom,
      routeTo: formData.routeTo,
      totalDuration: Number.parseFloat(formData.totalDuration) || 0,
      airplaneSingleEngineLand: Number.parseFloat(formData.airplaneSingleEngineLand) || 0,
      airplaneSingleEngineSea: Number.parseFloat(formData.airplaneSingleEngineSea) || 0,
      airplaneMultiEngineLand: Number.parseFloat(formData.airplaneMultiEngineLand) || 0,
      rotorcraftHelicopter: Number.parseFloat(formData.rotorcraftHelicopter) || 0,
      glider: Number.parseFloat(formData.glider) || 0,
      landingsDay: Number.parseInt(formData.landingsDay) || 0,
      landingsNight: Number.parseInt(formData.landingsNight) || 0,
      night: Number.parseFloat(formData.night) || 0,
      actualInstrument: Number.parseFloat(formData.actualInstrument) || 0,
      simulatedInstrument: Number.parseFloat(formData.simulatedInstrument) || 0,
      approaches: Number.parseInt(formData.approaches) || 0,
      crossCountry: Number.parseFloat(formData.crossCountry) || 0,
      solo: Number.parseFloat(formData.solo) || 0,
      pilotInCommand: Number.parseFloat(formData.pilotInCommand) || 0,
      secondInCommand: Number.parseFloat(formData.secondInCommand) || 0,
      dualReceived: Number.parseFloat(formData.dualReceived) || 0,
      flightInstructor: Number.parseFloat(formData.flightInstructor) || 0,
      flightSimulator: Number.parseFloat(formData.flightSimulator) || 0,
      flightTrainingDevice: Number.parseFloat(formData.flightTrainingDevice) || 0,
      remarks: formData.remarks,
      pilotSignature: formData.pilotSignature,
    })

    onEntryAdded(entry)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>New Flight Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Flight Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="aircraftMakeModel">Aircraft Make and Model</Label>
              <Input
                id="aircraftMakeModel"
                value={formData.aircraftMakeModel}
                onChange={(e) => handleChange("aircraftMakeModel", e.target.value)}
                placeholder="e.g., Cessna 172"
                required
              />
            </div>
            <div>
              <Label htmlFor="aircraftIdent">Aircraft Ident</Label>
              <Input
                id="aircraftIdent"
                value={formData.aircraftIdent}
                onChange={(e) => handleChange("aircraftIdent", e.target.value)}
                placeholder="e.g., N12345"
                required
              />
            </div>
          </div>

          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="routeFrom">From</Label>
              <Input
                id="routeFrom"
                value={formData.routeFrom}
                onChange={(e) => handleChange("routeFrom", e.target.value)}
                placeholder="e.g., KMIA"
                required
              />
            </div>
            <div>
              <Label htmlFor="routeTo">To</Label>
              <Input
                id="routeTo"
                value={formData.routeTo}
                onChange={(e) => handleChange("routeTo", e.target.value)}
                placeholder="e.g., KFLL"
                required
              />
            </div>
            <div>
              <Label htmlFor="totalDuration">Total Duration (hours)</Label>
              <Input
                id="totalDuration"
                type="number"
                step="0.1"
                value={isNaN(Number(formData.totalDuration)) ? "" : formData.totalDuration}
                onChange={(e) => handleChange("totalDuration", e.target.value)}
                placeholder="1.5"
                required
              />
            </div>
          </div>

          <Separator />

          {/* Aircraft Category and Class */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Aircraft Category and Class</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="airplaneSingleEngineLand">Airplane Single-Engine Land</Label>
                <Input
                  id="airplaneSingleEngineLand"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.airplaneSingleEngineLand)) ? "" : formData.airplaneSingleEngineLand}
                  onChange={(e) => handleChange("airplaneSingleEngineLand", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="airplaneSingleEngineSea">Airplane Single-Engine Sea</Label>
                <Input
                  id="airplaneSingleEngineSea"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.airplaneSingleEngineSea)) ? "" : formData.airplaneSingleEngineSea}
                  onChange={(e) => handleChange("airplaneSingleEngineSea", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="airplaneMultiEngineLand">Airplane Multi-Engine Land</Label>
                <Input
                  id="airplaneMultiEngineLand"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.airplaneMultiEngineLand)) ? "" : formData.airplaneMultiEngineLand}
                  onChange={(e) => handleChange("airplaneMultiEngineLand", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="rotorcraftHelicopter">Rotorcraft Helicopter</Label>
                <Input
                  id="rotorcraftHelicopter"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.rotorcraftHelicopter)) ? "" : formData.rotorcraftHelicopter}
                  onChange={(e) => handleChange("rotorcraftHelicopter", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="glider">Glider</Label>
                <Input
                  id="glider"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.glider)) ? "" : formData.glider}
                  onChange={(e) => handleChange("glider", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Landings */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Landings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="landingsDay">Day</Label>
                <Input
                  id="landingsDay"
                  type="number"
                  value={isNaN(Number(formData.landingsDay)) ? "" : formData.landingsDay}
                  onChange={(e) => handleChange("landingsDay", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="landingsNight">Night</Label>
                <Input
                  id="landingsNight"
                  type="number"
                  value={isNaN(Number(formData.landingsNight)) ? "" : formData.landingsNight}
                  onChange={(e) => handleChange("landingsNight", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Conditions of Flight */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Conditions of Flight</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="night">Night</Label>
                <Input
                  id="night"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.night)) ? "" : formData.night}
                  onChange={(e) => handleChange("night", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="actualInstrument">Actual Instrument</Label>
                <Input
                  id="actualInstrument"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.actualInstrument)) ? "" : formData.actualInstrument}
                  onChange={(e) => handleChange("actualInstrument", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="simulatedInstrument">Simulated Instrument (Hood)</Label>
                <Input
                  id="simulatedInstrument"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.simulatedInstrument)) ? "" : formData.simulatedInstrument}
                  onChange={(e) => handleChange("simulatedInstrument", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="approaches">Approaches</Label>
                <Input
                  id="approaches"
                  type="number"
                  value={isNaN(Number(formData.approaches)) ? "" : formData.approaches}
                  onChange={(e) => handleChange("approaches", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Type of Piloting Time */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Type of Piloting Time</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="crossCountry">Cross Country</Label>
                <Input
                  id="crossCountry"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.crossCountry)) ? "" : formData.crossCountry}
                  onChange={(e) => handleChange("crossCountry", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="solo">Solo</Label>
                <Input
                  id="solo"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.solo)) ? "" : formData.solo}
                  onChange={(e) => handleChange("solo", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pilotInCommand">Pilot in Command</Label>
                <Input
                  id="pilotInCommand"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.pilotInCommand)) ? "" : formData.pilotInCommand}
                  onChange={(e) => handleChange("pilotInCommand", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="secondInCommand">Second in Command</Label>
                <Input
                  id="secondInCommand"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.secondInCommand)) ? "" : formData.secondInCommand}
                  onChange={(e) => handleChange("secondInCommand", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dualReceived">Dual Received</Label>
                <Input
                  id="dualReceived"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.dualReceived)) ? "" : formData.dualReceived}
                  onChange={(e) => handleChange("dualReceived", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="flightInstructor">As Flight Instructor</Label>
                <Input
                  id="flightInstructor"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.flightInstructor)) ? "" : formData.flightInstructor}
                  onChange={(e) => handleChange("flightInstructor", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Synthetic Training Devices */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Synthetic Training Devices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="flightSimulator">Flight Simulator</Label>
                <Input
                  id="flightSimulator"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.flightSimulator)) ? "" : formData.flightSimulator}
                  onChange={(e) => handleChange("flightSimulator", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="flightTrainingDevice">Flight Training Device</Label>
                <Input
                  id="flightTrainingDevice"
                  type="number"
                  step="0.1"
                  value={isNaN(Number(formData.flightTrainingDevice)) ? "" : formData.flightTrainingDevice}
                  onChange={(e) => handleChange("flightTrainingDevice", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Remarks and Signature */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="remarks">Remarks and Endorsements</Label>
              <Textarea
                id="remarks"
                value={formData.remarks ?? ""}
                onChange={(e) => handleChange("remarks", e.target.value)}
                placeholder="Enter any remarks, endorsements, or notes about this flight..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="pilotSignature">Pilot's Signature</Label>
              <Input
                id="pilotSignature"
                value={formData.pilotSignature ?? ""}
                onChange={(e) => handleChange("pilotSignature", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Add Flight Entry
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
