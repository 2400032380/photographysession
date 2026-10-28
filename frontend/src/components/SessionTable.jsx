import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function SessionTable({ sessions, onDelete }) {
  return <div className="table-wrap"><table><thead><tr><th>ID</th><th>Client</th><th>Date</th><th>Package value</th><th>Status</th><th className="align-right">Actions</th></tr></thead>
    <tbody>{sessions.map((session) => <tr key={session.id}><td className="muted">#{session.id}</td><td><strong>{session.clientName}</strong></td><td>{formatDate(session.sessionDate)}</td><td>{formatCurrency(session.packagePrice)}</td><td><StatusBadge delivered={session.delivered} /></td>
      <td><div className="row-actions"><Link className="icon-button" title="View session" to={`/sessions/${session.id}`}><Eye size={17} /></Link><Link className="icon-button" title="Edit session" to={`/sessions/edit/${session.id}`}><Pencil size={17} /></Link><button className="icon-button danger-icon" title="Delete session" onClick={() => onDelete(session)}><Trash2 size={17} /></button></div></td>
    </tr>)}</tbody></table></div>;
}
