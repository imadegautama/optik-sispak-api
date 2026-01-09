# Optic Care - Expert System

Sistem pakar diagnosis mata berbasis web menggunakan Flask (Python) + HTML/CSS/JavaScript.

## 🚀 Quick Start

### Development Lokal

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Jalankan aplikasi:

```bash
python app.py
```

3. Buka browser di `http://localhost:5000`

### Docker

1. Build image:

```bash
docker build -t optik-sispak-api .
```

2. Run container:

```bash
docker run -p 5000:5000 optik-sispak-api
```

3. Akses di `http://localhost:5000`

## 📦 Deploy ke Coolify

📖 **[Panduan Lengkap Deployment →](DEPLOYMENT.md)**

### Quick Setup

### Langkah 1: Push ke Git Repository

Pastikan code sudah di push ke repository Git (GitHub/GitLab/Gitea):

```bash
git init
git add .
git commit -m "Initial commit - dockerized optik sispak"
git remote add origin <your-git-repo-url>
git push -u origin main
```

### Langkah 2: Deploy di Coolify

1. Login ke Coolify dashboard
2. Klik **"New Resource"** → **"Application"**
3. Pilih source: **Git Repository**
4. Masukkan URL repository Anda
5. Set **Build Pack**: **Dockerfile**
6. Set **Port**: `5000`
7. Klik **"Deploy"**

Coolify akan otomatis:

- Clone repository
- Build Docker image
- Deploy container
- Generate public URL

### Environment Variables (Optional)

Jika diperlukan di masa depan, tambahkan di Coolify → Settings → Environment Variables:

```
FLASK_ENV=production
PORT=5000
```

## 🏗️ Struktur Project

```
optik-sispak-api/
├── app.py              # Flask backend + API
├── static/
│   ├── index.html      # Frontend UI
│   ├── script.js       # Client-side logic
│   └── style.css       # Styling
├── requirements.txt    # Python dependencies
├── Dockerfile          # Container configuration
├── .dockerignore       # Files to exclude from Docker
└── README.md           # Dokumentasi
```

## 🔧 Tech Stack

- **Backend**: Flask 3.0 + Flask-CORS
- **Server**: Gunicorn (production)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Container**: Docker
- **Deployment**: Coolify / Docker-compatible platforms

## 📝 API Endpoint

### POST /diagnosa

Request:

```json
{
  "gejala": ["G01", "G02", "G17"]
}
```

Response:

```json
{
  "diagnosis": "Konjungtivitis (Mata Merah)",
  "saran": "Infeksi atau alergi. Hindari mengucek mata dan gunakan tetes mata steril.",
  "confidence": 0.85
}
```

## 🩺 Diagnosis Supported

- Glaukoma Akut
- Ablasio Retina
- Katarak
- Konjungtivitis (Mata Merah)
- Dry Eye Syndrome
- Iritasi Mata Kompleks

## ⚠️ Disclaimer

Sistem ini hanya untuk **referensi edukatif**. Selalu konsultasikan dengan dokter mata profesional untuk diagnosis yang akurat.
