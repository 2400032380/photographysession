import React, { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, IndianRupee, Pencil, Trash2, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteSession, getSessionById } from '../services/photographyService';
import { formatCurrency, formatDate, getErrorMessage } from '../utils/formatters';

export default function SessionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSessionById(id);
        if (!data) {
          setError('This session could not be found.');
        } else {
          setSession(data);
        }
      } catch (e) {
        setError(getErrorMessage(e, 'Unable to load this session.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const remove = async () => {
    setDeleting(true);
    try {
      await deleteSession(session.id);
      navigate('/sessions');
    } catch (e) {
      setError(getErrorMessage(e, 'Unable to delete this session.'));
      setConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading session…" />;
  if (error) {
    return (
      <div className="alert error">
        {error}
        <Link className="text-link" to="/sessions">Back to sessions</Link>
      </div>
    );
  }

  return (
    <section className="details-page">
      {location.state?.message && <div className="alert success">{location.state.message}</div>}
      <Link className="back-link" to="/sessions">
        <ArrowLeft size={17} />Back to all sessions
      </Link>

      <div className="detail-heading">
        <div>
          <p className="eyebrow">Session #{session.id}</p>
          <h2>{session.clientName}</h2>
          <p className="subtle">Photography session record</p>
        </div>
        <div className="detail-actions">
          <Link className="button secondary" to={`/sessions/edit/${session.id}`}>
            <Pencil size={17} />Edit
          </Link>
          <button className="button danger-outline" onClick={() => setConfirm(true)}>
            <Trash2 size={17} />Delete
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <CalendarDays />
          <span>Session date</span>
          <strong>{formatDate(session.sessionDate)}</strong>
        </div>
        <div className="detail-card">
          <IndianRupee />
          <span>Package price</span>
          <strong>{formatCurrency(session.packagePrice)}</strong>
        </div>
        <div className="detail-card">
          <UserRound />
          <span>Delivery status</span>
          <strong>
            <StatusBadge delivered={session.delivered} />
          </strong>
        </div>
      </div>

      {confirm && (
        <ConfirmDialog
          title="Delete this session?"
          message={`This will permanently remove the session for ${session.clientName}.`}
          onCancel={() => setConfirm(false)}
          onConfirm={remove}
          busy={deleting}
        />
      )}
    </section>
  );
}
