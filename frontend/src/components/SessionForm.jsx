import React, { useState } from 'react';

export default function SessionForm({ initialValues, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    const clientName = values.clientName.trim();
    if (!clientName) nextErrors.clientName = 'Client name is required.';
    if (!values.sessionDate) nextErrors.sessionDate = 'Session date is required.';
    if (values.packagePrice === '' || Number(values.packagePrice) <= 0) nextErrors.packagePrice = 'Enter a package price greater than zero.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSubmit({ ...values, clientName, packagePrice: Number(values.packagePrice), delivered: Boolean(values.delivered) });
  };
  return <form className="session-form" onSubmit={submit} noValidate>
    <div className="form-grid"><label>Client name<input value={values.clientName} onChange={(e) => update('clientName', e.target.value)} placeholder="e.g. Ravi Kumar" autoComplete="name" />{errors.clientName && <small className="field-error">{errors.clientName}</small>}</label>
      <label>Session date<input type="date" value={values.sessionDate} onChange={(e) => update('sessionDate', e.target.value)} />{errors.sessionDate && <small className="field-error">{errors.sessionDate}</small>}</label>
      <label>Package price (INR)<input type="number" min="0.01" step="0.01" value={values.packagePrice} onChange={(e) => update('packagePrice', e.target.value)} placeholder="5000" />{errors.packagePrice && <small className="field-error">{errors.packagePrice}</small>}</label>
      <label className="switch-label">Delivery status<div className="switch-row"><button type="button" className={`switch ${values.delivered ? 'active' : ''}`} aria-pressed={values.delivered} onClick={() => update('delivered', !values.delivered)}><span /></button><span>{values.delivered ? 'Delivered' : 'Pending'}</span></div></label>
    </div><button className="button primary submit-button" disabled={submitting}>{submitting ? 'Saving…' : submitLabel}</button>
  </form>;
}
