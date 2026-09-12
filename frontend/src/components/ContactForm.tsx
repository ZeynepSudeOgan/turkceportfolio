import React, { useState } from 'react';
import axios from 'axios';

interface ContactFormProps {
  apiBaseUrl: string;
}

export default function ContactForm({ apiBaseUrl }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setResponseType('error');
      setResponseMessage('Tüm alanlar gerekli!');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${apiBaseUrl}/api/contact`, formData);

      if (response.data.success) {
        setResponseType('success');
        setResponseMessage(response.data.message);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setResponseMessage(''), 5000);
      }
    } catch (error: any) {
      setResponseType('error');
      setResponseMessage(
        error.response?.data?.error || 'Mesaj gönderilemedi. Lütfen tekrar deneyin.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ad */}
        <div className="space-y-2">
          <label className="block font-semibold" style={{ color: '#DCCD8B' }}>
            Adın
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Adını gir"
            className="w-full px-4 py-3 rounded-lg bg-black border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0"
            style={{
              borderColor: '#A7993C',
              '--tw-ring-color': '#A7993C'
            } as any}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block font-semibold" style={{ color: '#DCCD8B' }}>
            Email Adresin
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@email.com"
            className="w-full px-4 py-3 rounded-lg bg-black border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0"
            style={{
              borderColor: '#A7993C',
              '--tw-ring-color': '#A7993C'
            } as any}
          />
        </div>

        {/* Mesaj */}
        <div className="space-y-2">
          <label className="block font-semibold" style={{ color: '#DCCD8B' }}>
            Mesajın
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Bana mesaj gönder..."
            rows={6}
            className="w-full px-4 py-3 rounded-lg bg-black border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none"
            style={{
              borderColor: '#A7993C',
              '--tw-ring-color': '#A7993C'
            } as any}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-semibold transition disabled:opacity-50"
          style={{ background: '#DCCD8B', color: '#1a1a1a' }}
        >
          {isSubmitting ? 'Gönderiliyor...' : '✉️ Gönder'}
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <div
          className="p-4 rounded-lg"
          style={{
            background: responseType === 'success' ? 'rgba(167, 153, 60, 0.2)' : 'rgba(181, 112, 86, 0.2)',
            color: responseType === 'success' ? '#DCCD8B' : '#B57056',
            borderLeft: `4px solid ${responseType === 'success' ? '#A7993C' : '#B57056'}`
          }}
        >
          {responseMessage}
        </div>
      )}

      {/* Contact Info */}
      <div
        className="p-6 rounded-lg border-2 space-y-3"
        style={{ borderColor: '#475480', background: 'rgba(71, 84, 128, 0.1)' }}
      >
        <h3 className="font-bold" style={{ color: '#DCCD8B' }}>
          📍 Diğer İletişim Yolları
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            📧{' '}
            <a
              href="mailto:zeynepsude.ogan@agu.edu.tr"
              style={{ color: '#A7993C' }}
              className="hover:opacity-75"
            >
              zeynepsude.ogan@agu.edu.tr
            </a>
          </p>
          <p>
            📱{' '}
            <a href="tel:+905462965839" style={{ color: '#A7993C' }} className="hover:opacity-75">
              +90 546 296 58 39
            </a>
          </p>
          <p>
            🔗{' '}
            <a
              href="https://linkedin.com/in/zeynep-sude-oğan"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A7993C' }}
              className="hover:opacity-75"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
