import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import AddSession from './pages/AddSession';
import SessionDetails from './pages/SessionDetails';
import EditSession from './pages/EditSession';
import NotFound from './pages/NotFound';

const titles = { '/dashboard': 'Dashboard', '/sessions': 'All sessions', '/sessions/add': 'Add session' };

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = location.pathname.startsWith('/sessions/edit')
    ? 'Edit session'
    : location.pathname.startsWith('/sessions/add')
      ? 'Add session'
      : location.pathname.startsWith('/sessions/')
        ? 'Session details'
        : titles[location.pathname] || 'Page not found';

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-area">
        <Navbar title={title} onMenu={() => setSidebarOpen(true)} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/add" element={<AddSession />} />
            <Route path="/sessions/:id" element={<SessionDetails />} />
            <Route path="/sessions/edit/:id" element={<EditSession />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      {sidebarOpen && <button className="overlay" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
