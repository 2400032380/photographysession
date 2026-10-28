import React from 'react';
import { Camera, ClipboardList, LayoutDashboard, Plus, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}><div className="brand"><span className="brand-mark"><Camera size={19} /></span><span>Frame <em>&</em> Focus</span><button className="mobile-close" onClick={onClose}><X size={20} /></button></div><p className="nav-label">Workspace</p><nav>
    <NavLink to="/dashboard" onClick={onClose}><LayoutDashboard size={18} />Dashboard</NavLink><NavLink to="/sessions" end onClick={onClose}><ClipboardList size={18} />All sessions</NavLink><NavLink to="/sessions/add" onClick={onClose}><Plus size={18} />Add session</NavLink>
  </nav><div className="sidebar-footer"><div className="footer-dot" />Connected workspace</div></aside>;
}
