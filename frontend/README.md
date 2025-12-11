# Q-RISQ Frontend

Frontend web app untuk Q-RISQ - Quantum Risk Analysis System.

## Tech Stack
- React 18
- Vite
- TailwindCSS
- Recharts
- Lucide Icons

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## Build untuk Production
```bash
npm run build
npm run preview
```

## Project Structure
```
frontend/
├── public/
│   └── quantum.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── InputBox.jsx
│   │   ├── LoadingAnimation.jsx
│   │   ├── ResultCard.jsx
│   │   ├── ChartHeatmap.jsx
│   │   ├── ProbabilityGauge.jsx
│   │   └── Particles.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
