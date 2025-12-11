# Q-RISQ: Product Requirement Document (PRD) untuk MVP
_Hybrid Quantum–AI Decision Support System_

## 1. Overview
Q-RISQ adalah platform analisis risiko berbasis AI + Quantum Simulator yang 
memungkinkan pengguna memasukkan skenario bisnis dalam bentuk teks bahasa alami, 
yang kemudian diproses menjadi probabilitas keberhasilan, peta risiko, dan rekomendasi.

Platform terdiri dari:
- **Frontend Web App (NextJS)**  
- **Backend API (FastAPI – Python)**  
- **AI Layer (LLM / GPT-4)**  
- **Quantum Simulation Engine (IBM Qiskit Simulator)**  
- **Database / Cloud Storage**

MVP ini dibuat untuk kebutuhan presentasi & demo lomba, namun tetap mengikuti standar 
engineering modern agar mudah dikembangkan menjadi produk nyata.

---

## 2. Goals & Objectives

### 2.1 Goals MVP
- Menyediakan demo fungsional dari proses:
  Input teks → Ekstraksi variabel → Simulasi risiko → Visualisasi hasil
- Menampilkan dashboard hasil analisis yang menarik secara visual.
- Mengilustrasikan integrasi AI + Quantum Simulation dalam bentuk arsitektur jelas.

### 2.2 Non-Goals (untuk MVP)
- Tidak perlu menjalankan Quantum Computing nyata (cukup simulator/mock).
- Tidak perlu integrasi login/akun.
- Tidak perlu billing atau subscription.

---

## 3. User Stories

### 3.1 Core User Story
**Sebagai** pengguna,  
**saya ingin** memasukkan deskripsi skenario bisnis,  
**agar saya bisa** melihat analisis risiko dan probabilitas keberhasilan secara cepat.

### 3.2 Supporting Stories
- Sebagai pengguna, saya dapat melihat grafik heatmap risiko.
- Sebagai pengguna, saya dapat melihat rekomendasi mitigasi risiko.
- Sebagai admin, saya ingin sistem modular agar mudah ditingkatkan ke versi enterprise.

---

## 4. Product Flow (High-Level)

1. User mengetik skenario bisnis → klik “Analisis Risiko”
2. Frontend mengirim request JSON ke FastAPI
3. Backend:
   - Ekstraksi variabel menggunakan AI Layer (mock/LLM)
   - Menjalankan “Quantum Monte Carlo Simulation” (mock/simulator)
   - Menghasilkan output terstruktur (probabilitas + heatmap + risiko)
4. Backend mengirim JSON hasil ke frontend
5. Frontend menampilkan grafik & insight

---

## 5. Functional Requirements

### 5.1 Input Processing
- System menerima input teks minimal 50 karakter.
- Backend dapat mengubah teks menjadi parameter:
  - modal (number)
  - sektor (string)
  - lokasi (string)
  - tahun (number)

### 5.2 Quantum Simulation Module (MVP)
- Menghasilkan nilai probabilitas 0.0–1.0 (mock bisa random dengan range tertentu).
- Menghasilkan array heatmap risiko.
- Menghasilkan daftar rekomendasi.

### 5.3 Visualization
Frontend wajib menampilkan:
- Success Probability (angka besar)
- Heatmap / chart (Dummy data OK)
- List risiko kategori (High/Medium/Low)
- Rekomendasi tindakan

---

## 6. Non-Functional Requirements

- **Performance:** Response API < 2 detik (mocking).
- **Architecture:** Modular dan mudah diganti dengan modul quantum asli.
- **UI/UX:** Minimalis, clean, dan fokus pada hasil simulasi.
- **Deployability:** Dapat dijalankan lokal (localhost) tanpa konfigurasi rumit.

---

## 7. API Specification (MVP)

### `POST /api/analyze`
**Request:**
```json
{
  "description": "Investasi 500 juta di F&B Jakarta Selatan tahun 2026"
}

**Response:**
```json
{
  "success_probability": 0.75,
  "risk_heatmap": [[...], [...], ...],
  "risk_categories": {
    "High": ["Regulasi", "Persaingan"],
    "Medium": ["Pasar", "Operasional"],
    "Low": ["Keuangan"]
  },
  "recommendations": [
    "Diversifikasi produk",
    "Analisis pasar mendalam",
    ...
  ]
}
```
---
## 8. Architecture Diagram
```plaintext
[User] 
   ↓ Input Teks
[Frontend NextJS]
   ↓ Request API (JSON)
[Backend FastAPI]
   → Ekstraksi Variabel (AI Layer / GPT-4 mock)
   → Quantum Simulation (Qiskit / mock)
   → Simpan data
   ↑ Return JSON
[Frontend Dashboard]
   ↑ Visualisasi Grafik + Insight
````
---
## 9. Tech Stack
```plaintext
Frontend:

next.js / React

Vite

TailwindCSS

Recharts / Chart.js

Backend:

Python FastAPI

Uvicorn

Pydantic

(Optional) Qiskit simulator

Tools:

Git + GitHub

VS Code

Postman
````

## 10. Folder Structure
```plaintext
qrisq/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputBox.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── ChartHeatmap.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Result.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   │   └── analyze.py
│   │   ├── services/
│   │   │   ├── ai_extractor.py
│   │   │   ├── quantum_simulator.py
│   │   │   └── risk_engine.py
│   │   └── utils/
│   ├── requirements.txt
│   └── README.md
│
├── docs/
│   ├── PRD.md
│   ├── Architecture.png
│   └── MVP_Script.md
│
└── README.md
````