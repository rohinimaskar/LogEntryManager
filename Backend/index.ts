
// backend/index.ts
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export interface LogEntry {
  id: string;
  userName: string;
  description: string;
  date: string;
  location: string;
}

const app = express();
const PORT = 4000;
const DB_FILE = 'logs.json';

app.use(cors());
app.use(express.json());

let logs: LogEntry[] = fs.existsSync(DB_FILE)
  ? JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
  : [];

const saveLogs = () => fs.writeFileSync(DB_FILE, JSON.stringify(logs, null, 2));

app.get('/logs', (_, res) => {
  res.json(logs);
});


app.post('/logs', (req, res) => {
  const newLog: LogEntry = { id: uuidv4(), ...req.body };
  logs.push(newLog);
  saveLogs();
  res.status(201).json(newLog);
});

app.put('/logs/:id', (req, res) => {
  const index = logs.findIndex((log) => log.id === req.params.id);
  if (index !== -1) {
    logs[index] = { ...logs[index], ...req.body };
    saveLogs();
    res.json(logs[index]);
  } else {
    res.status(404).json({ error: 'Log not found' });
  }
});

app.delete('/logs/:id', (req, res) => {
  const index = logs.findIndex((log) => log.id === req.params.id);
  if (index !== -1) {
    const deleted = logs.splice(index, 1);
    saveLogs();
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Log not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));