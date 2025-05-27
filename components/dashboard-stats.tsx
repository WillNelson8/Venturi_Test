"use client"

import type { FlightStats } from "@/types/logbook"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Clock, Moon, Navigation, User, Users } from "lucide-react"

interface DashboardStatsProps {
  stats: FlightStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Flight Hours",
      value: stats.totalFlightHours.toFixed(1),
      unit: "hrs",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Total Landings",
      value: stats.totalLandings.toString(),
      unit: "",
      icon: Plane,
      color: "text-green-500",
    },
    {
      title: "Night Hours",
      value: stats.totalNightHours.toFixed(1),
      unit: "hrs",
      icon: Moon,
      color: "text-purple-500",
    },
    {
      title: "Instrument Hours",
      value: stats.totalInstrumentHours.toFixed(1),
      unit: "hrs",
      icon: Navigation,
      color: "text-orange-500",
    },
    {
      title: "Cross Country",
      value: stats.totalCrossCountry.toFixed(1),
      unit: "hrs",
      icon: Navigation,
      color: "text-cyan-500",
    },
    {
      title: "Pilot in Command",
      value: stats.totalPIC.toFixed(1),
      unit: "hrs",
      icon: User,
      color: "text-red-500",
    },
    {
      title: "Dual Received",
      value: stats.totalDual.toFixed(1),
      unit: "hrs",
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Solo Hours",
      value: stats.totalSolo.toFixed(1),
      unit: "hrs",
      icon: User,
      color: "text-indigo-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.unit && <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
