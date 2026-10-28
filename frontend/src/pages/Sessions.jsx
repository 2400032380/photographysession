import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SessionTable from '../components/SessionTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteSession, getAllSessions } from '../services/photographyService';
import { getErrorMessage } from '../utils/formatters';

export default function Sessions() {
  const location = useLocation();
  const [sessions, setSessions] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      sessions.filter((session) => {
        const value = query.trim();
        const matchesQuery =
          !value ||
          String(session.id).includes(value) ||
          String(session.clientName || '').toLowerCase().includes(value.toLowerCase());
        const matchesStatus =
          status === 'all' || (status === 'delivered' ? session.delivered : !session.delivered);
        return matchesQuery && matchesStatus;
      }),
    [sessions, query, status]
  );

  const remove = async () => {
    setDeleting(true);
    try {
      await deleteSession(selected.id);
      setSelected(null);
      await load();
    } catch (e) {
      setError(getErrorMessage(e, 'Unable to delete this session.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Workspace</p>
          <h2>All sessions</h2>
          <p className="subtle">Browse and manage every photography session.</p>
        </div>
        <Link className="button primary" to="/sessions/add">
          <Plus size={18} />Add session
        </Link>
      </section>

      {location.state?.message && <div className="alert success">{location.state.message}</div>}
      {error && <div className="alert error">{error}</div>}

      <section className="panel">
        <div className="filters">
          <label className="search-box">
            <Search size={18} />
            <input
              placeholder="Search by client or ID…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="select-box">
            <SlidersHorizontal size={17} />
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
            </select>
          </label>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading sessions…" />
        ) : filtered.length ? (
          <SessionTable sessions={filtered} onDelete={setSelected} />
        ) : (
          <div className="empty-state">
            <Search size={28} />
            <h3>{sessions.length ? 'No matching sessions' : 'No sessions yet'}</h3>
            <p>{sessions.length ? 'Try adjusting your search or filters.' : 'Add a session to start building your studio workspace.'}</p>
            {!sessions.length && (
              <Link className="button primary" to="/sessions/add">
                Add session
              </Link>
            )}
          </div>
        )}
      </section>

      {selected && (
        <ConfirmDialog
          title="Delete this session?"
          message={`This will permanently remove the session for ${selected.clientName}.`}
          onCancel={() => setSelected(null)}
          onConfirm={remove}
          busy={deleting}
        />
      )}
    </>
  );
}
