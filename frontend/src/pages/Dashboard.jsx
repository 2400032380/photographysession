import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, IndianRupee, Layers3, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SessionTable from '../components/SessionTable';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteSession, getAllSessions } from '../services/photographyService';
import { formatCurrency, getErrorMessage } from '../utils/formatters';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [selected, setSelected] = useState(null); const [deleting, setDeleting] = useState(false);
  const load = async () => { setLoading(true); setError(''); try { const data = await getAllSessions(); setSessions(Array.isArray(data) ? data : []); } catch (e) { setError(getErrorMessage(e)); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const remove = async () => { setDeleting(true); try { await deleteSession(selected.id); setSelected(null); await load(); } catch (e) { setError(getErrorMessage(e, 'Unable to delete this session.')); } finally { setDeleting(false); } };
  const delivered = sessions.filter((s) => s.delivered).length;
  return <><section className="page-intro"><div><p className="eyebrow">Overview</p><h2>Good morning, studio</h2><p className="subtle">Keep your sessions moving from first frame to final delivery.</p></div><Link className="button primary" to="/sessions/add"><Plus size={18} />Add new session</Link></section>
    {error && <div className="alert error">{error}</div>}{loading ? <LoadingSpinner label="Loading your studio data…" /> : <><div className="stats-grid"><StatCard icon={Layers3} label="Total sessions" value={sessions.length} accent="gold" /><StatCard icon={CheckCircle2} label="Delivered" value={delivered} accent="green" /><StatCard icon={Clock3} label="Pending delivery" value={sessions.length - delivered} accent="blue" /><StatCard icon={IndianRupee} label="Package value" value={formatCurrency(sessions.reduce((sum, s) => sum + Number(s.packagePrice || 0), 0))} accent="purple" /></div>
      <section className="panel"><div className="panel-heading"><div><p className="eyebrow">Your work</p><h3>Recent sessions</h3></div><Link className="text-link" to="/sessions">View all <ArrowRight size={16} /></Link></div>{sessions.length ? <SessionTable sessions={[...sessions].slice(-5).reverse()} onDelete={setSelected} /> : <div className="empty-state"><Layers3 size={28} /><h3>No sessions yet</h3><p>Create your first photography session to see it here.</p><Link className="button primary" to="/sessions/add">Add session</Link></div>}</section></>}
    {selected && <ConfirmDialog title="Delete this session?" message={`This will permanently remove the session for ${selected.clientName}.`} onCancel={() => setSelected(null)} onConfirm={remove} busy={deleting} />}
  </>;
}
