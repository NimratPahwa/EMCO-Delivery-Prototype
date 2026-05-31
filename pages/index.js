import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const COLORS = {
  bg: '#0a0e1a',
  card: '#111827',
  cardBorder: '#1e293b',
  blue: '#3b82f6',
  blueGlow: 'rgba(59, 130, 246, 0.15)',
  indigo: '#6366f1',
  indigoGlow: 'rgba(99, 102, 241, 0.15)',
  green: '#10b981',
  greenGlow: 'rgba(16, 185, 129, 0.15)',
  amber: '#f59e0b',
  red: '#ef4444',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
};

const GaugeChart = ({ value, max, color, label, sublabel }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="45" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        <text x="60" y="55" textAnchor="middle" fill={COLORS.textPrimary} fontSize="24" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">{value}</text>
        <text x="60" y="75" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" fontFamily="'JetBrains Mono', monospace">{sublabel}</text>
      </svg>
      <div style={{ color: COLORS.textSecondary, fontSize: '12px', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
    </div>
  );
};

const StatusBar = ({ value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: color, borderRadius: '3px',
        transition: 'width 1.2s ease-out',
        boxShadow: `0 0 8px ${color}40`
      }} />
    </div>
  );
};

const MetricCard = ({ title, value, unit, color, change, status }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px',
    position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />
    <div style={{ fontSize: '12px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace" }}>{title}</div>
    <div style={{ fontSize: '32px', fontWeight: 'bold', color: COLORS.textPrimary, fontFamily: "'JetBrains Mono', monospace" }}>
      {value}<span style={{ fontSize: '14px', color: COLORS.textMuted, marginLeft: '4px' }}>{unit}</span>
    </div>
    {status && <div style={{ fontSize: '11px', color, fontWeight: 'bold', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{status}</div>}
    {change && (
      <div style={{ fontSize: '12px', color: change > 0 ? COLORS.green : COLORS.red, marginTop: '6px', fontFamily: "'JetBrains Mono', monospace" }}>
        {change > 0 ? '▲' : '▼'} {Math.abs(change)}% vs manual
      </div>
    )}
    <div style={{ marginTop: '10px' }}>
      <StatusBar value={typeof value === 'string' ? parseInt(value) : value} max={100} color={color} />
    </div>
  </div>
);

const DeliveryRow = ({ index, order, address, items, time, color }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
    background: index % 2 === 0 ? 'rgba(30, 41, 59, 0.5)' : 'transparent',
    borderRadius: '8px', transition: 'background 0.2s',
  }}>
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '14px', fontWeight: 'bold', color: '#fff', flexShrink: 0,
      fontFamily: "'JetBrains Mono', monospace",
      boxShadow: `0 0 12px ${color}40`
    }}>
      {index + 1}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
        <span style={{ color: COLORS.textPrimary, fontWeight: '600', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>{order}</span>
        <span style={{
          fontSize: '10px', background: `${color}20`, color: color, padding: '2px 8px',
          borderRadius: '4px', fontWeight: '600', border: `1px solid ${color}40`,
          fontFamily: "'JetBrains Mono', monospace"
        }}>{items}</span>
      </div>
      <div style={{ color: COLORS.textSecondary, fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>📍 {address}</div>
    </div>
    <div style={{ textAlign: 'right', flexShrink: 0 }}>
      <div style={{ color: COLORS.textMuted, fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>~{time} min</div>
    </div>
  </div>
);

export default function EMCODashboard() {
  const [screen, setScreen] = useState('home');
  const [optimized, setOptimized] = useState(false);
  const [approved, setApproved] = useState(false);
  const [sent, setSent] = useState(false);
  const [driverMode, setDriverMode] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [signatureReceived, setSignatureReceived] = useState(false);
  const [driverSignedOff, setDriverSignedOff] = useState(false);
  const [completedStops, setCompletedStops] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 50);
  }, [screen]);

  const truckA = [
    { order: 'ORD-1042', address: '123 King St, Toronto', items: '5 Faucets', time: 20 },
    { order: 'ORD-1045', address: '456 Queen Ave, Toronto', items: '8 Faucets', time: 20 },
    { order: 'ORD-1048', address: '321 Bloor St W, Toronto', items: '2 Showerheads', time: 20 },
    { order: 'ORD-1051', address: '654 Yonge St, Toronto', items: '4 Pipes', time: 20 },
    { order: 'ORD-1054', address: '987 Front St E, Toronto', items: '3 Valves', time: 20 },
    { order: 'ORD-1057', address: '147 Adelaide St W, Toronto', items: '6 Faucets', time: 20 },
    { order: 'ORD-1060', address: '789 Richmond St, Toronto', items: '2 Showerheads', time: 20 },
  ];

  const truckB = [
    { order: 'ORD-1043', address: '100 Dundas Rd, North York', items: '3 Bathtubs', time: 20 },
    { order: 'ORD-1044', address: '200 Don Mills Rd, North York', items: '2 Bathtubs', time: 20 },
    { order: 'ORD-1046', address: '300 Sheppard Ave, North York', items: '7 Faucets', time: 20 },
    { order: 'ORD-1047', address: '400 Steeles Ave W, North York', items: '5 Showerheads', time: 20 },
    { order: 'ORD-1049', address: '500 Finch Ave E, North York', items: '3 Valves', time: 20 },
    { order: 'ORD-1050', address: '600 Lawrence Ave W, North York', items: '4 Pipes', time: 20 },
    { order: 'ORD-1052', address: '700 Eglinton Ave E, North York', items: '2 Faucets', time: 20 },
    { order: 'ORD-1053', address: '800 Bayview Ave, North York', items: '6 Showerheads', time: 20 },
  ];

  const savingsData = [
    { name: 'Mon', manual: 628, optimized: 467 },
    { name: 'Tue', manual: 595, optimized: 441 },
    { name: 'Wed', manual: 710, optimized: 520 },
    { name: 'Thu', manual: 642, optimized: 475 },
    { name: 'Fri', manual: 680, optimized: 498 },
  ];

  const trendData = [
    { month: 'Jan', savings: 2800 },
    { month: 'Feb', savings: 3100 },
    { month: 'Mar', savings: 3400 },
    { month: 'Apr', savings: 3200 },
    { month: 'May', savings: 3600 },
    { month: 'Jun', savings: 4044 },
  ];

  const containerStyle = {
    minHeight: '100vh', background: COLORS.bg, padding: '32px',
    fontFamily: "'JetBrains Mono', monospace",
    opacity: animateIn ? 1 : 0, transition: 'opacity 0.4s ease-in'
  };

  // ============ HOME ============
  if (screen === 'home') {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '14px', color: COLORS.blue, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>EMCO CORPORATION</div>
              <h1 style={{ fontSize: '42px', fontWeight: '700', color: COLORS.textPrimary, margin: 0, lineHeight: 1.2 }}>Delivery<br />Optimizer</h1>
              <div style={{ width: '60px', height: '3px', background: COLORS.blue, margin: '24px auto', borderRadius: '2px' }} />
              <p style={{ color: COLORS.textSecondary, fontSize: '14px' }}>AI-Powered Route Optimization & Execution</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => setScreen('savings')} style={{
                background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: '12px',
                padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s', color: COLORS.textPrimary,
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = COLORS.green; e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.greenGlow}`; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = `${COLORS.green}40`; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Executive Cost Saving Analysis Dashboard</div>
                  <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>ROI metrics, cost comparison, efficiency gains</div>
                </div>
                <div style={{ fontSize: '24px' }}>→</div>
              </button>

              <button onClick={() => { setScreen('supervisor'); setOptimized(false); setApproved(false); setSent(false); }} style={{
                background: COLORS.card, border: `1px solid ${COLORS.blue}40`, borderRadius: '12px',
                padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s', color: COLORS.textPrimary,
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = COLORS.blue; e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.blueGlow}`; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = `${COLORS.blue}40`; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Supervisor Dashboard</div>
                  <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>Route optimization, approvals, dispatch</div>
                </div>
                <div style={{ fontSize: '24px' }}>→</div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ============ COST SAVINGS ============
  if (screen === 'savings') {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button onClick={() => setScreen('home')} style={{
              background: 'none', border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px',
              padding: '8px 20px', cursor: 'pointer', color: COLORS.textSecondary, marginBottom: '32px',
              fontSize: '13px', fontFamily: "'JetBrains Mono', monospace"
            }}>← Back</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.textPrimary, margin: 0 }}>Executive Cost Saving Analysis Dashboard</h1>
                <p style={{ color: COLORS.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>Ontario Region | Last 30 Days | May 30, 2026</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', padding: '8px 16px', fontSize: '12px', color: COLORS.textSecondary }}>Live Data</div>
              </div>
            </div>

            {/* Top Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <MetricCard title="Distance Reduction" value="28" unit="%" color={COLORS.green} status="EXCELLENT" change={-28} />
              <MetricCard title="Time Saved" value="2.5" unit="hrs/day" color={COLORS.blue} status="GOOD" change={-26} />
              <MetricCard title="Cost per Delivery" value="$31" unit="" color={COLORS.indigo} status="OPTIMIZED" change={-26} />
              <MetricCard title="Driver Utilization" value="85" unit="%" color={COLORS.amber} status="GOOD" change={18} />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {/* Daily Cost Comparison */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '14px', color: COLORS.textSecondary, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Daily Cost Comparison</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={savingsData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                    <Tooltip
                      contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', fontSize: '12px' }}
                      labelStyle={{ color: COLORS.textPrimary }}
                    />
                    <Bar dataKey="manual" fill={COLORS.red} radius={[4, 4, 0, 0]} name="Manual" />
                    <Bar dataKey="optimized" fill={COLORS.green} radius={[4, 4, 0, 0]} name="Optimized" />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: COLORS.textMuted }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: COLORS.red }} /> Manual Routing
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: COLORS.textMuted }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: COLORS.green }} /> AI Optimized
                  </div>
                </div>
              </div>

              {/* Gauges */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '14px', color: COLORS.textSecondary, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Performance</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <GaugeChart value={28} max={100} color={COLORS.green} label="Fuel Saved" sublabel="%" />
                  <GaugeChart value={85} max={100} color={COLORS.blue} label="Utilization" sublabel="%" />
                  <GaugeChart value={26} max={100} color={COLORS.indigo} label="Time Saved" sublabel="%" />
                  <GaugeChart value={15} max={100} color={COLORS.amber} label="Deliveries" sublabel="/day" />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Savings Trend */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '14px', color: COLORS.textSecondary, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Savings Trend</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                    <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="savings" stroke={COLORS.green} strokeWidth={2} dot={{ fill: COLORS.green, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Annual Impact */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '14px', color: COLORS.textSecondary, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Annual Impact</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: `1px solid ${COLORS.green}30`, borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '4px' }}>DAILY SAVINGS</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.green }}>$161.75</div>
                  </div>
                  <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: `1px solid ${COLORS.blue}30`, borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '4px' }}>MONTHLY SAVINGS</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.blue }}>$3,235</div>
                  </div>
                  <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: `1px solid ${COLORS.indigo}30`, borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '4px' }}>ANNUAL SAVINGS (250 DAYS)</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.indigo }}>$40,438</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ============ SUPERVISOR DASHBOARD ============
  if (screen === 'supervisor' && !approved && !sent) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button onClick={() => setScreen('home')} style={{
              background: 'none', border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px',
              padding: '8px 20px', cursor: 'pointer', color: COLORS.textSecondary, marginBottom: '32px',
              fontSize: '13px', fontFamily: "'JetBrains Mono', monospace"
            }}>← Back</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.textPrimary, margin: 0 }}>Delivery Route Supervisor</h1>
                <p style={{ color: COLORS.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>Ontario Region | 15 Orders Ready | May 30, 2026</p>
              </div>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.amber}40`, borderRadius: '8px', padding: '8px 16px', fontSize: '12px', color: COLORS.amber }}>⏰ 4:00 AM</div>
            </div>

            {/* Optimize Button */}
            {!optimized && (
              <button onClick={() => setOptimized(true)} style={{
                width: '100%', background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.blue})`,
                border: 'none', borderRadius: '12px', padding: '24px', cursor: 'pointer',
                color: '#fff', fontSize: '18px', fontWeight: '600', marginBottom: '32px',
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: `0 0 30px ${COLORS.blueGlow}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 0 50px ${COLORS.blueGlow}`; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.blueGlow}`; }}
              >
                🤖 Optimize Routes with Google Maps API
              </button>
            )}

            {optimized && (
              <>
                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Orders</div>
                    <div style={{ fontSize: '36px', fontWeight: '700', color: COLORS.textPrimary }}>15</div>
                    <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>across 2 trucks</div>
                  </div>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Distance</div>
                    <div style={{ fontSize: '36px', fontWeight: '700', color: COLORS.green }}>70 <span style={{ fontSize: '16px' }}>km</span></div>
                    <div style={{ fontSize: '12px', color: COLORS.green }}>optimized route</div>
                  </div>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Departure</div>
                    <div style={{ fontSize: '36px', fontWeight: '700', color: COLORS.amber }}>6:00</div>
                    <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>AM departure</div>
                  </div>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Est. Completion</div>
                    <div style={{ fontSize: '36px', fontWeight: '700', color: COLORS.blue }}>9:30</div>
                    <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>AM estimated</div>
                  </div>
                </div>

                {/* Truck A */}
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.blue}40`, borderRadius: '12px', padding: '24px', marginBottom: '16px', boxShadow: `0 0 20px ${COLORS.blueGlow}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: COLORS.blue, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontWeight: '700', color: '#fff' }}>TRUCK A</div>
                      <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>Downtown Toronto Cluster</div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.textPrimary }}>7</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>STOPS</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.blue }}>32 km</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>DISTANCE</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.textPrimary }}>155 min</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>EST. TIME</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {truckA.map((d, i) => <DeliveryRow key={i} index={i} {...d} color={COLORS.blue} />)}
                  </div>
                </div>

                {/* Truck B */}
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.indigo}40`, borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: `0 0 20px ${COLORS.indigoGlow}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: COLORS.indigo, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontWeight: '700', color: '#fff' }}>TRUCK B</div>
                      <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>North York Cluster</div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.textPrimary }}>8</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>STOPS</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.indigo }}>38 km</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>DISTANCE</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.textPrimary }}>175 min</div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted }}>EST. TIME</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {truckB.map((d, i) => <DeliveryRow key={i} index={i} {...d} color={COLORS.indigo} />)}
                  </div>
                </div>

                {/* Approval */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => setApproved(true)} style={{
                    flex: 1, background: `linear-gradient(135deg, ${COLORS.green}, #059669)`,
                    border: 'none', borderRadius: '12px', padding: '20px', cursor: 'pointer',
                    color: '#fff', fontSize: '16px', fontWeight: '600',
                    fontFamily: "'JetBrains Mono', monospace",
                    boxShadow: `0 0 20px ${COLORS.greenGlow}`,
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    ✓ Approve Routes
                  </button>
                  <button onClick={() => setOptimized(false)} style={{
                    flex: 1, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: '12px', padding: '20px', cursor: 'pointer',
                    color: COLORS.textSecondary, fontSize: '16px', fontWeight: '600',
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    ✕ Change
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // ============ SEND TO DRIVERS ============
  if (screen === 'supervisor' && approved && !sent) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: '16px', padding: '48px', textAlign: 'center', marginBottom: '24px', boxShadow: `0 0 40px ${COLORS.greenGlow}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.green, margin: '0 0 8px' }}>Routes Approved</h1>
              <p style={{ color: COLORS.textSecondary, fontSize: '14px' }}>Ready to dispatch to drivers via Telegram</p>
            </div>

            <button onClick={() => setSent(true)} style={{
              width: '100%', background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.blue})`,
              border: 'none', borderRadius: '12px', padding: '24px', cursor: 'pointer',
              color: '#fff', fontSize: '18px', fontWeight: '600',
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: `0 0 30px ${COLORS.blueGlow}`,
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              📱 Send Routes to Drivers via Telegram
            </button>
          </div>
        </div>
      </>
    );
  }

  // ============ SENT - LAUNCH DRIVER VIEW ============
  if (screen === 'supervisor' && sent && !driverMode) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: '16px', padding: '48px', textAlign: 'center', marginBottom: '24px', boxShadow: `0 0 40px ${COLORS.greenGlow}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.green, margin: '0 0 16px' }}>Routes Dispatched</h1>
              <p style={{ color: COLORS.textSecondary, fontSize: '14px', marginBottom: '32px' }}>Drivers have received their delivery routes via Telegram</p>

              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', padding: '16px', textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Dispatch Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textSecondary }}>
                    <span style={{ color: COLORS.blue }}>TRUCK A</span>
                    <span>7 deliveries | 32 km | 6:00 AM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textSecondary }}>
                    <span style={{ color: COLORS.indigo }}>TRUCK B</span>
                    <span>8 deliveries | 38 km | 6:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => { setDriverMode(true); setCurrentStop(0); setCompletedStops([]); setDriverSignedOff(false); }} style={{
              width: '100%', background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.indigo})`,
              border: 'none', borderRadius: '12px', padding: '24px', cursor: 'pointer',
              color: '#fff', fontSize: '18px', fontWeight: '600',
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: `0 0 30px ${COLORS.blueGlow}`,
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              📱 View Driver Experience (Truck A)
            </button>
          </div>
        </div>
      </>
    );
  }

  // ============ DRIVER EXECUTION ============
  if (screen === 'supervisor' && sent && driverMode && !driverSignedOff) {
    const currentDelivery = truckA[currentStop];
    const isLastStop = currentStop === truckA.length - 1;
    const progressPct = Math.round(((completedStops.length) / truckA.length) * 100);

    const handleDeliverComplete = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCompletedStops([...completedStops, { ...currentDelivery, completedTime: timeStr, stopNum: currentStop + 1 }]);
      setPhotoTaken(false);
      setSignatureReceived(false);

      if (isLastStop) {
        setDriverSignedOff(false);
        setCurrentStop(currentStop + 1);
      } else {
        setCurrentStop(currentStop + 1);
      }
    };

    // All stops done - sign off screen
    if (currentStop >= truckA.length) {
      return (
        <>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <div style={containerStyle}>
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: '16px', padding: '40px', textAlign: 'center', marginBottom: '24px', boxShadow: `0 0 40px ${COLORS.greenGlow}` }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: COLORS.green, margin: '0 0 8px' }}>All Deliveries Complete</h1>
                <p style={{ color: COLORS.textSecondary, fontSize: '13px', marginBottom: '24px' }}>{truckA.length} of {truckA.length} deliveries completed</p>

                <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ width: '100%', height: '100%', background: COLORS.green, borderRadius: '4px', boxShadow: `0 0 8px ${COLORS.green}40` }} />
                </div>

                {/* Completed Stops Summary */}
                <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Delivery Log</div>
                  {completedStops.map((stop, idx) => (
                    <div key={idx} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 12px', background: idx % 2 === 0 ? 'rgba(30, 41, 59, 0.5)' : 'transparent',
                      borderRadius: '6px', fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: COLORS.green }}>✅</span>
                        <span style={{ color: COLORS.textPrimary }}>{stop.order}</span>
                        <span style={{ color: COLORS.textMuted }}>|</span>
                        <span style={{ color: COLORS.textSecondary }}>{stop.items}</span>
                      </div>
                      <span style={{ color: COLORS.textMuted }}>{stop.completedTime}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setDriverSignedOff(true)} style={{
                width: '100%', background: `linear-gradient(135deg, ${COLORS.green}, #059669)`,
                border: 'none', borderRadius: '12px', padding: '24px', cursor: 'pointer',
                color: '#fff', fontSize: '18px', fontWeight: '600',
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: `0 0 30px ${COLORS.greenGlow}`,
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                ✍️ Sign Off & Notify Supervisor
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Driver Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>TRUCK A — DRIVER VIEW</div>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: COLORS.textPrimary, margin: '4px 0 0' }}>Delivery Execution</h1>
              </div>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', padding: '8px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.blue }}>{currentStop + 1}/{truckA.length}</div>
                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>STOP</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: COLORS.textMuted }}>Route Progress</span>
                <span style={{ fontSize: '11px', color: COLORS.blue }}>{progressPct}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPct}%`, height: '100%', background: COLORS.blue, borderRadius: '3px', transition: 'width 0.5s ease', boxShadow: `0 0 8px ${COLORS.blue}40` }} />
              </div>
            </div>

            {/* Current Delivery Card */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.blue}40`, borderRadius: '16px', padding: '28px', marginBottom: '16px', boxShadow: `0 0 20px ${COLORS.blueGlow}` }}>
              <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Current Delivery</div>

              {/* Address */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '6px' }}>DELIVERY ADDRESS</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: COLORS.textPrimary, marginBottom: '4px' }}>📍 {currentDelivery.address}</div>
              </div>

              {/* Products */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '6px' }}>PRODUCTS TO DELIVER</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: COLORS.textPrimary }}>📦 {currentDelivery.items}</div>
                  <div style={{
                    background: `${COLORS.blue}20`, border: `1px solid ${COLORS.blue}40`, borderRadius: '6px',
                    padding: '4px 12px', fontSize: '12px', color: COLORS.blue, fontWeight: '600'
                  }}>
                    {currentDelivery.order}
                  </div>
                </div>
              </div>

              {/* Number of Products */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '6px' }}>NUMBER OF PRODUCTS DELIVERED</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.amber }}>{currentDelivery.items.split(' ')[0]}</div>
              </div>

              {/* Photo Upload */}
              <button
                onClick={() => setPhotoTaken(true)}
                disabled={photoTaken}
                style={{
                  width: '100%', padding: '16px', borderRadius: '10px', cursor: photoTaken ? 'default' : 'pointer',
                  border: photoTaken ? `1px solid ${COLORS.green}40` : `1px solid ${COLORS.amber}40`,
                  background: photoTaken ? `${COLORS.green}10` : `${COLORS.amber}10`,
                  color: photoTaken ? COLORS.green : COLORS.amber,
                  fontSize: '14px', fontWeight: '600', marginBottom: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s',
                }}
              >
                {photoTaken ? '✅ Photo Uploaded' : '📸 Upload Delivery Photo'}
              </button>

              {/* Client Signature */}
              <button
                onClick={() => setSignatureReceived(true)}
                disabled={signatureReceived}
                style={{
                  width: '100%', padding: '16px', borderRadius: '10px', cursor: signatureReceived ? 'default' : 'pointer',
                  border: signatureReceived ? `1px solid ${COLORS.green}40` : `1px solid ${COLORS.indigo}40`,
                  background: signatureReceived ? `${COLORS.green}10` : `${COLORS.indigo}10`,
                  color: signatureReceived ? COLORS.green : COLORS.indigo,
                  fontSize: '14px', fontWeight: '600', marginBottom: '16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s',
                }}
              >
                {signatureReceived ? '✅ Client Signature Received' : '✍️ Capture Client Signature'}
              </button>

              {/* Deliver Button */}
              <button
                onClick={handleDeliverComplete}
                disabled={!photoTaken || !signatureReceived}
                style={{
                  width: '100%', padding: '20px', borderRadius: '12px', cursor: (!photoTaken || !signatureReceived) ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: (!photoTaken || !signatureReceived)
                    ? '#1e293b'
                    : `linear-gradient(135deg, ${COLORS.green}, #059669)`,
                  color: (!photoTaken || !signatureReceived) ? COLORS.textMuted : '#fff',
                  fontSize: '16px', fontWeight: '700',
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: (photoTaken && signatureReceived) ? `0 0 20px ${COLORS.greenGlow}` : 'none',
                  transition: 'all 0.3s',
                }}
              >
                {(!photoTaken || !signatureReceived) ? '⏳ Complete Photo & Signature First' : '✅ Order Delivered — Next Stop'}
              </button>
            </div>

            {/* Completed Stops */}
            {completedStops.length > 0 && (
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Completed ({completedStops.length}/{truckA.length})
                </div>
                {completedStops.map((stop, idx) => (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', background: idx % 2 === 0 ? 'rgba(30, 41, 59, 0.3)' : 'transparent',
                    borderRadius: '6px', fontSize: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: COLORS.green }}>✅</span>
                      <span style={{ color: COLORS.textPrimary }}>Stop {stop.stopNum}</span>
                      <span style={{ color: COLORS.textMuted }}>|</span>
                      <span style={{ color: COLORS.textSecondary }}>{stop.items}</span>
                    </div>
                    <span style={{ color: COLORS.textMuted }}>{stop.completedTime}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // ============ DRIVER SIGNED OFF ============
  if (screen === 'supervisor' && sent && driverMode && driverSignedOff) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={containerStyle}>
          <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: `0 0 40px ${COLORS.greenGlow}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: COLORS.green, margin: '0 0 8px' }}>Driver Signed Off</h1>
              <p style={{ color: COLORS.textSecondary, fontSize: '13px', marginBottom: '32px' }}>End of day report sent to supervisor</p>

              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', padding: '20px', textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Supervisor Notification</div>

                <div style={{ background: COLORS.bg, borderRadius: '8px', padding: '16px', border: `1px solid ${COLORS.cardBorder}` }}>
                  <div style={{ fontSize: '12px', color: COLORS.blue, marginBottom: '8px', fontWeight: '600' }}>📱 Telegram Message to Supervisor</div>
                  <div style={{ fontSize: '13px', color: COLORS.textPrimary, lineHeight: 1.6 }}>
                    <div style={{ marginBottom: '8px' }}>🚚 <strong>TRUCK A — END OF DAY REPORT</strong></div>
                    <div style={{ color: COLORS.textSecondary }}>
                      <div>✅ All {truckA.length} deliveries completed</div>
                      <div>📸 {truckA.length} photos uploaded</div>
                      <div>✍️ {truckA.length} signatures collected</div>
                      <div>🕐 Route completed at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div style={{ marginTop: '8px', color: COLORS.green, fontWeight: '600' }}>STATUS: ALL DELIVERIES CONFIRMED ✅</div>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => { setOptimized(false); setApproved(false); setSent(false); setDriverMode(false); setDriverSignedOff(false); setCurrentStop(0); setCompletedStops([]); }} style={{
                background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px',
                padding: '12px 32px', cursor: 'pointer', color: COLORS.textSecondary, fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
