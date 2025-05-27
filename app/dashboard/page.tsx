"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Flight = {
  id: string;
  date: string;
  aircraft: {
    registration: string;
    makeModel: string;
  };
  route: {
    departure: string;
    arrival: string;
  };
  flightTime: {
    total: number;
  };
  conditions: "VFR" | "IFR";
};

export default function Dashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadFlights = () => {
      try {
        const storedFlights = localStorage.getItem("flights");
        if (storedFlights) {
          const parsedFlights = JSON.parse(storedFlights);
          setFlights(parsedFlights);
        }
      } catch (error) {
        console.error("Error loading flights:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card">
          <h3 className="text-muted-foreground text-sm uppercase mb-2">Total Flight Hours</h3>
          <p className="text-3xl font-bold text-foreground">
            {flights.reduce((sum, flight) => sum + (flight.flightTime?.total || 0), 0).toFixed(1)}
          </p>
        </div>
        <div className="stats-card">
          <h3 className="text-muted-foreground text-sm uppercase mb-2">Total Flights</h3>
          <p className="text-3xl font-bold text-foreground">{flights.length}</p>
        </div>
        <div className="stats-card">
          <h3 className="text-muted-foreground text-sm uppercase mb-2">Aircraft Types</h3>
          <p className="text-3xl font-bold text-foreground">
            {new Set(flights.map(f => f.aircraft.makeModel)).size}
          </p>
        </div>
        <div className="stats-card">
          <h3 className="text-muted-foreground text-sm uppercase mb-2">Recent Activity</h3>
          <p className="text-3xl font-bold text-foreground">
            {flights.length > 0 ? 'Active' : 'None'}
          </p>
        </div>
      </div>

      {/* Recent Flights Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Flights</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left py-3 px-4">Date</th>
                <th className="table-header text-left py-3 px-4">Aircraft</th>
                <th className="table-header text-left py-3 px-4">Route</th>
                <th className="table-header text-left py-3 px-4">Duration</th>
                <th className="table-header text-left py-3 px-4">Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="table-row">
                  <td colSpan={5} className="py-4 px-4 text-muted-foreground text-center">Loading flights...</td>
                </tr>
              ) : flights.length === 0 ? (
                <tr className="table-row">
                  <td colSpan={5} className="py-4 px-4 text-muted-foreground text-center">No flights recorded</td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="table-row">
                    <td className="py-4 px-4 text-foreground">{flight.date}</td>
                    <td className="py-4 px-4 text-foreground">
                      {flight.aircraft.registration} - {flight.aircraft.makeModel}
                    </td>
                    <td className="py-4 px-4 text-foreground">
                      {flight.route.departure} → {flight.route.arrival}
                    </td>
                    <td className="py-4 px-4 text-foreground">
                      {flight.flightTime.total.toFixed(1)}h
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        flight.conditions === "VFR"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {flight.conditions}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="btn-primary w-full"
            onClick={() => router.push('/flights/add')}
          >
            Add New Flight
          </button>
          <button 
            className="btn-secondary w-full"
            onClick={() => router.push('/flights')}
          >
            View Reports
          </button>
          <button 
            className="btn-secondary w-full"
            onClick={() => router.push('/aircraft')}
          >
            Manage Aircraft
          </button>
        </div>
      </div>
    </div>
  );
} 