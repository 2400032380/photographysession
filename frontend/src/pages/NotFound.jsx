import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() { return <div className="empty-state page-empty"><h2>Page not found</h2><p>The page you requested does not exist.</p><Link className="button primary" to="/dashboard">Back to dashboard</Link></div>; }
