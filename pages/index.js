import React, { useState } from 'react';
import { ChevronRight, MapPin, Truck, MessageCircle, Check, X, AlertCircle } from 'lucide-react';

export default function EMCODeliveryDashboard() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [routesOptimized, setRoutesOptimized] = useState(false);
  const [routesApproved, setRoutesApproved] = useState(false);
  const [routesSent, setRoutesSent] = useState(false);

  const truckADeliveries = [
    { order: 'Order 1', address: '123 King St, Toronto', items: '5 Faucets', time: 20 },
    { order: 'Order 4', address: '456 Queen Ave, Toronto', items: '8 Faucets', time: 20 },
    { order: 'Order 6', address: '321 Bloor St, Toronto', items: '2 Showerheads', time: 20 },
    { order: 'Order 9', address: '654 Yonge St, Toronto', items: '4 Pipes', time: 20 },
    { order: 'Order 12', address: '987 Front St, Toronto', items: '3 Valves', time: 20 },
    { order: 'Order 14', address: '147 Adelaide St, Toronto', items: '6 Faucets', time: 20 },
    { order: 'Order 15', address: '789 Richmond St, Toronto', items: '2 Showerheads', time: 20 },
  ];

  const truckBDeliveries = [
    { order: 'Order 2', address: '100 Dundas Rd, North York', items: '3 Bathtubs', time: 20 },
    { order: 'Order 3', address: '200 Don Mills Rd, North York', items: '2 Bathtubs', time: 20 },
    { order: 'Order 5', address: '300 Bloor St, North York', items: '7 Faucets', time: 20 },
    { order: 'Order 7', address: '400 Steeles Ave, North York', items: '5 Showerheads', time: 20 },
    { order: 'Order 8', address: '500 Finch Ave, North York', items: '3 Valves', time: 20 },
    { order: 'Order 10', address: '600 Lawrence Ave, North York', items: '4 Pipes', time: 20 },
    { order: 'Order 11', address: '700 Eglinton Ave, North York', items: '2 Faucets', time: 20 },
    { order: 'Order 13', address: '800 Bayview Ave, North York', items: '6 Showerheads', time: 20 },
  ];

  const calculateTotalTime = (deliveries) => {
    return deliveries.length * 20 + 15; // 20 min per stop + 15 min buffer
  };

  // ============ HOME SCREEN ============
  if (activeScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-12 text-center border border-gray-700">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2">EMCO Delivery Optimizer</h1>
              <p className="text-gray-400 text-lg">AI-Powered Route Optimization & Execution</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setActiveScreen('savings')}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-between transition transform hover:scale-105"
              >
                <span className="text-lg">💰 Cost Savings Analysis</span>
                <ChevronRight />
              </button>

              <button
                onClick={() => {
                  setActiveScreen('supervisor');
                  setRoutesOptimized(false);
                  setRoutesApproved(false);
                  setRoutesSent(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-between transition transform hover:scale-105"
              >
                <span className="text-lg">🚚 Supervisor Dashboard</span>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ COST SAVINGS DASHBOARD ============
  if (activeScreen === 'savings') {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          ← Back
        </button>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Cost Savings Analysis</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Manual */}
            <div className="bg-gray-800 border border-red-500 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Manual Routing</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between text-lg">
                  <span>Distance</span>
                  <span className="font-bold">97 km</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Time</span>
                  <span className="font-bold">9.5 hours</span>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-sm text-gray-400 mb-3">Cost Breakdown:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fuel</span>
                      <span>$24.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor (9.5 hrs × $32)</span>
                      <span>$304</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment</span>
                      <span>$300</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-red-400 mt-3 pt-3 border-t border-gray-700">
                      <span>Total</span>
                      <span>$628.25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimized */}
            <div className="bg-gray-800 border border-emerald-500 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-6">AI-Optimized</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between text-lg">
                  <span>Distance</span>
                  <span className="font-bold">70 km</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Time</span>
                  <span className="font-bold">7.0 hours</span>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-sm text-gray-400 mb-3">Cost Breakdown:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fuel</span>
                      <span>$17.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor (7.0 hrs × $32)</span>
                      <span>$224</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment</span>
                      <span>$225</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-emerald-400 mt-3 pt-3 border-t border-gray-700">
                      <span>Total</span>
                      <span>$466.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">$161.75</div>
                <div className="text-blue-100">Daily Savings</div>
              </div>
              <div className="border-l border-r border-blue-400">
                <div className="text-4xl font-bold mb-2">$3,235</div>
                <div className="text-blue-100">Monthly</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$40,438</div>
                <div className="text-blue-100">Annual (250 days)</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-bold text-white mb-4 text-lg">Efficiency Gains</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Distance Saved</span>
                  <span className="text-emerald-400 font-bold">27 km (-28%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Saved</span>
                  <span className="text-emerald-400 font-bold">2.5 hours (-26%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per Delivery</span>
                  <span className="text-emerald-400 font-bold">$31.10 (-26%)</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-bold text-white mb-4 text-lg">Key Metrics</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Total Deliveries</span>
                  <span className="font-bold text-white">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Trucks Used</span>
                  <span className="font-bold text-white">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver Utilization</span>
                  <span className="text-emerald-400 font-bold">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ SUPERVISOR DASHBOARD ============
  if (activeScreen === 'supervisor' && !routesApproved && !routesSent) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          ← Back
        </button>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Delivery Route Supervisor</h1>
            <p className="text-gray-400">⏰ 4:00 AM | Ontario Region | 15 Orders Ready</p>
          </div>

          {/* Optimize Button */}
          {!routesOptimized ? (
            <button
              onClick={() => setRoutesOptimized(true)}
              className="w-full mb-8 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition transform hover:scale-105"
            >
              🤖 Optimize Routes with Google Maps
            </button>
          ) : null}

          {routesOptimized && (
            <>
              {/* Truck A */}
              <div className="bg-gray-800 border border-blue-500 rounded-xl p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
                    <Truck size={32} /> Truck A
                  </h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">32 km</div>
                    <div className="text-sm text-gray-400">Optimized Route</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-700">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Deliveries</div>
                    <div className="text-3xl font-bold text-white">{truckADeliveries.length}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Est. Time</div>
                    <div className="text-3xl font-bold text-white">{calculateTotalTime(truckADeliveries)} min</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Departure</div>
                    <div className="text-3xl font-bold text-white">6:00 AM</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {truckADeliveries.map((delivery, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
                      <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">{delivery.order}</span>
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{delivery.items}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin size={16} />
                          {delivery.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-300">~{delivery.time} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Truck B */}
              <div className="bg-gray-800 border border-indigo-500 rounded-xl p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
                    <Truck size={32} /> Truck B
                  </h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">38 km</div>
                    <div className="text-sm text-gray-400">Optimized Route</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-700">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Deliveries</div>
                    <div className="text-3xl font-bold text-white">{truckBDeliveries.length}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Est. Time</div>
                    <div className="text-3xl font-bold text-white">{calculateTotalTime(truckBDeliveries)} min</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Departure</div>
                    <div className="text-3xl font-bold text-white">6:00 AM</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {truckBDeliveries.map((delivery, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
                      <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">{delivery.order}</span>
                          <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">{delivery.items}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin size={16} />
                          {delivery.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-300">~{delivery.time} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Route Approval</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setRoutesApproved(true)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 text-lg"
                  >
                    <Check size={24} />
                    Approve Routes
                  </button>
                  <button
                    onClick={() => setRoutesOptimized(false)}
                    className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 text-lg"
                  >
                    <X size={24} />
                    Change
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ============ SEND TO DRIVERS ============
  if (activeScreen === 'supervisor' && routesApproved && !routesSent) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <button
          onClick={() => setActiveScreen('supervisor')}
          className="mb-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          ← Back
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 border border-green-500 rounded-xl p-8 text-center mb-8">
            <h1 className="text-4xl font-bold text-green-400 mb-4">✅ Routes Approved</h1>
            <p className="text-gray-300 text-lg">Ready to send to drivers via Telegram</p>
          </div>

          <button
            onClick={() => setRoutesSent(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-6 px-6 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 text-xl"
          >
            <MessageCircle size={28} />
            Send Routes to Drivers via Telegram
          </button>
        </div>
      </div>
    );
  }

  // ============ ROUTES SENT ============
  if (activeScreen === 'supervisor' && routesSent) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 border border-green-500 rounded-xl p-12 text-center">
            <h1 className="text-5xl font-bold text-green-400 mb-4">✅ Routes Sent!</h1>
            <p className="text-gray-300 text-xl mb-8">Drivers have received their delivery routes via Telegram</p>
            
            <div className="bg-gray-700 rounded-lg p-8 mb-8">
              <h3 className="text-white font-bold mb-4">Message Sent to Drivers:</h3>
              <div className="text-left text-gray-300 space-y-2">
                <div>🚚 TRUCK A: 7 deliveries | 32 km | 6:00 AM departure</div>
                <div>🚚 TRUCK B: 8 deliveries | 38 km | 6:00 AM departure</div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveScreen('supervisor');
                setRoutesOptimized(false);
                setRoutesApproved(false);
                setRoutesSent(false);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
            >
              Start New Route
            </button>
          </div>
        </div>
      </div>
    );
  }
}
