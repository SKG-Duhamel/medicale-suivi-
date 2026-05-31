import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaVideo, FaClock, FaUser } from 'react-icons/fa';
import './SalleAttente.css';

const SalleAttente = () => {
  const navigate = useNavigate();

  // Simulation des patients actuellement dans la salle d'attente virtuelle
  const waitingPatients = [
    { id: 1, name: "Marie Lefebvre", waitTime: "5 min", motif: "Suivi diabète", type: "Visio" },
    { id: 2, name: "Sophie Martin", waitTime: "12 min", motif: "Consultation grippale", type: "Visio" }
  ];

  const handleStartConsultation = (patientName) => {
    alert(`Lancement de la visioconférence avec ${patientName}... (À connecter avec Zoom/Teams/WebRTC plus tard)`);
  };

  return (
    <div className="salle-container">
      <div className="salle-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="salle-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <h2>Salle d'attente virtuelle</h2>
          <p className="salle-subtitle">{waitingPatients.length} patient(s) en attente</p>
        </div>

        {waitingPatients.length > 0 ? (
          <div className="waiting-list">
            {waitingPatients.map(patient => (
              <div key={patient.id} className="waiting-item">
                <div className="waiting-avatar">
                  <FaUser />
                </div>
                
                <div className="waiting-info">
                  <h3>{patient.name}</h3>
                  <p className="waiting-motif">{patient.motif}</p>
                  <p className="waiting-time"><FaClock /> En attente depuis {patient.waitTime}</p>
                </div>

                <button className="btn-start-visio" onClick={() => handleStartConsultation(patient.name)}>
                  <FaVideo /> Démarrer la visio
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaClock className="empty-icon" />
            <h3>Aucun patient en attente</h3>
            <p>Les patients connectés pour une visioconférence apparaîtront ici.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SalleAttente;