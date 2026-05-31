import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaStethoscope, FaFilePrescription, FaFlask, FaThermometerHalf } from 'react-icons/fa';
import SymptomModal from './SymptomModal';
import './DossierMedical.css';

const DossierMedical = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('consultations');
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);

  const [symptoms, setSymptoms] = useState([
    { id: 1, desc: "Fatigue et maux de tête", date: "2026-02-12", status: "En attente" },
    { id: 2, desc: "Douleur au dos", date: "2026-02-05", status: "Résolu" }
  ]);

  const consultations = [
    { id: 1, motif: "Grippe", doctor: "Dr. Thomas Dubois", specialty: "Généraliste", date: "2026-02-10", status: "Terminée" }
  ];

  const ordonnances = [
    { id: 1, medoc: "Paracétamol 1000mg", doctor: "Dr. Sophie Martin", date: "2026-02-14", dosage: "3x/jour" },
    { id: 2, medoc: "Aspirine 100mg", doctor: "Dr. Marie Lefebvre", date: "2026-01-28", dosage: "1x/jour" },
    { id: 3, medoc: "Vitamine D3", doctor: "Dr. Thomas Dubois", date: "2026-01-15", dosage: "1x/jour" }
  ];

  const analyses = [
    { id: 1, type: "Prise de sang", date: "2026-02-15", status: "Résultat disponible" }
  ];

  const handleSaveSymptom = (desc) => {
    const newSymptom = {
      id: Date.now(),
      desc: desc,
      date: new Date().toISOString().split('T')[0],
      status: "En attente"
    };
    setSymptoms([newSymptom, ...symptoms]);
  };

  return (
    <div className="dossier-container">
      <div className="dossier-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="dossier-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          
          <div className="dossier-title-row">
            <h2>Dossier Médical</h2>
            <button className="btn-add-symptom" onClick={() => setIsSymptomModalOpen(true)}>
              + Symptômes
            </button>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-item" onClick={() => setActiveTab('consultations')}>
            <FaStethoscope className="summary-icon" />
            <h3>Consultations</h3>
            <p>{consultations.length}</p>
          </div>
          <div className="summary-item" onClick={() => setActiveTab('ordonnances')}>
            <FaFilePrescription className="summary-icon" />
            <h3>Ordonnances</h3>
            <p>{ordonnances.length}</p>
          </div>
          <div className="summary-item" onClick={() => setActiveTab('analyses')}>
            <FaFlask className="summary-icon" />
            <h3>Analyses</h3>
            <p>{analyses.length}</p>
          </div>
          <div className="summary-item" onClick={() => setActiveTab('symptomes')}>
            <FaThermometerHalf className="summary-icon" />
            <h3>Symptômes</h3>
            <p>{symptoms.length}</p>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'consultations' ? 'active' : ''}`} onClick={() => setActiveTab('consultations')}>Consultations</button>
          <button className={`tab-btn ${activeTab === 'ordonnances' ? 'active' : ''}`} onClick={() => setActiveTab('ordonnances')}>Ordonnances</button>
          <button className={`tab-btn ${activeTab === 'analyses' ? 'active' : ''}`} onClick={() => setActiveTab('analyses')}>Analyses</button>
          <button className={`tab-btn ${activeTab === 'symptomes' ? 'active' : ''}`} onClick={() => setActiveTab('symptomes')}>Symptômes</button>
        </div>

        <div className="tab-content">
          {activeTab === 'consultations' && (
            <div className="record-list">
              {consultations.map(c => (
                <div key={c.id} className="record-card">
                  <h4>{c.motif}</h4>
                  <p>{c.doctor} ({c.specialty})</p>
                  <div className="record-meta">
                    <span>{c.date}</span>
                    <span className="badge-terminer">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ordonnances' && (
            <div className="record-list">
              {ordonnances.map(o => (
                <div key={o.id} className="record-card">
                  <h4>{o.medoc}</h4>
                  <p>{o.doctor}</p>
                  <div className="record-meta">
                    <span>{o.date} - {o.dosage}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analyses' && (
            <div className="record-list">
              {analyses.map(a => (
                <div key={a.id} className="record-card">
                  <h4>{a.type}</h4>
                  <div className="record-meta">
                    <span>{a.date}</span>
                    <span className="badge-resultat">{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'symptomes' && (
            <div className="record-list">
              {symptoms.map(s => (
                <div key={s.id} className="record-card">
                  <h4>{s.desc}</h4>
                  <div className="record-meta">
                    <span>{s.date}</span>
                    <span className={`badge-symptom ${s.status === 'Résolu' ? 'resolu' : 'attente'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SymptomModal 
        isOpen={isSymptomModalOpen} 
        onClose={() => setIsSymptomModalOpen(false)} 
        onSave={handleSaveSymptom}
      />
    </div>
  );
};

export default DossierMedical;