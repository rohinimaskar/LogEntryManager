import React from 'react';
import { LogEntry } from '../types';
import LogRecord from './LogRecord';

type Props = {
  logs: LogEntry[];
  onEdit: (log: LogEntry) => void;
  onDelete: (id: string) => void;
};

const LogList: React.FC<Props> = ({ logs, onEdit, onDelete }) => {
  return (
    <div className="log-list">
      {logs.length === 0 ? (
        <p>No entries yet. Add your first log!</p>
      ) : (
        logs.map((log) => (
          <LogRecord key={log.id} log={log} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default LogList;