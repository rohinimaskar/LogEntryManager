import React, { useState } from 'react';
import { LogEntry } from '../types';

type Props = {
  initial: Omit<LogEntry, 'id'>;
  onSave: (log: Omit<LogEntry, 'id'>, id?: string) => void;
  isEditing?: boolean;
};

const LogForm: React.FC<Props> = ({ initial, onSave, isEditing }) => {
  const [form, setForm] = useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm(initial);
  };

  return (
    <form onSubmit={handleSubmit} className="log-form">
      <input name="userName" placeholder="Your name" value={form.userName} onChange={handleChange} required />
      <input name="description" placeholder="Event description" value={form.description} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Log</button>
    </form>
  );
};

export default LogForm;