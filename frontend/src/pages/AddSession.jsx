import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionForm from '../components/SessionForm';
import { addSession } from '../services/photographyService';
import { getErrorMessage } from '../utils/formatters';
export default function AddSession() {
  const navigate = useNavigate(); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState('');
  const submit = async (values) => { setSubmitting(true); setError(''); try { await addSession(values); navigate('/sessions', { state: { message: 'Session created successfully.' } }); } catch (e) { setError(getErrorMessage(e, 'Unable to create the session.')); } finally { setSubmitting(false); } };
  return <section className="form-page"><div className="page-intro compact"><div><p className="eyebrow">New record</p><h2>Add photography session</h2><p className="subtle">Capture the details of a new client booking.</p></div></div>{error && <div className="alert error">{error}</div>}<div className="panel form-panel"><SessionForm initialValues={{ clientName: '', sessionDate: '', packagePrice: '', delivered: false }} onSubmit={submit} submitting={submitting} submitLabel="Create session" /></div></section>;
}
