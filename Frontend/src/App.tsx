import React, { useEffect, useState } from 'react';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import { LogEntry } from './types';

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const fetchLogs = async () => {
    const res = await fetch('http://localhost:4000/logs');
    if (res) {
      console.log('changed logs', res.body);
      setLogs(await res.json());
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSave = async (log: Omit<LogEntry, 'id'>, id?: string) => {
    localStorage.setItem('userName', log.userName);
    setUserName(log.userName);
    const res = await fetch(`http://localhost:4000/logs${id ? '/' + id : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    await res.json();
    setEditingLog(null);
    fetchLogs();
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:4000/logs/${id}`, { method: 'DELETE' });
    fetchLogs();
  };

  const handleEdit = (log: LogEntry) => {
    setEditingLog(log);
  };

  return (
    <div className="container">
      <h1>Log Entry Manager</h1>
      <LogForm
        key={editingLog?.id || 'new'}
        initial={editingLog || { userName, description: '', date: '', location: '' }}
        onSave={(log) => handleSave(log, editingLog?.id)}
        isEditing={!!editingLog}
      />
      <LogList logs={logs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
