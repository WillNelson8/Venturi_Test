"use client";

import { useState } from "react";

type Transaction = {
  id: string;
  type: "Flight" | "Maintenance" | "Aircraft";
  hash: string;
  timestamp: string;
  status: "Confirmed" | "Pending" | "Failed";
  details: string;
};

export default function BlockchainPage() {
  const [transactions] = useState<Transaction[]>([
    // Sample transactions - replace with actual blockchain data
    {
      id: "1",
      type: "Flight",
      hash: "0x1234...5678",
      timestamp: "2024-03-20 14:30:00",
      status: "Confirmed",
      details: "Flight N12345 - KLAX to KSFO",
    },
    {
      id: "2",
      type: "Maintenance",
      hash: "0x8765...4321",
      timestamp: "2024-03-19 10:15:00",
      status: "Confirmed",
      details: "Annual Inspection - N12345",
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Blockchain Explorer</h1>
        <div className="flex space-x-4">
          <button className="btn-primary">Connect Wallet</button>
          <button className="btn-secondary">View Smart Contracts</button>
        </div>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Total Transactions
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">
            {transactions.length}
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Network Status
          </h3>
          <p className="text-3xl font-bold text-green-400">Online</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-[#9CA3AF] mb-2">
            Last Block
          </h3>
          <p className="text-3xl font-bold text-[#FFFFFF]">#1,234,567</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left py-3 px-4">Type</th>
                <th className="table-header text-left py-3 px-4">Transaction Hash</th>
                <th className="table-header text-left py-3 px-4">Timestamp</th>
                <th className="table-header text-left py-3 px-4">Status</th>
                <th className="table-header text-left py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="table-row cursor-pointer hover:bg-[#1F2937]"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        tx.type === "Flight"
                          ? "bg-blue-500/20 text-blue-400"
                          : tx.type === "Maintenance"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#E0E0E0] font-mono">
                    {tx.hash}
                  </td>
                  <td className="py-4 px-4 text-[#E0E0E0]">{tx.timestamp}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        tx.status === "Confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : tx.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#E0E0E0]">{tx.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-[#FFFFFF]">
                Transaction Details
              </h2>
              <button
                className="text-[#9CA3AF] hover:text-[#FFFFFF]"
                onClick={() => setSelectedTransaction(null)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#9CA3AF]">Type</h3>
                <p className="text-[#FFFFFF]">{selectedTransaction.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#9CA3AF]">
                  Transaction Hash
                </h3>
                <p className="text-[#FFFFFF] font-mono">
                  {selectedTransaction.hash}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#9CA3AF]">Timestamp</h3>
                <p className="text-[#FFFFFF]">
                  {selectedTransaction.timestamp}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#9CA3AF]">Status</h3>
                <p className="text-[#FFFFFF]">{selectedTransaction.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#9CA3AF]">Details</h3>
                <p className="text-[#FFFFFF]">{selectedTransaction.details}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="btn-secondary"
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Contract Section */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Smart Contracts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
              Flight Log Contract
            </h3>
            <p className="text-[#9CA3AF] mb-4">
              Manages flight records and certifications
            </p>
            <div className="space-y-2">
              <p className="text-[#E0E0E0]">
                <span className="text-[#9CA3AF]">Address:</span>{" "}
                0x1234...5678
              </p>
              <p className="text-[#E0E0E0]">
                <span className="text-[#9CA3AF]">Network:</span> Ethereum
              </p>
            </div>
          </div>
          <div className="glass-card p-4">
            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
              Maintenance Contract
            </h3>
            <p className="text-[#9CA3AF] mb-4">
              Tracks maintenance records and compliance
            </p>
            <div className="space-y-2">
              <p className="text-[#E0E0E0]">
                <span className="text-[#9CA3AF]">Address:</span>{" "}
                0x8765...4321
              </p>
              <p className="text-[#E0E0E0]">
                <span className="text-[#9CA3AF]">Network:</span> Ethereum
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 