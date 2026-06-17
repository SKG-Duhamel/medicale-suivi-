import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaClock, FaVideo, FaFolderOpen, FaMapMarkerAlt } from 'react-icons/fa';
import './ConsultationsMedecin.css';

const ConsultationsMedecin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aujourdhui');

  // Simulations de données
  const consultations = {
    aujourdhui: [
      { id: 1, patient: "Jean-Pierre Dupont", time: "09:00", type: "Cabinet", motif: "Douleur au dos", status: "Terminée" },
      { id: 2, patient: "Marie Lefebvre", time: "10:30", type: "Visioconférence", motif: "Suivi diabète", status: "En cours" },
      { id: 3, patient: "Thomas Dubois", time: "14:00", type: "Cabinet", motif: "Renouvellement ordonnance", status: "En attente" },
      { id: 4, patient: "Sophie Martin", time: "16:30", type: "Visioconférence", motif: "Consultation grippale", status: "En attente" }
    ],
    a_venir: [
      { id: 5, patient: "Lucas Bernard", time: "Demain 09:30", type: "Visioconférence", motif: "Suivi psychologique", status: "Confirmé" },
      { id: 6, patient: "Emma Durand", time: "Demain 11:00", type: "Cabinet", motif: "Contrôle annuel", status: "Confirmé" }
    ],
    passees: [
      { id: 7, patient: "Alice Petit", time: "Hier 14:00", type: "Cabinet", motif: "Vaccination", status: "Terminée" },
      { id: 8, patient: "Hugo Moreau", time: "Hier 16:00", type: "Visioconférence", motif: "Résultats analyse", status: "Terminée" }
    ]
  };

  const getCurrentConsultations = () => {
    return consultations[activeTab] || [];
  };

  return (
    <div className="consult-med-container">
      <div className="consult-med-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="consult-med-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <h2>Consultations</h2>
        </div>

        {/* Onglets de filtre */}
        <div className="consult-tabs">
          <button 
            className={`consult-tab-btn ${activeTab === 'aujourdhui' ? 'active' : ''}`} 
            onClick={() => setActiveTab('aujourdhui')}
          >
            Aujourd'hui
          </button>
          <button 
            className={`consult-tab-btn ${activeTab === 'a_venir' ? 'active' : ''}`} 
            onClick={() => setActiveTab('a_venir')}
          >
            À venir
          </button>
          <button 
            className={`consult-tab-btn ${activeTab === 'passees' ? 'active' : ''}`} 
            onClick={() => setActiveTab('passees')}
          >
            Passées
          </button>
        </div>

        {/* Liste des consultations */}
        <div className="consult-list">
          {getCurrentConsultations().map(consult => (
            <div key={consult.id} className="consult-med-item">
              <div className="consult-med-time">
                <FaClock />
                <span>{consult.time}</span>
              </div>
              
              <div className="consult-med-info">
                <h3>{consult.patient}</h3>
                <p className="consult-motif">{consult.motif}</p>
              </div>

              <div className="consult-med-actions">
                <span className={`consult-type-badge ${consult.type === 'Visioconférence' ? 'visio' : 'cabinet'}`}>
                  {consult.type === 'Visioconférence' ? <FaVideo /> : <FaMapMarkerAlt />}
                  {consult.type === 'Visioconférence' ? 'Visio' : 'Cabinet'}
                </span>

                {consult.status === 'En attente' && consult.type === 'Visioconférence' && (
                  <button className="btn-start-visio">Démarrer</button>
                )}
                
                <button className="btn-view-file" onClick={() => navigate('/dossier-patient')}>
                  <FaFolderOpen />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ConsultationsMedecin;