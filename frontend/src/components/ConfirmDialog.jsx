import React from 'react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, busy }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onCancel}>
      <div className="dialog" role="alertdialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <h2>{title}</h2><p>{message}</p>
        <div className="dialog-actions"><button className="button secondary" onClick={onCancel}>Cancel</button><button className="button danger" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : 'Delete session'}</button></div>
      </div>
    </div>
  );
}
