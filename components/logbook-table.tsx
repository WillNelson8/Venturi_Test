"use client"

import type { LogbookEntry } from "@/types/logbook"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LogbookTableProps {
  entries: LogbookEntry[]
}

export function LogbookTable({ entries }: LogbookTableProps) {
  const formatDuration = (hours: number | undefined) => {
    return hours && hours > 0 ? hours.toFixed(1) : "-"
  }

  const formatCount = (count: number | undefined) => {
    return count && count > 0 ? count.toString() : "-"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Log Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Aircraft</TableHead>
                <TableHead>Ident</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Landings</TableHead>
                <TableHead>Night</TableHead>
                <TableHead>Instrument</TableHead>
                <TableHead>PIC</TableHead>
                <TableHead>Dual</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {entry?.date ? new Date(entry.date).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>{entry?.aircraftMakeModel || "-"}</TableCell>
                  <TableCell className="font-mono text-sm">{entry?.aircraftIdent || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{entry?.routeFrom || "-"}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-sm">{entry?.routeTo || "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatDuration(entry.totalDuration)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {entry.airplaneSingleEngineLand > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          SEL: {formatDuration(entry.airplaneSingleEngineLand)}
                        </Badge>
                      )}
                      {entry.airplaneMultiEngineLand > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          MEL: {formatDuration(entry.airplaneMultiEngineLand)}
                        </Badge>
                      )}
                      {entry.rotorcraftHelicopter > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Heli: {formatDuration(entry.rotorcraftHelicopter)}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {entry.landingsDay > 0 && <div>Day: {formatCount(entry.landingsDay)}</div>}
                      {entry.landingsNight > 0 && <div>Night: {formatCount(entry.landingsNight)}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{formatDuration(entry.night)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {entry.actualInstrument > 0 && <div>Actual: {formatDuration(entry.actualInstrument)}</div>}
                      {entry.simulatedInstrument > 0 && <div>Hood: {formatDuration(entry.simulatedInstrument)}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{formatDuration(entry.pilotInCommand)}</TableCell>
                  <TableCell>{formatDuration(entry.dualReceived)}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">{entry.remarks || "-"}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
