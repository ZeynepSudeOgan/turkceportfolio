const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zeynep-portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Flower Schema
const flowerSchema = new mongoose.Schema({
  imageData: String, // Base64 encoded image
  color: String, // Renk: #DCCD8B, #A7993C, etc.
  detectionConfidence: Number, // Model confidence
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 saat sonra otomatik sil
  },
  archivedAt: {
    type: Date,
    default: Date.now
  }
});

const Flower = mongoose.model('Flower', flowerSchema);

// Simple Flower Detection (TensorFlow.js Mock - Backend'de gerçek model çalışacak)
async function detectFlower(imageBase64) {
  try {
    // Burada TensorFlow.js model kullanılacak
    // Mock confidence döndür - gerçek modelle değiştirilecek
    const isFlower = Math.random() > 0.3; // %70 şans çiçek
    return {
      isFlower: isFlower,
      confidence: isFlower ? Math.random() * 0.5 + 0.5 : Math.random() * 0.3
    };
  } catch (error) {
    console.error('Detection error:', error);
    return { isFlower: false, confidence: 0 };
  }
}

// Routes

// 1. Çiçek Ekle
app.post('/api/flowers/detect', async (req, res) => {
  try {
    const { imageData, color } = req.body;

    if (!imageData || !color) {
      return res.status(400).json({ error: 'Image ve renk gerekli' });
    }

    // Çiçek tespiti yap
    const detection = await detectFlower(imageData);

    if (!detection.isFlower) {
      return res.status(400).json({ 
        error: 'Lütfen çiçek çizin',
        confidence: detection.confidence 
      });
    }

    // Database'e kaydet
    const flower = new Flower({
      imageData: imageData,
      color: color,
      detectionConfidence: detection.confidence
    });

    await flower.save();

    res.json({
      success: true,
      message: 'Çiçeğin çizimi kaydedildi! 🌸',
      flower: {
        id: flower._id,
        color: flower.color,
        confidence: detection.confidence
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// 2. Tüm Çiçekleri Getir (Son 24 saat)
app.get('/api/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find().select('color -imageData').sort({ createdAt: -1 });
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ error: 'Hata oluştu' });
  }
});

// 3. Arşiv (Tüm Çiçekler)
app.get('/api/flowers/archive', async (req, res) => {
  try {
    const flowers = await Flower.find().select('color -imageData').sort({ archivedAt: -1 });
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ error: 'Hata oluştu' });
  }
});

// 4. İletişim Formu
app.post('/api/contact', [
  body('name').trim().notEmpty().withMessage('Ad gerekli'),
  body('email').isEmail().withMessage('Geçerli email gerekli'),
  body('message').trim().notEmpty().withMessage('Mesaj gerekli')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Email gönder (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Portföyden yeni mesaj: ${name}`,
      html: `
        <h2>Yeni İletişim Mesajı</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ success: true, message: 'Mesajın gönderildi! ✉️' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Mesaj gönderilemedi' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
