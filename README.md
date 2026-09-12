# 🌸 Zeynep Sude Oğan - Portfolio Website

Modern, responsive ve interaktif portföy websitesi. CV'ni, projelerini, yeteneklerini paylaşabilir ve ziyaretçiler çiçek çizebilirler!

## ✨ Özellikler

### 📄 Portföy Sayfaları
- **Anasayfa**: Hakkında, deneyim ve hızlı linkler
- **Projeler**: Tüm portfolio projelerini showcase et
- **Yetenekler**: Teknolojiler ve yetkinlikler
- **Çiçek Çizim**: İnteraktif canvas oyunu
- **İletişim**: İletişim formu (Email ile)

### 🎨 Çiçek Çizim Oyunu
- Canvas'ta çiçek çiz (4-5 renk seçeneği)
- AI model çiçek mi değil mi tespit ediyor
- Başarılı çiçekler 24 saat portföyde görüntüleniyor
- Renkler ile arşivleniyorlar

### 🎯 Diğer Özellikler
- ✅ Tamamen responsive (mobil uyumlu)
- ✅ Dark mode tema
- ✅ Profesyonel tasarım
- ✅ GitHub ve LinkedIn entegrasyonu
- ✅ Email bildirimleri

## 🛠️ Teknoloji Stack

### Frontend
- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Axios** - API istekleri
- **Canvas API** - Çizim oyunu

### Backend
- **Node.js + Express** - Server
- **MongoDB** - Veritabanı
- **TensorFlow.js** - Çiçek tespiti (ML)
- **Nodemailer** - Email gönderimi

### Deploy
- **Vercel** - Frontend (Free tier)
- **Render** - Backend (Free tier)
- **MongoDB Atlas** - Veritabanı (Free tier)

## 📁 Proje Yapısı

```
zeynep-portfolio/
├── frontend/                 # React uygulaması
│   ├── src/
│   │   ├── App.tsx          # Ana component
│   │   ├── App.css          # Styling
│   │   └── components/
│   │       ├── DrawingCanvas.tsx
│   │       ├── FlowerArchive.tsx
│   │       └── ContactForm.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env.example
│
├── backend/                  # Express sunucusu
│   ├── server.js            # Ana sunucu
│   ├── package.json
│   ├── Procfile             # Deploy ayarı
│   └── .env.example
│
├── docs/
│   └── SETUP-GUIDE.md       # Kurulum rehberi
│
├── .gitignore
└── README.md                # Bu dosya
```

## 🚀 Hızlı Başlangıç

### Lokal Geliştirme

```bash
# Backend kurulumu
cd backend
npm install
cp .env.example .env
# .env dosyasını kendi değerlerin ile doldur
npm start

# Frontend kurulumu (başka terminal)
cd frontend
npm install
cp .env.example .env
npm start
```

### Deploy Edilmeye Hazır

Detaylı kurulum ve deploy adımları için: `docs/SETUP-GUIDE.md`

## 📝 Konfigürasyon

### Backend Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=gmail-app-password
ADMIN_EMAIL=zeynepsude.ogan@agu.edu.tr
NODE_ENV=development
```

### Frontend Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🎨 Renk Paleti

| Renk | HEX | Kullanım |
|------|-----|----------|
| Altın | `#DCCD8B` | Primary (başlıklar, vurgular) |
| Yeşil-Sarı | `#A7993C` | Secondary (borders, background) |
| Mavi-Gri | `#475480` | Tertiary (accent) |
| Turuncu-Kahve | `#B57056` | Accent (highlight) |
| Koyu Kahve | `#7F3B25` | Dark (footer, text) |

## 🌸 Çiçek Çizim Nasıl Çalışır?

1. **Canvas'ta Çiz**: Renk seçip çiçek çiz
2. **Gönder**: "Kaydet" butonuna tıkla
3. **AI Tespiti**: Backend'teki model çiçek mi değil mi tespit ediyor
4. **Başarı**: Çiçek ise portföyde 24 saat görüntüleniyor
5. **Arşiv**: Tüm çiçekler kalıcı olarak arşivde saklanıyor

## 📞 İletişim Formu

Form aracılığı ile gelen mesajlar doğrudan emailine gönderiliyor:
- Form validasyonu yapılıyor
- Email adresinize bildirim gidiyor
- Spam koruması var

## 🔒 Güvenlik

- ✅ CORS yapılandırması
- ✅ Input validation
- ✅ MongoDB injection koruması
- ✅ Environment variables ile gizli bilgiler

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobil (320px - 767px)

## 🐛 Sorun Giderme

### "Cannot GET /"
Backend sunucusu çalışmıyor. `npm start` ile başlat.

### "CORS Error"
- FRONTEND_URL backend'de doğru ayarlandı mı?
- API URL frontend'de doğru mu?

### "Email gönderilemedi"
- Gmail App Password (16 karakter) kullanıyor musun?
- EMAIL_USER ve EMAIL_PASS doğru mu?

Daha fazla yardım için: `docs/SETUP-GUIDE.md`

## 📊 API Endpoints

### Çiçek Yönetimi
- `POST /api/flowers/detect` - Çiçek ekle ve tespit et
- `GET /api/flowers` - Son 24 saatteki çiçekleri getir
- `GET /api/flowers/archive` - Tüm arşiv çiçeklerini getir

### İletişim
- `POST /api/contact` - Mesaj gönder

### Health Check
- `GET /api/health` - Server sağlığını kontrol et

## 📈 Gelecek Geliştirmeler

- [ ] Çiçek çizim statistikleri
- [ ] Sosyal medya paylaşma
- [ ] Karanlık mod seçeneği
- [ ] Multi-language desteği
- [ ] Blog bölümü
- [ ] Proje filtreleme

## 📄 Lisans

Bu proje açık kaynaktır. İstediğin gibi kullanabilirsin.

## 👤 Hakkında

**Zeynep Sude Oğan**
- 📧 [zeynepsude.ogan@agu.edu.tr](mailto:zeynepsude.ogan@agu.edu.tr)
- 📱 +90 546 296 58 39
- 🔗 [GitHub](https://github.com/ZeynepSudeOgan)
- 🔗 [LinkedIn](https://www.linkedin.com/in/zeynep-sude-oğan)

---

Made with ❤️ in 2026
