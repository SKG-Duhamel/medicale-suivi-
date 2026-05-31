import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaExclamationTriangle, FaClock, FaCheckCircle, FaUser } from 'react-icons/fa';
import './AdminUrgences.css';

const AdminUrgences = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('actives'); // 'actives' ou 'resolues'

  // Données simulées des alertes d'urgence de l'hôpital
  const [alerts, setAlerts] = useState([
    { id: 1, patient: "Jean-Pierre Dupont", time: "Il y a 5 min", desc: "Douleurs thoraciques intenses et difficultés respiratoires signalées par l'IA.", severity: "Critique", status: "Active", handledBy: null },
    { id: 2, patient: "Lucas Bernard", time: "Il y a 20 min", desc: "Taux de glycémie anormalement bas détecté, risque de malaise.", severity: "Élevée", status: "Active", handledBy: "Dr. Dubois" },
    { id: 3, patient: "Alice Petit", time: "Il y a 1h", desc: "Chute détectée via capteurs, patient non relevé.", severity: "Critique", status: "Résolue", handledBy: "Dr. Martin" },
    { id: 4, patient: "Emma Durand", time: "Il y a 2h", desc: "Douleurs abdominales aiguës persistantes.", severity: "Moyenne", status: "Résolue", handledBy: "Dr. Lefebvre" }
  ]);

  const filteredAlerts = alerts.filter(alert => 
    filterStatus === 'actives' ? alert.status === 'Active' : alert.status === 'Résolue'
  );

  const activeCount = alerts.filter(a => a.status === 'Active').length;
  const resolvedCount = alerts.filter(a => a.status === 'Résolue').length;

  // Marquer une alerte comme résolue
  const handleResolve = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'Résolue', handledBy: 'Admin' } : alert
    ));
  };

  return (
    <div className="gestion-container">
      <div className="gestion-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="gestion-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Admin</h1>
          </div>
          <h2>Centre des Urgences</h2>
        </div>

        {/* Cartes de synthèse */}
        <div className="urg-admin-summary">
          <div className="urg-stat-card critical">
            <FaExclamationTriangle />
            <div>
              <h3>{activeCount}</h3>
              <p>Alertes actives</p>
            </div>
          </div>
          <div className="urg-stat-card resolved">
            <FaCheckCircle />
            <div>
              <h3>{resolvedCount}</h3>
              <p>Alertes résolues</p>
            </div>
          </div>
        </div>

        {/* Onglets de filtre */}
        <div className="urg-tabs">
          <button 
            className={`urg-tab-btn ${filterStatus === 'actives' ? 'active' : ''}`} 
            onClick={() => setFilterStatus('actives')}
          >
            Alertes actives
          </button>
          <button 
            className={`urg-tab-btn ${filterStatus === 'resolues' ? 'active resolved' : ''}`} 
            onClick={() => setFilterStatus('resolues')}
          >
            Alertes résolues
          </button>
        </div>

        {/* Liste des alertes */}
        <div className="urg-admin-list">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <div key={alert.id} className={`urg-admin-item ${alert.severity.toLowerCase()}`}>
                <div className="urg-severity-badge">
                  <FaExclamationTriangle />
                  <span>{alert.severity}</span>
                </div>

                <div className="urg-admin-info">
                  <h3>{alert.patient}</h3>
                  <p className="urg-desc">{alert.desc}</p>
                  <div className="urg-meta">
                    <span className="urg-time"><FaClock /> {alert.time}</span>
                    {alert.handledBy && (
                      <span className="urg-handler"><FaUser /> Pris en charge par : {alert.handledBy}</span>
                    )}
                  </div>
                </div>

                <div className="urg-admin-actions">
                  {alert.status === 'Active' && (
                    <>
                      <button className="btn-resolve" onClick={() => handleResolve(alert.id)}>
                        <FaCheckCircle /> Résoudre
                      </button>
                      <button className="btn-view-patient" onClick={() => navigate('/fiche-patient', { state: { name: alert.patient } })}>
                        Voir dossier
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aucune alerte {filterStatus === 'actives' ? 'active' : 'résolue'} pour le moment.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminUrgences;