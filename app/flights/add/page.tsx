"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FlightData = {
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

export default function AddFlight() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [flightData, setFlightData] = useState<FlightData>({
    date: "",
    aircraft: {
      registration: "",
      makeModel: "",
    },
    route: {
      departure: "",
      arrival: "",
      landings: 0,
    },
    flightTime: {
      total: 0,
      crossCountry: 0,
      night: 0,
    },
    conditions: "VFR",
    pilotTime: {
      solo: false,
      pic: false,
      sic: false,
      dualReceived: false,
      dualGiven: false,
    },
    remarks: "",
  });

  const steps = [
    "Basic Information",
    "Aircraft & Route",
    "Flight Time",
    "Review & Submit",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create a new flight object with an ID
      const newFlight = {
        id: Date.now().toString(), // Simple ID generation
        ...flightData
      };

      console.log('New flight data:', newFlight); // Debug log

      // Get existing flights from localStorage
      const existingFlights = JSON.parse(localStorage.getItem('flights') || '[]');
      console.log('Existing flights:', existingFlights); // Debug log
      
      // Add new flight to the array
      const updatedFlights = [...existingFlights, newFlight];
      console.log('Updated flights:', updatedFlights); // Debug log
      
      // Save back to localStorage
      localStorage.setItem('flights', JSON.stringify(updatedFlights));
      console.log('Saved to localStorage'); // Debug log

      // Redirect to flights list
      router.push('/flights');
    } catch (error) {
      console.error('Error saving flight:', error);
      alert('There was an error saving your flight. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div
              key={step}
              className={`flex items-center ${
                step !== steps[steps.length - 1] ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= steps.indexOf(step) + 1
                    ? "bg-gradient-to-r from-[#6B46C1] to-[#2563EB] text-white"
                    : "bg-[#1A1A2E] text-[#9CA3AF]"
                }`}
              >
                {steps.indexOf(step) + 1}
              </div>
              {step !== steps[steps.length - 1] && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > steps.indexOf(step) + 1
                      ? "bg-gradient-to-r from-[#6B46C1] to-[#2563EB]"
                      : "bg-[#1A1A2E]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step}
              className={`text-sm ${
                currentStep >= steps.indexOf(step) + 1
                  ? "text-[#E0E0E0]"
                  : "text-[#9CA3AF]"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
              Basic Information
            </h2>
            
            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Date of Flight
              </label>
              <input
                type="date"
                className="input-field w-full"
                value={flightData.date}
                onChange={(e) =>
                  setFlightData({ ...flightData, date: e.target.value })
                }
                required
              />
            </div>

            {/* Flight Conditions */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Flight Conditions
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="conditions"
                    value="VFR"
                    checked={flightData.conditions === "VFR"}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        conditions: e.target.value as "VFR" | "IFR",
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">VFR</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="conditions"
                    value="IFR"
                    checked={flightData.conditions === "IFR"}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        conditions: e.target.value as "VFR" | "IFR",
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">IFR</span>
                </label>
              </div>
            </div>

            {/* Landings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Day Landings
                </label>
                <input
                  type="number"
                  min="0"
                  className="input-field w-full"
                  value={flightData.route.landings}
                  onChange={(e) =>
                    setFlightData({
                      ...flightData,
                      route: {
                        ...flightData.route,
                        landings: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
              Aircraft & Route
            </h2>
            
            {/* Aircraft Registration */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Aircraft Registration (N-Number)
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={flightData.aircraft.registration}
                onChange={(e) =>
                  setFlightData({
                    ...flightData,
                    aircraft: {
                      ...flightData.aircraft,
                      registration: e.target.value,
                    },
                  })
                }
                required
              />
            </div>

            {/* Make/Model */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Aircraft Make/Model
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={flightData.aircraft.makeModel}
                onChange={(e) =>
                  setFlightData({
                    ...flightData,
                    aircraft: {
                      ...flightData.aircraft,
                      makeModel: e.target.value,
                    },
                  })
                }
                required
              />
            </div>

            {/* Route */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Departure Airport
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={flightData.route.departure}
                  onChange={(e) =>
                    setFlightData({
                      ...flightData,
                      route: {
                        ...flightData.route,
                        departure: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Arrival Airport
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={flightData.route.arrival}
                  onChange={(e) =>
                    setFlightData({
                      ...flightData,
                      route: {
                        ...flightData.route,
                        arrival: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
              Flight Time
            </h2>
            
            {/* Pilot Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#FFFFFF]">
                Type of Pilot Time
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flightData.pilotTime.solo}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        pilotTime: {
                          ...flightData.pilotTime,
                          solo: e.target.checked,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">Solo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flightData.pilotTime.pic}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        pilotTime: {
                          ...flightData.pilotTime,
                          pic: e.target.checked,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">Pilot in Command (PIC)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flightData.pilotTime.sic}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        pilotTime: {
                          ...flightData.pilotTime,
                          sic: e.target.checked,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">Second in Command (SIC)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={flightData.pilotTime.dualReceived}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        pilotTime: {
                          ...flightData.pilotTime,
                          dualReceived: e.target.checked,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-[#E0E0E0]">Dual Received</span>
                </label>
              </div>
            </div>

            {/* Flight Time Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#FFFFFF]">
                Flight Time Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Total Duration
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="input-field w-full"
                    value={flightData.flightTime.total}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        flightTime: {
                          ...flightData.flightTime,
                          total: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Cross-Country Time
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="input-field w-full"
                    value={flightData.flightTime.crossCountry}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        flightTime: {
                          ...flightData.flightTime,
                          crossCountry: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Night Time
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="input-field w-full"
                    value={flightData.flightTime.night}
                    onChange={(e) =>
                      setFlightData({
                        ...flightData,
                        flightTime: {
                          ...flightData.flightTime,
                          night: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6">
              Review & Submit
            </h2>
            
            {/* Review Summary */}
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-[#FFFFFF] mb-4">
                  Flight Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#9CA3AF]">Date:</p>
                    <p className="text-[#E0E0E0]">{flightData.date}</p>
                  </div>
                  <div>
                    <p className="text-[#9CA3AF]">Aircraft:</p>
                    <p className="text-[#E0E0E0]">
                      {flightData.aircraft.registration} -{" "}
                      {flightData.aircraft.makeModel}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9CA3AF]">Route:</p>
                    <p className="text-[#E0E0E0]">
                      {flightData.route.departure} → {flightData.route.arrival}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9CA3AF]">Total Time:</p>
                    <p className="text-[#E0E0E0]">
                      {flightData.flightTime.total} hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Remarks
                </label>
                <textarea
                  className="input-field w-full h-32"
                  value={flightData.remarks}
                  onChange={(e) =>
                    setFlightData({
                      ...flightData,
                      remarks: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              type="button"
              className="btn-primary ml-auto"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary ml-auto">
              Submit Flight
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 