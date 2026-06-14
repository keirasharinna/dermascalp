# 🧠 Dermascalp — AI Scalp Condition Analyzer

Aplikasi web berbasis Deep Learning untuk mendeteksi kondisi kulit kepala secara otomatis menggunakan EfficientNetV2S + Grad-CAM visualization.

![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black?style=flat-square&logo=next.js)
![AI](https://img.shields.io/badge/AI-TensorFlow-FF6F00?style=flat-square&logo=tensorflow)
![Deploy](https://img.shields.io/badge/Deploy-Docker-2496ED?style=flat-square&logo=docker)

---

## 🔍 Kondisi yang Dapat Dideteksi

| Kondisi | Tingkat Keparahan |
|---|---|
| Healthy Scalp | Normal |
| Dandruff | Ringan |
| Alopecia Areata | Sedang |
| Hair Loss General | Sedang |
| Folliculitis | Sedang |
| Head Lice | Parah |
| Psoriasis | Parah |

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, TensorFlow 2.16, OpenCV
- **Frontend:** Next.js 14, Tailwind CSS, TypeScript
- **Model:** EfficientNetV2S (fine-tuned, 7 kelas)
- **XAI:** Grad-CAM visualization
- **Deploy:** Docker + Docker Compose

---

## 🚀 Cara Menjalankan

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) sudah terinstall
- Model file `.h5` (lihat bagian Download Model)

### 1. Clone Repository

​
git clone https://github.com/keirasharinna/dermascalp.git
cd dermascalp

### 2. Download Model

Download file model dari Google Drive:

👉 **[Download hair_scalp_model.h5](GANTI_DENGAN_LINK_GDRIVE)**

Letakkan file di:

​
dermascalp/backend/models/hair_scalp_model.h5

### 3. Setup Environment

​
cp backend/.env.example backend/.env

### 4. Jalankan dengan Docker

​
docker-compose up --build

### 5. Buka Aplikasi

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🧪 Cara Pakai Tanpa Docker (Development)

**Backend:**

​
cd backend
python -m venv venv
venvScriptsactivate
pip install -r requirements.txt
uvicorn app.main:app --reload

**Frontend:**

​
cd frontend
npm install
npm run dev

---

## 👩‍💻 Author

**Keira Myeisharinna P. P.**  
**Khansa Amelia A. A.**  
**Regina Avril P. P.**  
Proyek Sains Data — Semester 6

---

## ⚠️ Disclaimer

Dermascalp adalah alat bantu skrining berbasis AI, **bukan pengganti diagnosis medis profesional**. Selalu konsultasikan hasil dengan dokter Sp.KK untuk penanganan definitif.