import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SessionForm from '../components/SessionForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSessionById, updateSession } from '../services/photographyService';
import { getErrorMessage } from '../utils/formatters';

export default function EditSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  const submit = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      await updateSession({ id: session.id, ...values });
      navigate(`/sessions/${session.id}`, { state: { message: 'Session updated successfully.' } });
    } catch (e) {
      setError(getErrorMessage(e, 'Unable to update the session.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-page">
      <div className="page-intro compact">
        <div>
          <p className="eyebrow">Update record</p>
          <h2>Edit session</h2>
          <p className="subtle">Make changes to this session while preserving its identity.</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading session…" />
      ) : error ? (
        <div className="alert error">{error}</div>
      ) : (
        <div className="panel form-panel">
          <SessionForm
            initialValues={{
              clientName: session.clientName || '',
              sessionDate: session.sessionDate || '',
              packagePrice: session.packagePrice ?? '',
              delivered: Boolean(session.delivered),
            }}
            onSubmit={submit}
            submitting={submitting}
            submitLabel="Save changes"
          />
        </div>
      )}
    </section>
  );
}
