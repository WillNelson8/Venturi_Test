"use client";

import { useState, useRef } from "react";

type MaintenanceItem = {
  id: string;
  aircraftRegistration: string;
  type: string;
  date: string;
  dueDate: string;
  status: "Completed" | "Pending" | "Overdue";
  cost: number;
  provider: string;
  notes: string;
};

type Aircraft = {
  registration: string;
  makeModel: string;
};

export default function MaintenancePage() {
  const [aircraft] = useState<Aircraft[]>([
    // Sample aircraft - replace with actual data
    { registration: "N12345", makeModel: "Cessna 172" },
  ]);

  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<MaintenanceItem>({
    id: "",
    aircraftRegistration: "",
    type: "",
    date: "",
    dueDate: "",
    status: "Pending",
    cost: 0,
    provider: "",
    notes: "",
  });

  const [fetchingPart, setFetchingPart] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [fetchingQuotes, setFetchingQuotes] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMaintenanceItems([
      ...maintenanceItems,
      { ...newItem, id: Math.random().toString(36).substr(2, 9) },
    ]);
    setIsAddingItem(false);
    setNewItem({
      id: "",
      aircraftRegistration: "",
      type: "",
      date: "",
      dueDate: "",
      status: "Pending",
      cost: 0,
      provider: "",
      notes: "",
    });
  };

  const maintenanceTypes = [
    "Annual Inspection",
    "100-Hour Inspection",
    "Transponder Check",
    "ELT Battery Replacement",
    "Pitot-Static System Check",
    "VOR Check",
    "Oil Change",
    "Airworthiness Directive",
    "Squawk",
    "Other",
  ];

  // Fetch part/service info from API
  const fetchPartInfo = async (query: string) => {
    setFetchingPart(true);
    setFetchError("");
    try {
      const res = await fetch(`/api/parts?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("No data found");
      const data = await res.json();
      if (data.parts && data.parts.length > 0) {
        const part = data.parts[0];
        setNewItem((prev) => ({
          ...prev,
          cost: part.price ? parseFloat(part.price) : prev.cost,
          provider: part.manufacturer || prev.provider,
        }));
      } else {
        setFetchError("No matching part found");
      }
    } catch (err) {
      setFetchError("Could not fetch part info");
    } finally {
      setFetchingPart(false);
    }
  };

  // Fetch part quotes from Locatory API
  const fetchPartQuotes = async (partNumber: string) => {
    setFetchingQuotes(true);
    setFetchError("");
    try {
      const apiKey = process.env.LOCATORY_API_KEY; // Ensure this is set in your .env file
      const url = `https://api.locatory.com/v1/quotes?partNumber=${encodeURIComponent(partNumber)}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }

      const data = await response.json();
      if (data.quotes && data.quotes.length > 0) {
        const quote = data.quotes[0];
        setNewItem((prev) => ({
          ...prev,
          cost: quote.price ? parseFloat(quote.price) : prev.cost,
          provider: quote.supplier || prev.provider,
        }));
      } else {
        setFetchError("No matching quotes found");
      }
    } catch (err) {
      setFetchError("Could not fetch quotes");
    } finally {
      setFetchingQuotes(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Maintenance Tracking</h1>
        <button
          className="btn-primary"
          onClick={() => setIsAddingItem(true)}
        >
          Add Maintenance Item
        </button>
      </div>

      {/* Add Maintenance Form */}
      {isAddingItem && (
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
            Add Maintenance Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aircraft Selection */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Aircraft
                </label>
                <select
                  className="input-field w-full"
                  value={newItem.aircraftRegistration}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      aircraftRegistration: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Aircraft</option>
                  {aircraft.map((ac) => (
                    <option key={ac.registration} value={ac.registration}>
                      {ac.registration} - {ac.makeModel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Maintenance Type */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Maintenance Type
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newItem.type}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewItem({ ...newItem, type: value });
                    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);
                    // Debounce API call
                    fetchTimeout.current = setTimeout(() => {
                      if (value.length > 2) fetchPartQuotes(value);
                    }, 600);
                  }}
                  placeholder="Type or select maintenance type"
                  required
                  list="maintenance-types"
                />
                <datalist id="maintenance-types">
                  {maintenanceTypes.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
                {fetchingQuotes && (
                  <div className="text-xs text-[#FF10F0] mt-1">Looking up quotes...</div>
                )}
                {fetchError && (
                  <div className="text-xs text-red-400 mt-1">{fetchError}</div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="input-field w-full"
                  value={newItem.date}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="input-field w-full"
                  value={newItem.dueDate}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      dueDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Status
                </label>
                <select
                  className="input-field w-full"
                  value={newItem.status}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      status: e.target.value as MaintenanceItem["status"],
                    })
                  }
                  required
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="input-field w-full"
                  value={newItem.cost}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              {/* Provider */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Service Provider
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newItem.provider}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      provider: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Notes
              </label>
              <textarea
                className="input-field w-full h-32"
                value={newItem.notes}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsAddingItem(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Maintenance Item
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Maintenance List */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Maintenance History
        </h2>
        {maintenanceItems.length === 0 ? (
          <p className="text-[#9CA3AF] text-center py-8">
            No maintenance items added yet. Click "Add Maintenance Item" to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left py-3 px-4">Aircraft</th>
                  <th className="table-header text-left py-3 px-4">Type</th>
                  <th className="table-header text-left py-3 px-4">Date</th>
                  <th className="table-header text-left py-3 px-4">Due Date</th>
                  <th className="table-header text-left py-3 px-4">Status</th>
                  <th className="table-header text-left py-3 px-4">Cost</th>
                  <th className="table-header text-left py-3 px-4">Provider</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceItems.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="py-4 px-4 text-[#E0E0E0]">
                      {item.aircraftRegistration}
                    </td>
                    <td className="py-4 px-4 text-[#E0E0E0]">{item.type}</td>
                    <td className="py-4 px-4 text-[#E0E0E0]">{item.date}</td>
                    <td className="py-4 px-4 text-[#E0E0E0]">{item.dueDate}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          item.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#E0E0E0]">
                      ${item.cost.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-[#E0E0E0]">{item.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upcoming Maintenance */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Upcoming Maintenance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maintenanceItems
            .filter((item) => item.status === "Pending")
            .map((item) => (
              <div key={item.id} className="glass-card p-4">
                <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
                  {item.aircraftRegistration}
                </h3>
                <p className="text-[#9CA3AF] mb-4">{item.type}</p>
                <div className="space-y-2">
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Due Date:</span>{" "}
                    {item.dueDate}
                  </p>
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Provider:</span>{" "}
                    {item.provider}
                  </p>
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Estimated Cost:</span> $
                    {item.cost.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 