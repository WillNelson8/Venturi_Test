"use client";

import { useState } from "react";

type Aircraft = {
  registration: string;
  makeModel: string;
  type: "Single Engine" | "Multi Engine" | "Turboprop" | "Jet" | "Helicopter";
  category: string;
  class: string;
  complex: boolean;
  highPerformance: boolean;
  tailwheel: boolean;
  glassCockpit: boolean;
  equipmentCodes: string;
  notes: string;
  image?: string;
};

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [isAddingAircraft, setIsAddingAircraft] = useState(false);
  const [newAircraft, setNewAircraft] = useState<Aircraft>({
    registration: "",
    makeModel: "",
    type: "Single Engine",
    category: "",
    class: "",
    complex: false,
    highPerformance: false,
    tailwheel: false,
    glassCockpit: false,
    equipmentCodes: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAircraft([...aircraft, newAircraft]);
    setIsAddingAircraft(false);
    setNewAircraft({
      registration: "",
      makeModel: "",
      type: "Single Engine",
      category: "",
      class: "",
      complex: false,
      highPerformance: false,
      tailwheel: false,
      glassCockpit: false,
      equipmentCodes: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Aircraft Management</h1>
        <button
          className="btn-primary"
          onClick={() => setIsAddingAircraft(true)}
        >
          Add New Aircraft
        </button>
      </div>

      {/* Add Aircraft Form */}
      {isAddingAircraft && (
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
            Add New Aircraft
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Registration (N-Number)
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newAircraft.registration}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      registration: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Make/Model */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Make/Model
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newAircraft.makeModel}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      makeModel: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Type
                </label>
                <select
                  className="input-field w-full"
                  value={newAircraft.type}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      type: e.target.value as Aircraft["type"],
                    })
                  }
                  required
                >
                  <option value="Single Engine">Single Engine</option>
                  <option value="Multi Engine">Multi Engine</option>
                  <option value="Turboprop">Turboprop</option>
                  <option value="Jet">Jet</option>
                  <option value="Helicopter">Helicopter</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Category
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newAircraft.category}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Class
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newAircraft.class}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      class: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Equipment Codes */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Equipment Codes
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={newAircraft.equipmentCodes}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      equipmentCodes: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAircraft.complex}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      complex: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <span className="text-[#E0E0E0]">Complex</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAircraft.highPerformance}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      highPerformance: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <span className="text-[#E0E0E0]">High Performance</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAircraft.tailwheel}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      tailwheel: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <span className="text-[#E0E0E0]">Tailwheel</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newAircraft.glassCockpit}
                  onChange={(e) =>
                    setNewAircraft({
                      ...newAircraft,
                      glassCockpit: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <span className="text-[#E0E0E0]">Glass Cockpit</span>
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Notes
              </label>
              <textarea
                className="input-field w-full h-32"
                value={newAircraft.notes}
                onChange={(e) =>
                  setNewAircraft({
                    ...newAircraft,
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
                onClick={() => setIsAddingAircraft(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Aircraft
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Aircraft List */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
          Your Aircraft
        </h2>
        {aircraft.length === 0 ? (
          <p className="text-[#9CA3AF] text-center py-8">
            No aircraft added yet. Click "Add New Aircraft" to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aircraft.map((ac) => (
              <div key={ac.registration} className="glass-card p-4">
                <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
                  {ac.registration}
                </h3>
                <p className="text-[#9CA3AF] mb-4">{ac.makeModel}</p>
                <div className="space-y-2">
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Type:</span> {ac.type}
                  </p>
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Category:</span>{" "}
                    {ac.category}
                  </p>
                  <p className="text-[#E0E0E0]">
                    <span className="text-[#9CA3AF]">Class:</span> {ac.class}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ac.complex && (
                      <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                        Complex
                      </span>
                    )}
                    {ac.highPerformance && (
                      <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                        High Performance
                      </span>
                    )}
                    {ac.tailwheel && (
                      <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                        Tailwheel
                      </span>
                    )}
                    {ac.glassCockpit && (
                      <span className="px-2 py-1 bg-[#6B46C1]/20 text-[#8B5CF6] rounded-full text-sm">
                        Glass Cockpit
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 