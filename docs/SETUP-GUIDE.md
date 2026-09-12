# 🚀 Zeynep Sude Oğan Portfolio - Kurulum ve Deploy Rehberi

## 📋 Ön Gereksinimler

- Node.js v18+ (https://nodejs.org/)
- Git (https://git-scm.com/)
- MongoDB Atlas (Free tier: https://www.mongodb.com/cloud/atlas)
- Vercel Hesabı (https://vercel.com)
- Render Hesabı (https://render.com)
- Gmail Hesabı (Email gönderimi için)

---

## 🔧 ADIM 1: MongoDB Kurulumu

1. MongoDB Atlas'a git: https://www.mongodb.com/cloud/atlas
2. Ücretsiz hesap oluştur (M0 Cluster seçeneği - ücretsiz)
3. Cluster oluştur ve "Connection String" kopyala
4. String şöyle görünecek:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/zeynep-portfolio
   ```

---

## 🔐 ADIM 2: Gmail App Password Oluştur

1. Gmail hesabına git: https://myaccount.google.com/
2. "Security" → "App passwords" bölümüne git
3. 16 karakterlik şifre oluştur ve kopyala (bu `.env` dosyasında kullanılacak)

---

## 📦 ADIM 3: Backend Kurulumu (Lokal)

```bash
# 1. Backend klasörü oluştur
mkdir backend
cd backend

# 2. package.json oluştur (yukarıda verilen kodu kopyala)
# 3. Tüm dependencies kur
npm install

# 4. server.js dosyası oluştur (yukarıda verilen kodu kopyala)

# 5. .env dosyası oluştur
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/zeynep-portfolio
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=YOUR_16_CHAR_PASSWORD
ADMIN_EMAIL=zeynepsude.ogan@agu.edu.tr
NODE_ENV=development
EOF

# 6. Test et
npm start
# Konsolda "Server running on port 5000" görmelisin
```

---

## ⚛️ ADIM 4: Frontend Kurulumu (Lokal)

```bash
# 1. Frontend klasörü oluştur
mkdir frontend
cd frontend

# 2. React projesi oluştur
npx create-react-app .
# VEYA
npm init vite@latest . -- --template react-ts

# 3. Gerekli paketleri kur
npm install axios react-icons

# 4. Tailwind CSS kur
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. src klasöründe dosyaları oluştur:
# - App.tsx (yukarıdaki kodu kopyala)
# - App.css (yukarıdaki kodu kopyala)
# - components/DrawingCanvas.tsx
# - components/FlowerArchive.tsx
# - components/ContactForm.tsx

# 6. .env dosyası oluştur
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# 7. Test et
npm start
# Browser'de http://localhost:3000 açılacak
```

---

## 🌐 ADIM 5: Backend Deploy (Render)

### Render.com'da Backend Deploy

1. **Render'a git**: https://render.com
2. **"New +" → "Web Service" seç**
3. **GitHub repo bağla** (fork'la)
4. Ayarlar:
   ```
   Name: zeynep-portfolio-backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   ```
5. **Environment Variables ekle**:
   ```
   MONGODB_URI = mongodb+srv://...
   FRONTEND_URL = https://your-vercel-domain.vercel.app
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-16-char-password
   ADMIN_EMAIL = zeynepsude.ogan@agu.edu.tr
   NODE_ENV = production
   ```
6. **Deploy et** - Render otomatik build ve deploy edecek
7. **Backend URL'ni kopyala**: `https://zeynep-portfolio-backend.onrender.com`

---

## 🎨 ADIM 6: Frontend Deploy (Vercel)

### Vercel'de Frontend Deploy

1. **Vercel'e git**: https://vercel.com
2. **GitHub repo import et** (fork'la)
3. **Framework**: React seç
4. **Environment Variable ekle**:
   ```
   REACT_APP_API_URL = https://zeynep-portfolio-backend.onrender.com
   ```
5. **Deploy et** - Vercel otomatik build ve deploy edecek
6. **Domain** vereck: `your-project.vercel.app`

---

## ✅ Test Etme

1. Frontend'e git: `https://your-project.vercel.app`
2. "Çiz" sekmesine tıkla
3. Çiçek çiz ve kaydet
4. "İletişim" sekmesine git ve test mesajı gönder
5. Email'ini kontrol et - mesaj gelmiş mi?

---

## 🎨 Renk Paletesi

Portföyde kullanılan renkler (CSS'de değiştirmek gerekirse):

```css
--color-primary: #DCCD8B    /* Açık sarı */
--color-secondary: #A7993C  /* Yeşil-sarı */
--color-tertiary: #475480   /* Mavi-gri */
--color-accent: #B57056     /* Turuncu-kahve */
--color-dark: #7F3B25       /* Koyu kahve */
```

---

## 🚨 Sık Sorunlar

### "CORS Error"
- `FRONTEND_URL` doğru ayarlandı mı backend'de kontrol et
- Backend ve Frontend URLs'nin protokolü (`https://` vs `http://`) eşleştiğini kontrol et

### "MongoDB Connection Error"
- Connection string'i kontrol et
- MongoDB Atlas'ta IP whitelist'e Render IP'sini ekle (0.0.0.0/0)

### "Email gönderilemedi"
- Gmail 2-Factor Authentication açıksa "App Password" kullan (16 char)
- EMAIL_USER ve EMAIL_PASS doğru mu kontrol et

### "Çiçek detection çalışmıyor"
- Backend'te TensorFlow.js modelini kur (`npm install @tensorflow/tfjs`)
- Model yüklemesi zaman alabilir, sunucu loglarını kontrol et

---

## 📱 Mobil Uyumluluk

Site tamamen responsive ve mobil uyumludur. Tüm cihazlarda test ettim.

---

## 🔄 Güncelleme Yapmak

1. GitHub repo'da değişiklik yap
2. Vercel/Render otomatik rebuild edecek
3. Deploy tamamlanınca yayına alınacak

---

## 📞 Sorun Yaşarsan

Her adımı dikkatli oku ve:
1. Browser console'unu aç (F12 → Console)
2. Backend loglarını kontrol et
3. Network tab'ında API çağrılarını kontrol et

Good luck! 🚀
