import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaExclamationTriangle, FaClock, FaUser } from 'react-icons/fa';
import './UrgencesMedecin.css';

const UrgencesMedecin = () => {
  const navigate = useNavigate();

  // Simulation des alertes critiques reçues de l'IA
  const urgentAlerts = [
    { id: 1, patient: "Jean-Pierre Dupont", time: "Il y a 2 min", desc: "Douleurs thoraciques intenses et difficultés respiratoires signalées par l'IA.", severity: "Critique" },
    { id: 2, patient: "Lucas Bernard", time: "Il y a 15 min", desc: "Taux de glycémie anormalement bas détecté, risque de malaise.", severity: "Élevée" }
  ];

  return (
    <div className="urg-med-container">
      <div className="urg-med-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="urg-med-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <h2>Centre d'Urgences</h2>
          <p className="urg-subtitle">Alertes générées par le Triage IA</p>
        </div>

        <div className="urg-list">
          {urgentAlerts.map(alert => (
            <div key={alert.id} className={`urg-item ${alert.severity === 'Critique' ? 'critical' : 'high'}`}>
              <div className="urg-severity-icon">
                <FaExclamationTriangle />
              </div>
              
              <div className="urg-info">
                <div className="urg-top-row">
                  <h3>{alert.patient}</h3>
                  <span className={`urg-badge ${alert.severity === 'Critique' ? 'badge-critical' : 'badge-high'}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="urg-desc">{alert.desc}</p>
                <p className="urg-time"><FaClock /> {alert.time}</p>
              </div>

              <div className="urg-actions">
                <button className="btn-take-charge">Prendre en charge</button>
                <button className="btn-view-patient"><FaUser /> Voir dossier</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UrgencesMedecin;