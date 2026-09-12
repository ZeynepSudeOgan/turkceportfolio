import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiArrowRight
} from 'react-icons/fi';
import DrawingCanvas from './components/DrawingCanvas';
import FlowerArchive from './components/FlowerArchive';
import ContactForm from './components/ContactForm';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface Flower {
  _id: string;
  color: string;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/flowers`);
      setFlowers(res.data);
    } catch (error) {
      console.error('Error fetching flowers:', error);
    }
  };

  const handleFlowerAdded = () => {
    fetchFlowers();
  };

  const projects = [
    {
      title: 'CampusConnect',
      description: 'Üniversite öğrencileri, öğretmenler ve personel için 3 rol tabanlı mobil uygulama',
      tech: ['Flutter', 'Firebase', 'REST API'],
      github: 'https://github.com/ZeynepSudeOgan',
      year: '2026'
    },
    {
      title: 'Local RAG AI Assistant',
      description: 'Offline çalışan doküman soru-cevap sistemi - Microsoft Foundry Local ile geliştirilen',
      tech: ['Python', 'RAG', 'SQLite', 'Streamlit'],
      github: 'https://github.com/ZeynepSudeOgan',
      year: '2026'
    },
    {
      title: 'IAM Policy Auditor',
      description: 'Huawei Cloud IAM politikalarını denetlemek için Python portföy aracı',
      tech: ['Python', 'Cloud Security'],
      github: 'https://github.com/ZeynepSudeOgan',
      year: '2025'
    },
    {
      title: 'Python Siber Güvenlik Projeleri',
      description: 'Paket izleme, DoS tespiti ve firewall filtrelemesi araçları',
      tech: ['Python', 'Scapy', 'Linux', 'iptables'],
      github: 'https://github.com/ZeynepSudeOgan',
      year: '2025'
    }
  ];

  const skills = {
    'Programlama': ['Python', 'Flask', 'Java', 'Dart', 'RISC-V Assembly', 'SQL'],
    'AI/ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'RAG Sistemleri', 'LLM'],
    'Mobil Geliştirme': ['Flutter', 'Android', 'Firebase', 'REST API'],
    'Network/Güvenlik': ['Cisco Packet Tracer', 'Burp Suite', 'Scapy', 'ACL', 'SSH'],
    'Embedded': ['STM32', 'Raspberry Pi'],
    'Diğer': ['Docker', 'Linux', 'Git', 'CI/CD']
  };

  const experience = [
    {
      title: 'Lab Geliştirici',
      company: 'AltaySec',
      period: 'Nisan 2026 - Haziran 2026',
      description: 'Dockerized CTF ve security lab ortamları geliştirme, HTTP trafik analizi, vulnerability testing'
    },
    {
      title: 'Yapay Zeka Stajyeri',
      company: 'Microsoft',
      period: 'Ağustos 2026 - Eylül 2026',
      description: 'Offline RAG sistemi geliştirme, LLM inference optimizasyonu, semantic search implementasyonu'
    },
    {
      title: 'Makine Öğrenmesi Kursu',
      company: 'Acun Medya AcademiQ',
      period: 'Kasım 2025',
      description: 'TensorFlow, PyTorch, Scikit-learn ile regresyon ve sınıflandırma modelleri'
    }
  ];

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: '#ffffff'
    }}>
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-md border-b" style={{
        borderColor: '#A7993C',
        background: 'rgba(26, 26, 26, 0.95)'
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: '#DCCD8B' }}>
            ZSÖ
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['home', 'projects', 'skills', 'flower', 'contact'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="capitalize hover:opacity-75 transition"
                style={{
                  color: activeTab === tab ? '#DCCD8B' : '#ffffff'
                }}
              >
                {tab === 'home' ? 'Anasayfa' : 
                 tab === 'projects' ? 'Projeler' :
                 tab === 'skills' ? 'Yetenekler' :
                 tab === 'flower' ? 'Çiz' : 'İletişim'}
              </button>
            ))}
            <a href="https://github.com/ZeynepSudeOgan" target="_blank" rel="noopener noreferrer">
              <FiGithub size={20} className="hover:opacity-75 transition" />
            </a>
            <a href="https://www.linkedin.com/in/zeynep-sude-oğan" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={20} className="hover:opacity-75 transition" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 p-4 flex flex-col gap-4">
            {['home', 'projects', 'skills', 'flower', 'contact'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMenuOpen(false);
                }}
                className="capitalize text-left py-2"
                style={{
                  color: activeTab === tab ? '#DCCD8B' : '#ffffff'
                }}
              >
                {tab === 'home' ? 'Anasayfa' : 
                 tab === 'projects' ? 'Projeler' :
                 tab === 'skills' ? 'Yetenekler' :
                 tab === 'flower' ? 'Çiz' : 'İletişim'}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-20">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    Merhaba, ben <span style={{ color: '#DCCD8B' }}>Zeynep</span>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Bilgisayar Mühendisi | LLM Security & Cybersecurity Developer
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Yapay zeka modellerini modern mobil mimarilerle birleştirerek; uçtan uca güvenli, yüksek performanslı ve kullanıcı odaklı akıllı sistemler geliştiriyorum.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition"
                      style={{ background: '#DCCD8B', color: '#1a1a1a' }}
                    >
                      İletişim <FiArrowRight />
                    </button>
                    <a
                      href="https://github.com/ZeynepSudeOgan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 border hover:opacity-75 transition"
                      style={{ borderColor: '#A7993C', color: '#DCCD8B' }}
                    >
                      GitHub <FiExternalLink />
                    </a>
                  </div>
                </div>
                <div
                  className="w-full h-80 rounded-lg flex items-center justify-center text-6xl"
                  style={{ background: 'linear-gradient(135deg, #A7993C 0%, #475480 100%)' }}
                >
                  🌸
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="max-w-6xl mx-auto px-4 py-16">
              <h2 className="text-4xl font-bold mb-12">
                <span style={{ color: '#DCCD8B' }}>Deneyim</span>
              </h2>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg border"
                    style={{ borderColor: '#A7993C', background: 'rgba(167, 153, 60, 0.05)' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p style={{ color: '#DCCD8B' }}>{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400">{exp.period}</span>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <section className="max-w-6xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-12">
              <span style={{ color: '#DCCD8B' }}>Projeler</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border hover:shadow-lg transition"
                  style={{ borderColor: '#B57056', background: 'rgba(181, 112, 86, 0.05)' }}
                >
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ background: '#475480', color: '#DCCD8B' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{project.year}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-75 transition"
                      style={{ color: '#DCCD8B' }}
                    >
                      GitHub <FiExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <section className="max-w-6xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-12">
              <span style={{ color: '#DCCD8B' }}>Yetenekler</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items], idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border"
                  style={{ borderColor: '#7F3B25', background: 'rgba(127, 59, 37, 0.05)' }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#B57056' }}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 rounded-lg text-sm font-medium"
                        style={{ background: '#A7993C', color: '#1a1a1a' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FLOWER DRAWING TAB */}
        {activeTab === 'flower' && (
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <DrawingCanvas
                  apiBaseUrl={API_BASE_URL}
                  onFlowerAdded={handleFlowerAdded}
                />
              </div>
              <div>
                <FlowerArchive flowers={flowers} showArchive={false} />
              </div>
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="max-w-2xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span style={{ color: '#DCCD8B' }}>Benimle İletişime Geçin</span>
            </h2>
            <ContactForm apiBaseUrl={API_BASE_URL} />
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-20 py-12" style={{ borderColor: '#A7993C' }}>
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/ZeynepSudeOgan" target="_blank" rel="noopener noreferrer">
              <FiGithub size={24} className="hover:opacity-75 transition" />
            </a>
            <a href="https://www.linkedin.com/in/zeynep-sude-oğan" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={24} className="hover:opacity-75 transition" />
            </a>
            <a href="mailto:zeynepsude.ogan@agu.edu.tr">
              <FiMail size={24} className="hover:opacity-75 transition" />
            </a>
          </div>
          <p>© 2026 Zeynep Sude Oğan. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
