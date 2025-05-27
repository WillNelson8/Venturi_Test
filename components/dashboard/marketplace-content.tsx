"use client"

import { Button } from "@/components/ui/button"

export function MarketplaceContent() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Aviation Marketplace</h2>
      <p className="text-muted-foreground mb-6">
        Connect with certified suppliers, browse parts, and access market valuations
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Parts & Supplies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse certified aviation parts from trusted suppliers
          </p>
          <Button className="w-full">Browse Parts</Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Maintenance Services</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Find certified maintenance providers in your area
          </p>
          <Button className="w-full">Find Services</Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Aircraft Valuation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get real-time market valuations for your aircraft
          </p>
          <Button className="w-full">Get Valuation</Button>
        </div>
      </div>
    </div>
  )
} 