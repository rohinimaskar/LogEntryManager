# Log Entry Manager

A full-stack web application that allows users to create, read, update, and delete log entries with details like user name, description, date, and location.

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, SCSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Vitest, Testing Library, Supertest

---

### ✅ Prerequisites
- Node.js = 22
- npm

---

## 🔧 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rohinimaskar/Log-Entry-Manager.git
```

### 2. Setup Backend
```bash
cd backend
npm install
npx ts-node index.ts
```

The backend server will run at `http://localhost:4000`

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🧪 Running Tests

### Frontend Tests
```bash
cd frontend
npm run test         # Run all tests
```

### Backend Tests
```bash
cd backend
npx vitest run
```

# Log-Entry-Manager