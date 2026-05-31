import React, { useState } from 'react';
import { ChevronRight, TrendingDown, Truck, MapPin, Phone, Camera, CheckCircle, MessageCircle } from 'lucide-react';

export default function EMCODeliveryPrototype() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [routeSent, setRouteSent] = useState(false);
  const [driverDeliveries, setDriverDeliveries] = useState([]);
  const [currentDeliveryIndex, setCurrentDeliveryIndex] = useState(0);

  const driverRoute = [
    { id: 1, address: '123 King St, Toronto', contact: 'John Smith', phone: '416-555-0101', type: 'construction', items: '5 Faucets' },
    { id: 2, address: '456 Queen Ave, Toronto', contact: 'Sarah Johnson', phone: '416-555-0102', type: 'construction', items: '3 Showerheads' },
    { id: 3, address: '789 Dundas Rd, North York', contact: null, phone: null, type: 'dropoff', items: '2 Bathtubs' },
    { id: 4, address: '321 Bloor St, Toronto', contact: 'Mike Chen', phone: '416-555-0103', type: 'construction', items: '8 Faucets' },
    { id: 5, address: '654 Yonge St, Toronto', contact: null, phone: null, type: 'dropoff', items: '4 Pipes' },
    { id: 6, address: '987 Front St, Toronto', contact: 'Lisa Brown', phone: '416-555-0104', type: 'construction', items: '2 Showerheads' },
    { id: 7, address: '147 Adelaide St, Toronto', contact: null, phone: null, type: 'dropoff', items: '1 Faucet' },
  ];

  const handleOptimizeRoute = () => {
    setRouteOptimized(true);
  };

  const handleSendToDriver = () => {
    setRouteSent(true);
    setDriverDeliveries(driverRoute.map(d => ({ ...d, completed: false, photo: null })));
    setCurrentDeliveryIndex(0);
  };

  const handleDeliveryComplete = (index) => {
    const updated = [...driverDeliveries];
    updated[index].completed = true;
    updated[index].completedTime = new Date().toLocaleTimeString();
    setDriverDeliveries(updated);
    
    if (index < driverRoute.length - 1) {
      setCurrentDeliveryIndex(index + 1);
    }
  };

  // ============ HOME SCREEN ============
  if (activeScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">EMCO Delivery Optimizer</h1>
              <p className="text-gray-600">Zero Data Entry | Route Optimization | Instant Logging</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setActiveScreen('savings')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-between transition transform hover:scale-105"
              >
                <span>💰 Cost Savings Dashboard</span>
                <ChevronRight />
              </button>

              <button
                onClick={() => {
                  setActiveScreen('supervisor');
                  setRouteOptimized(false);
                  setRouteSent(false);
                  setDriverDeliveries([]);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-between transition transform hover:scale-105"
              >
                <span>🚚 Full Process Prototype</span>
                <ChevronRight />
              </button>
            </div>

            <div className="mt-12 text-left bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">How it works:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>✅ Night shift stages orders by truck zone (zero data entry)</li>
                <li>✅ 4 AM: Supervisor sees staged orders, clicks [OPTIMIZE]</li>
                <li>✅ 4-5 AM: Trucks are loaded</li>
                <li>✅ 5 AM: Routes sent via Telegram to drivers</li>
                <li>✅ 6 AM: Drivers depart with optimized routes</li>
                <li>✅ Drivers execute: navigate → photo → confirm at each stop</li>
                <li>✅ System logs all deliveries automatically</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ COST SAVINGS DASHBOARD ============
  if (activeScreen === 'savings') {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Back to Home
        </button>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">💰 Cost Savings Dashboard</h1>

          {/* Current vs Optimized Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Manual Method */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-700 mb-4">❌ Manual Routing (Current)</h2>
              
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Truck A Route:</span>
                  <span className="font-bold">45 km</span>
                </div>
                <div className="flex justify-between">
                  <span>Truck B Route:</span>
                  <span className="font-bold">52 km</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Distance:</span>
                  <span>97 km</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Cost Breakdown:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Fuel (97 km × $0.25/km):</span>
                    <span>$24.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver A (4.5 hrs × $32/hr):</span>
                    <span>$144</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver B (5.0 hrs × $32/hr):</span>
                    <span>$160</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment/Pallet Jack (2 hrs):</span>
                    <span>$300</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-red-700">
                    <span>TOTAL:</span>
                    <span>$628.25</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimized Method */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-700 mb-4">✅ Optimized Routing (AI Bot)</h2>
              
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Truck A Route:</span>
                  <span className="font-bold">32 km</span>
                </div>
                <div className="flex justify-between">
                  <span>Truck B Route:</span>
                  <span className="font-bold">38 km</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Distance:</span>
                  <span>70 km</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Cost Breakdown:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Fuel (70 km × $0.25/km):</span>
                    <span>$17.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver A (3.2 hrs × $32/hr):</span>
                    <span>$102.40</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver B (3.8 hrs × $32/hr):</span>
                    <span>$121.60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment/Pallet Jack (1.5 hrs):</span>
                    <span>$225</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-green-700">
                    <span>TOTAL:</span>
                    <span>$466.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$161.75</div>
                <div className="text-blue-100">Daily Savings</div>
              </div>
              <div className="text-center border-l border-r border-blue-400">
                <div className="text-4xl font-bold mb-2">$3,235</div>
                <div className="text-blue-100">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$40,438</div>
                <div className="text-blue-100">Annual Savings (250 days)</div>
              </div>
            </div>
          </div>

          {/* Efficiency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-4">🚗 Efficiency Gains</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Distance Saved:</span>
                  <span className="font-bold text-green-600">27 km (-28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time Saved:</span>
                  <span className="font-bold text-green-600">2.5 hours (-26%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fuel Reduction:</span>
                  <span className="font-bold text-green-600">11 liters (-28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cost per Delivery:</span>
                  <span className="font-bold text-green-600">$31.10 vs $41.88 (-26%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-4">📊 Key Metrics</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Deliveries Today:</span>
                  <span className="font-bold">15 orders</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Trucks Used:</span>
                  <span className="font-bold">2 trucks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Driver Utilization:</span>
                  <span className="font-bold text-green-600">85% (vs 67%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payback Period:</span>
                  <span className="font-bold text-green-600">&lt;2 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ SUPERVISOR DASHBOARD (4 AM) ============
  if (activeScreen === 'supervisor' && !routeSent) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Back to Home
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
                <p className="text-gray-600">⏰ 4:00 AM | Ontario M-Region | 15 Orders Staged</p>
              </div>
              <div className="text-right text-sm">
                <div className="font-bold text-gray-900">Trucks Ready for Loading</div>
                <div className="text-gray-600">Departure: 6:00 AM</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">📅 Today's Schedule</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center"><span className="text-green-600 font-bold mr-4">✅</span><span>Night Shift: Orders staged by truck zone (no data entry)</span></div>
                <div className="flex items-center"><span className="text-green-600 font-bold mr-4">✅</span><span>4:00 AM: Supervisor reviews staged orders</span></div>
                <div className="flex items-center"><span className="text-gray-400 font-bold mr-4">⏳</span><span>4:10 AM: Optimize routes (AI bot)</span></div>
                <div className="flex items-center"><span className="text-gray-400 font-bold mr-4">⏳</span><span>4:15 AM - 5:15 AM: Trucks loaded</span></div>
                <div className="flex items-center"><span className="text-gray-400 font-bold mr-4">⏳</span><span>5:15 AM: Send routes to drivers via Telegram</span></div>
                <div className="flex items-center"><span className="text-gray-400 font-bold mr-4">⏳</span><span>6:00 AM: Trucks depart with optimized routes</span></div>
              </div>
            </div>

            {/* Staged Orders by Truck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-4">🚚 Truck A (Staged)</h3>
                <div className="text-sm space-y-2">
                  <div>Order 1: 5 Faucets</div>
                  <div>Order 4: 8 Faucets</div>
                  <div>Order 6: 2 Showerheads</div>
                  <div>Order 7: 1 Faucet</div>
                  <div className="border-t pt-2 font-bold">7 deliveries</div>
                </div>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
                <h3 className="font-bold text-indigo-900 mb-4">🚚 Truck B (Staged)</h3>
                <div className="text-sm space-y-2">
                  <div>Order 2: 3 Showerheads</div>
                  <div>Order 3: 2 Bathtubs</div>
                  <div>Order 5: 4 Pipes</div>
                  <div>Order 8-15: Other items</div>
                  <div className="border-t pt-2 font-bold">8 deliveries</div>
                </div>
              </div>
            </div>

            {/* Key Info */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Orders are staged by truck zone. No weights or volumes needed. The system handles optimization automatically based on delivery addresses and item types.
              </p>
            </div>

            {/* Action Buttons */}
            {!routeOptimized ? (
              <button
                onClick={handleOptimizeRoute}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
              >
                🤖 [OPTIMIZE ROUTES] - AI Bot Processing...
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-3">✅ Routes Optimized Successfully</h3>
                  <div className="text-sm space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Truck A optimized route:</span>
                      <span className="font-bold">32 km (7 stops)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Truck B optimized route:</span>
                      <span className="font-bold">38 km (8 stops)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total time (with loading):</span>
                      <span className="font-bold">4 AM - 5 AM (loading) + 6 AM (departure)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated fuel savings:</span>
                      <span className="font-bold text-green-600">$6.75</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSendToDriver}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
                >
                  <MessageCircle size={20} />
                  [SEND TO DRIVERS VIA TELEGRAM] - 5:15 AM
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ TELEGRAM MESSAGE PREVIEW ============
  if (activeScreen === 'supervisor' && routeSent && currentDeliveryIndex === -1) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Back to Home
        </button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">📱 Telegram Message Sent to Driver</h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-500">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">💬 Telegram Bot Message</h3>
              
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-sm">
                <div className="mb-4">
                  <div className="font-bold text-blue-600">🚚 ROUTE READY - TRUCK A</div>
                </div>
                
                <div className="space-y-3 mb-4 text-gray-700">
                  <div>📍 7 Stops | 32 km | 3.2 hours</div>
                  <div>⏰ Departure: 6:00 AM</div>
                  <div>🔗 First stop: 123 King St, Toronto</div>
                  <div>🔗 Last stop: 147 Adelaide St, Toronto</div>
                </div>

                <div className="bg-blue-50 p-3 rounded mb-4">
                  <div className="font-bold text-blue-900 mb-2">Route Sequence:</div>
                  <ol className="space-y-1 text-sm text-gray-700">
                    <li>1️⃣ 123 King St (John Smith) - 5 Faucets</li>
                    <li>2️⃣ 456 Queen Ave (Sarah Johnson) - 3 Showerheads</li>
                    <li>3️⃣ 321 Bloor St (Mike Chen) - 8 Faucets</li>
                    <li>4️⃣ 654 Yonge St (DROP OFF) - 4 Pipes</li>
                    <li>5️⃣ 987 Front St (Lisa Brown) - 2 Showerheads</li>
                    <li>6️⃣ 789 Dundas Rd (DROP OFF) - 2 Bathtubs</li>
                    <li>7️⃣ 147 Adelaide St (DROP OFF) - 1 Faucet</li>
                  </ol>
                </div>

                <div className="space-y-2 text-center">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    [VIEW FULL ROUTE]
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    [NAVIGATE WITH GOOGLE MAPS]
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentDeliveryIndex(0)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
          >
            ▶️ [CONTINUE] - Driver Starts Route at 6:00 AM
          </button>
        </div>
      </div>
    );
  }

  // ============ DRIVER EXECUTION (6 AM onwards) ============
  if (activeScreen === 'supervisor' && routeSent && currentDeliveryIndex >= 0) {
    const currentDelivery = driverRoute[currentDeliveryIndex];
    const isDeliveryCompleted = driverDeliveries[currentDeliveryIndex]?.completed;

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <button
          onClick={() => setActiveScreen('home')}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Back to Home
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Driver Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">🚗 Driver Route Execution</h1>
              <div className="text-right text-sm">
                <div className="font-bold">Stop {currentDeliveryIndex + 1} of {driverRoute.length}</div>
                <div className="text-gray-600">Progress: {Math.round((currentDeliveryIndex + 1) / driverRoute.length * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Current Delivery */}
          <div className={`rounded-lg shadow-lg p-6 mb-6 border-4 ${isDeliveryCompleted ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <h2 className="text-xl font-bold mb-4">{isDeliveryCompleted ? '✅ Delivery Complete' : '📍 Current Delivery'}</h2>

            <div className="bg-white p-4 rounded-lg mb-4 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                <div>
                  <div className="font-bold text-gray-900">{currentDelivery.address}</div>
                  <div className="text-gray-600">Distance: ~{(currentDeliveryIndex + 1) * 5} km from depot</div>
                </div>
              </div>

              {currentDelivery.type === 'construction' && (
                <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded border border-yellow-200">
                  <Phone size={18} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900">Construction Site</div>
                    <div className="text-gray-600">Contact: {currentDelivery.contact} - {currentDelivery.phone}</div>
                  </div>
                </div>
              )}

              {currentDelivery.type === 'dropoff' && (
                <div className="flex items-center gap-2 bg-blue-50 p-3 rounded border border-blue-200">
                  <Truck size={18} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900">Drop-off Location</div>
                    <div className="text-gray-600">Leave package at door, take photo</div>
                  </div>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="font-bold text-gray-900 mb-1">Items to Deliver:</div>
                <div className="text-gray-700">{currentDelivery.items}</div>
              </div>
            </div>

            {!isDeliveryCompleted ? (
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                  <MapPin size={20} />
                  [NAVIGATE WITH GOOGLE MAPS]
                </button>

                {currentDelivery.type === 'construction' && (
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                    <Phone size={20} />
                    [CALL {currentDelivery.contact.toUpperCase()}]
                  </button>
                )}

                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="font-bold text-gray-900 mb-3">📸 Proof of Delivery</div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                    <Camera size={20} />
                    [TAKE PHOTO] - Mandatory
                  </button>
                </div>

                <button
                  onClick={() => handleDeliveryComplete(currentDeliveryIndex)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
                >
                  <CheckCircle size={20} />
                  [DELIVERY COMPLETE] - Log in System
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                  <div className="font-bold text-green-900 mb-2">✅ Delivery Logged</div>
                  <div className="text-sm text-green-800 space-y-1">
                    <div>Time: {driverDeliveries[currentDeliveryIndex].completedTime}</div>
                    <div>Photo: ✅ Captured</div>
                    <div>Items: {currentDelivery.items}</div>
                    <div>Status: Successfully logged in system</div>
                  </div>
                </div>

                {currentDeliveryIndex < driverRoute.length - 1 ? (
                  <button
                    onClick={() => setCurrentDeliveryIndex(currentDeliveryIndex + 1)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
                  >
                    ▶️ [NEXT DELIVERY] - Stop {currentDeliveryIndex + 2}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentDeliveryIndex(-1)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
                  >
                    🎉 [ALL DELIVERIES COMPLETE] - End Route
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Completed Deliveries */}
          {driverDeliveries.filter(d => d.completed).length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">✅ Completed Deliveries ({driverDeliveries.filter(d => d.completed).length})</h3>
              <div className="space-y-2">
                {driverDeliveries.map((delivery, idx) => (
                  delivery.completed && (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                      <div className="text-sm">
                        <div className="font-bold text-gray-900">Stop {idx + 1}: {delivery.address}</div>
                        <div className="text-gray-600">{delivery.items}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-green-600 font-bold">✅ {delivery.completedTime}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
