import React from 'react';

interface Flower {
  _id: string;
  color: string;
}

interface FlowerArchiveProps {
  flowers: Flower[];
  showArchive?: boolean;
}

export default function FlowerArchive({ flowers, showArchive = true }: FlowerArchiveProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold mb-3">
          <span style={{ color: '#DCCD8B' }}>🌸 {showArchive ? 'Arşiv' : 'Son Çiçekler'}</span>
        </h3>
        <p className="text-sm text-gray-400">
          {showArchive 
            ? 'Tüm çizilen çiçeklerin kalıcı kaydı' 
            : 'Son 24 saatte çizilen çiçekler'}
        </p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {flowers && flowers.length > 0 ? (
          flowers.map((flower, idx) => (
            <div
              key={flower._id || idx}
              className="p-3 rounded-lg flex items-center gap-3 border"
              style={{ borderColor: '#A7993C', background: 'rgba(167, 153, 60, 0.1)' }}
            >
              <div
                className="w-8 h-8 rounded-full border-2"
                style={{
                  background: flower.color,
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
              />
              <div className="flex-1">
                <p className="text-sm font-mono text-gray-300">{flower.color}</p>
              </div>
              <span className="text-xs text-gray-500">✓</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Henüz çiçek yok 🌱
          </p>
        )}
      </div>

      {flowers && flowers.length > 0 && (
        <div
          className="p-3 rounded-lg text-sm text-center"
          style={{ background: 'rgba(181, 112, 86, 0.1)', color: '#B57056' }}
        >
          Toplam: <span className="font-bold">{flowers.length}</span> çiçek
        </div>
      )}
    </div>
  );
}
