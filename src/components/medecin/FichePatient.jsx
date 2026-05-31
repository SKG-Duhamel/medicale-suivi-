import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaStethoscope, FaFilePrescription, FaFlask, FaThermometerHalf } from 'react-icons/fa';
import './FichePatient.css';

const FichePatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // On récupère le nom du patient transmis lors de la navigation
  const patientName = location.state?.name || 'Patient Inconnu';

  const [activeTab, setActiveTab] = useState('consultations');

  // Données simulées pour ce patient
  const consultations = [
    { id: 1, motif: "Grippe", date: "2024-02-10", status: "Terminée" }
  ];
  const ordonnances = [
    { id: 1, medoc: "Paracétamol 1000mg", date: "2024-02-14", dosage: "3x/jour" }
  ];
  const analyses = [
    { id: 1, type: "Prise de sang", date: "2024-02-15", status: "Résultat disponible" }
  ];
  const symptoms = [
    { id: 1, desc: "Fatigue et maux de tête", date: "2024-02-12", status: "En attente" }
  ];

  return (
    <div className="fiche-container">
      <div className="fiche-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="fiche-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <div className="fiche-patient-identity">
            <h2>Dossier de : {patientName}</h2>
            <p>Historique médical complet</p>
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
    </div>
  );
};

export default FichePatient;