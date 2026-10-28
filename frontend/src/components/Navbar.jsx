import React from 'react';
import { Menu } from 'lucide-react';
export default function Navbar({ title, onMenu }) {
  return <header className="topbar"><button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu /></button><div><p className="eyebrow">Studio workspace</p><h1>{title}</h1></div><div className="profile"><span className="avatar">FF</span><span className="profile-name">Studio manager</span></div></header>;
}
