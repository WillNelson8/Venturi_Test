"use client";

import { useState } from "react";

type AircraftValue = {
  id: string;
  makeModel: string;
  year: number;
  currentValue: number;
  valueChange: number;
  valueChangePercent: number;
  lastUpdated: string;
};

type MarketTrend = {
  id: string;
  category: string;
  trend: "up" | "down" | "stable";
  change: number;
  changePercent: number;
  period: string;
};

export default function MarketDataPage() {
  const [aircraftValues] = useState<AircraftValue[]>([
    // Sample data - replace with actual market data
    {
      id: "1",
      makeModel: "Cessna 172",
      year: 2020,
      currentValue: 350000,
      valueChange: 15000,
      valueChangePercent: 4.5,
      lastUpdated: "2024-03-20",
    },
    {
      id: "2",
      makeModel: "Cirrus SR22",
      year: 2021,
      currentValue: 750000,
      valueChange: -25000,
      valueChangePercent: -3.2,
      lastUpdated: "2024-03-20",
    },
  ]);

  const [marketTrends] = useState<MarketTrend[]>([
    // Sample data - replace with actual market trends
    {
      id: "1",
      category: "Single Engine Piston",
      trend: "up",
      change: 5.2,
      changePercent: 3.8,
      period: "Last 30 Days",
    },
    {
      id: "2",
      category: "Multi Engine Piston",
      trend: "down",
      change: -3.1,
      changePercent: -2.1,
      period: "Last 30 Days",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Market Data</h1>
        <div className="flex space-x-4">
          <button className="btn-primary">Refresh Data</button>
          <button className="btn-secondary">Export Report</button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Market Index
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">1,234.56</p>
          <p className="text-green-400">+2.5% (30d)</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Total Volume
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">$45.2M</p>
          <p className="text-green-400">+15.3% (30d)</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Active Listings
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">1,234</p>
          <p className="text-red-400">-3.2% (30d)</p>
        </div>
      </div>

      {/* Aircraft Values */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Aircraft Values
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left py-3 px-4">Make/Model</th>
                <th className="table-header text-left py-3 px-4">Year</th>
                <th className="table-header text-left py-3 px-4">Current Value</th>
                <th className="table-header text-left py-3 px-4">Value Change</th>
                <th className="table-header text-left py-3 px-4">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {aircraftValues.map((aircraft) => (
                <tr key={aircraft.id} className="table-row">
                  <td className="py-4 px-4 text-[#E0E0E0]">
                    {aircraft.makeModel}
                  </td>
                  <td className="py-4 px-4 text-[#E0E0E0]">{aircraft.year}</td>
                  <td className="py-4 px-4 text-[#E0E0E0]">
                    ${aircraft.currentValue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`${
                        aircraft.valueChange >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {aircraft.valueChange >= 0 ? "+" : ""}
                      {aircraft.valueChangePercent}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#E0E0E0]">
                    {aircraft.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Trends */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Market Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketTrends.map((trend) => (
            <div key={trend.id} className="glass-card p-4">
              <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
                {trend.category}
              </h3>
              <div className="space-y-2">
                <p className="text-[#E0E0E0]">
                  <span className="text-[#9CA3AF]">Trend:</span>{" "}
                  <span
                    className={
                      trend.trend === "up"
                        ? "text-green-400"
                        : trend.trend === "down"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  >
                    {trend.trend.charAt(0).toUpperCase() + trend.trend.slice(1)}
                  </span>
                </p>
                <p className="text-[#E0E0E0]">
                  <span className="text-[#9CA3AF]">Change:</span>{" "}
                  <span
                    className={
                      trend.change >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {trend.change >= 0 ? "+" : ""}
                    {trend.changePercent}%
                  </span>
                </p>
                <p className="text-[#E0E0E0]">
                  <span className="text-[#9CA3AF]">Period:</span>{" "}
                  {trend.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Analysis */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Market Analysis
        </h2>
        <div className="space-y-4">
          <div className="glass-card p-4">
            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
              Single Engine Piston Market
            </h3>
            <p className="text-[#9CA3AF]">
              The single engine piston market shows strong growth in the entry-level
              segment, with increased demand for training aircraft. Values for
              well-maintained examples have increased by an average of 4.5% over
              the last 30 days.
            </p>
          </div>
          <div className="glass-card p-4">
            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
              Multi Engine Piston Market
            </h3>
            <p className="text-[#9CA3AF]">
              The multi engine piston market is experiencing a slight correction,
              with values decreasing by 2.1% over the last 30 days. This is
              primarily due to increased inventory levels and seasonal factors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 