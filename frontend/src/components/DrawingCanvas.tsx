import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FiRotateCcw, FiDownload } from 'react-icons/fi';

interface DrawingCanvasProps {
  apiBaseUrl: string;
  onFlowerAdded: () => void;
}

const colors = [
  { name: 'Altın', hex: '#DCCD8B' },
  { name: 'Yeşil', hex: '#A7993C' },
  { name: 'Mavi', hex: '#475480' },
  { name: 'Turuncu', hex: '#B57056' },
  { name: 'Kahve', hex: '#7F3B25' }
];

export default function DrawingCanvas({ apiBaseUrl, onFlowerAdded }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].hex);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = selectedColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setMessage('');
  };

  const submitFlower = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setIsSubmitting(true);
      const imageData = canvas.toDataURL('image/png');

      const response = await axios.post(`${apiBaseUrl}/api/flowers/detect`, {
        imageData: imageData,
        color: selectedColor
      });

      if (response.data.success) {
        setMessageType('success');
        setMessage(response.data.message);
        onFlowerAdded();
        clearCanvas();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error: any) {
      setMessageType('error');
      setMessage(
        error.response?.data?.error || 'Çiçek kaydedilirken hata oluştu. Lütfen çiçek çizdiğinden emin olun.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `flower-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold mb-4">
          <span style={{ color: '#DCCD8B' }}>🎨 Çiçek Çiz</span>
        </h2>
        <p className="text-gray-400">
          Aşağıdaki canvas'a çiçek çiz. Modelimiz çiçek mi değil mi tespit edecek! 24 saat boyunca portföyde görüntülenecek.
        </p>
      </div>

      {/* Canvas */}
      <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#A7993C' }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          className="w-full bg-black cursor-crosshair"
        />
      </div>

      {/* Color Picker */}
      <div className="space-y-3">
        <p className="font-semibold text-sm text-gray-300">Renk Seçin:</p>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color.hex)}
              className={`w-12 h-12 rounded-lg border-2 transition ${
                selectedColor === color.hex ? 'border-white' : 'border-gray-600'
              }`}
              style={{ background: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition border"
          style={{ borderColor: '#B57056', color: '#B57056' }}
        >
          <FiRotateCcw size={16} /> Temizle
        </button>
        <button
          onClick={downloadDrawing}
          className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition border"
          style={{ borderColor: '#7F3B25', color: '#7F3B25' }}
        >
          <FiDownload size={16} /> İndir
        </button>
        <button
          onClick={submitFlower}
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          style={{ background: '#DCCD8B', color: '#1a1a1a' }}
        >
          {isSubmitting ? 'Kontrol ediliyor...' : '✨ Kaydet'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className="p-4 rounded-lg"
          style={{
            background: messageType === 'success' ? 'rgba(167, 153, 60, 0.2)' : 'rgba(181, 112, 86, 0.2)',
            color: messageType === 'success' ? '#DCCD8B' : '#B57056',
            borderLeft: `4px solid ${messageType === 'success' ? '#A7993C' : '#B57056'}`
          }}
        >
          {message}
        </div>
      )}

      {/* Floating Island */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: '#475480', background: 'rgba(71, 84, 128, 0.1)' }}>
        <p className="text-sm text-gray-300">
          <span style={{ color: '#DCCD8B' }} className="font-bold">💡 İpucu:</span> Çiçek çizdiğinden emin ol! Yaprak, ağaç veya diğer şekiller kabul edilmeyecek.
        </p>
      </div>
    </div>
  );
}
