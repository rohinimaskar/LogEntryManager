import React from 'react';
import { LogEntry } from '../types';

type Props = {
  log: LogEntry;
  onEdit: (log: LogEntry) => void;
  onDelete: (id: string) => void;
};

const LogRecord: React.FC<Props> = ({ log, onEdit, onDelete }) => {
  return (
    <div className="log-card">
      <p><strong>User Name:</strong> {log.userName}</p>
      <p><strong>Description:</strong> {log.description}</p>
      <p><strong>Date:</strong> {log.date}</p>
      <p><strong>Location:</strong> {log.location}</p>
      <button onClick={() => onEdit(log)}>Edit</button>
      <button onClick={() => onDelete(log.id)}>Delete</button>
    </div>
  );
};

export default LogRecord;