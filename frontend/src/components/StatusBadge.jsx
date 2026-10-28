import React from 'react';

export default function StatusBadge({ delivered }) {
  return <span className={`status-badge ${delivered ? 'delivered' : 'pending'}`}>{delivered ? 'Delivered' : 'Pending'}</span>;
}
