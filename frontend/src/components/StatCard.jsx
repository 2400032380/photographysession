import React from 'react';

export default function StatCard({ icon: Icon, label, value, accent }) {
  return <div className="stat-card"><div className={`stat-icon ${accent}`}><Icon size={20} /></div><div><p>{label}</p><strong>{value}</strong></div></div>;
}
