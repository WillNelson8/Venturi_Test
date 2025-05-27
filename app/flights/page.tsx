"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    landings: number;
  };
  flightTime: {
    total: number;
    crossCountry: number;
    night: number;
  };
  conditions: "VFR" | "IFR";
  pilotTime: {
    solo: boolean;
    pic: boolean;
    sic: boolean;
    dualReceived: boolean;
    dualGiven: boolean;
  };
  remarks: string;
};

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load flights from localStorage
      const storedFlights = localStorage.getItem('flights');
      console.log('Stored flights:', storedFlights); // Debug log
      
      if (storedFlights) {
        const parsedFlights = JSON.parse(storedFlights);
        console.log('Parsed flights:', parsedFlights); // Debug log
        setFlights(parsedFlights);
      }
    } catch (err) {
      console.error('Error loading flights:', err);
      setError('Failed to load flights. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-[#E0E0E0]">Loading flights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Flight Log</h1>
        <Link href="/flights/add" className="btn-primary">
          Add New Flight
        </Link>
      </div>

      {/* Flight Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Total Hours
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">
            {flights.reduce((sum, flight) => sum + (flight.flightTime?.total || 0), 0).toFixed(1)}
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Cross Country
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">
            {flights.reduce((sum, flight) => sum + (flight.flightTime?.crossCountry || 0), 0).toFixed(1)}
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Night Hours
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">
            {flights.reduce((sum, flight) => sum + (flight.flightTime?.night || 0), 0).toFixed(1)}
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Total Flights
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">{flights.length}</p>
        </div>
      </div>

      {/* Recent Flights */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Recent Flights
        </h2>
        {flights.length === 0 ? (
          <p className="text-[#9CA3AF] text-center py-8">
            No flights logged yet. Click "Add New Flight" to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left py-3 px-4">Date</th>
                  <th className="table-header text-left py-3 px-4">Aircraft</th>
                  <th className="table-header text-left py-3 px-4">Route</th>
                  <th className="table-header text-left py-3 px-4">Total Time</th>
                  <th className="table-header text-left py-3 px-4">Conditions</th>
                  <th className="table-header text-left py-3 px-4">Pilot Time</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id} className="table-row">
                    <td className="py-4 px-4 text-[#E0E0E0]">{flight.date}</td>
                    <td className="py-4 px-4 text-[#E0E0E0]">
                      {flight.aircraft?.registration} - {flight.aircraft?.makeModel}
                    </td>
                    <td className="py-4 px-4 text-[#E0E0E0]">
                      {flight.route?.departure} → {flight.route?.arrival}
                    </td>
                    <td className="py-4 px-4 text-[#E0E0E0]">
                      {flight.flightTime?.total?.toFixed(1)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          flight.conditions === "VFR"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {flight.conditions}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {flight.pilotTime?.solo && (
                          <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                            Solo
                          </span>
                        )}
                        {flight.pilotTime?.pic && (
                          <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                            PIC
                          </span>
                        )}
                        {flight.pilotTime?.sic && (
                          <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                            SIC
                          </span>
                        )}
                        {flight.pilotTime?.dualReceived && (
                          <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                            Dual
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 