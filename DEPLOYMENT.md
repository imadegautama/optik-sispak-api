# 🚀 Panduan Deploy ke Coolify

Panduan lengkap untuk deploy aplikasi Optic Care Expert System ke Coolify dengan auto-deploy dari GitHub.

## 📋 Prerequisites

- ✅ Akun GitHub
- ✅ Akun Coolify (self-hosted atau managed)
- ✅ Repository GitHub (public atau private)

---

## 1️⃣ Setup GitHub Repository

### a. Inisialisasi Git (jika belum)

```bash
cd /Users/imadegautama/Documents/codes/optik-sispak-api
git init
git add .
git commit -m "Initial commit: Dockerized Optic Care Expert System"
```

### b. Buat Repository di GitHub

1. Buka https://github.com/new
2. Nama repository: `optik-sispak-api` (atau nama lain)
3. Pilih **Public** atau **Private**
4. **JANGAN** centang "Initialize with README" (karena sudah ada)
5. Klik **Create repository**

### c. Push ke GitHub

```bash
git remote add origin https://github.com/<username>/optik-sispak-api.git
git branch -M main
git push -u origin main
```

Ganti `<username>` dengan username GitHub Anda.

---

## 2️⃣ Setup Coolify

### a. Login ke Coolify Dashboard

Buka Coolify dashboard Anda (contoh: `https://coolify.yourdomain.com`)

### b. Create New Resource

1. Klik **"+ New"** atau **"New Resource"**
2. Pilih **"Application"**

### c. Select Source

1. **Source Type**: Pilih **"Git Repository"**
2. Klik **"GitHub"** atau **"Public Repository"**

#### Jika Private Repository:

- Klik **"Connect GitHub"**
- Authorize Coolify untuk access GitHub
- Pilih repository `optik-sispak-api`

#### Jika Public Repository:

- Masukkan URL: `https://github.com/<username>/optik-sispak-api`

### d. Configure Build

1. **Branch**: `main` (atau branch yang diinginkan)
2. **Build Pack**: Pilih **"Dockerfile"**
3. **Dockerfile Location**: `./Dockerfile` (default)
4. **Port**: `5000`

### e. Domain Configuration (Optional)

Jika punya domain sendiri:

- **Domain**: `optik.yourdomain.com`
- Atau gunakan domain default dari Coolify

### f. Environment Variables (Optional)

Untuk aplikasi ini tidak ada environment variables yang required, tapi jika nanti ada bisa ditambahkan di:

- Settings → Environment Variables

### g. Deploy Settings

1. ✅ **Auto Deploy**: Enable (untuk auto-deploy on push)
2. **Build Command**: (kosongkan, karena menggunakan Dockerfile)
3. **Start Command**: (kosongkan, karena sudah di-define di Dockerfile)

### h. Deploy!

Klik **"Deploy"** atau **"Save & Deploy"**

---

## 3️⃣ Monitoring Deployment

### a. Build Logs

Coolify akan menampilkan logs real-time:

```
[Building] Cloning repository...
[Building] Building Docker image...
[Building] Step 1/6 : FROM python:3.11-slim
...
[Building] Successfully built image
[Deploying] Starting container...
[Success] Application is live!
```

### b. Check Application

Setelah deployment selesai:

1. Buka URL yang diberikan Coolify
2. Verifikasi halaman loading dengan styling yang benar
3. Test diagnosis feature

---

## 4️⃣ Auto-Deploy on Push

Setelah setup selesai, setiap kali push ke GitHub:

```bash
# Edit code
git add .
git commit -m "Update feature"
git push
```

Coolify akan **automatically**:

1. Detect push event
2. Clone repository
3. Build Docker image
4. Deploy new container
5. Replace old container

---

## 5️⃣ Useful Coolify Commands

### Restart Application

Di Coolify dashboard → **Restart**

### View Logs

Di Coolify dashboard → **Logs** tab

### Rebuild & Redeploy

Di Coolify dashboard → **Redeploy**

### Stop Application

Di Coolify dashboard → **Stop**

---

## 🔧 Troubleshooting

### Build Failed

**Cek logs** untuk error message. Common issues:

- Dockerfile syntax error → Fix di repository
- Missing dependencies → Update `requirements.txt`
- Port conflict → Change port di Coolify settings

### Application Not Accessible

1. Check container status di Coolify
2. Verify port settings (should be `5000`)
3. Check domain/URL configuration
4. View application logs

### CSS/JS Not Loading

Sudah fixed dengan explicit routes di `app.py`. Jika masih ada issue:

1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Check network tab di browser DevTools

---

## 📊 Deployment Architecture

```
GitHub Repository (main branch)
         ↓
     (git push)
         ↓
   Coolify Webhook
         ↓
   Clone & Build
         ↓
  Docker Container
         ↓
    Public URL
```

---

## 🔐 Security Best Practices

### 1. Use Environment Variables

Jika ada sensitive data (API keys, database credentials):

```bash
# Tambahkan di Coolify → Settings → Environment Variables
FLASK_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://...
```

### 2. HTTPS

Coolify automatically provides SSL certificates via Let's Encrypt jika menggunakan custom domain.

### 3. Rate Limiting

Pertimbangkan menambahkan rate limiting untuk production:

```python
from flask_limiter import Limiter

limiter = Limiter(app, key_func=get_remote_address)
```

---

## 📝 Next Steps

Setelah deploy berhasil:

1. ✅ Test semua fitur diagnosis
2. ✅ Monitor resource usage di Coolify
3. ✅ Setup custom domain (optional)
4. ✅ Enable monitoring & alerts
5. ✅ Backup database (jika ada)

---

## 🆘 Need Help?

- **Coolify Documentation**: https://coolify.io/docs
- **GitHub Issues**: Create issue di repository
- **Coolify Discord**: Join community untuk support

---

## ✨ Congratulations!

Aplikasi Optic Care Expert System Anda sekarang live dan accessible ke public! 🎉
