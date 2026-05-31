import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaVideo, FaFolderOpen, FaUserFriends, FaClock, FaUser, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';
import './DashboardMedecin.css';

const DashboardMedecin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorName = location.state?.name || 'Docteur';

  // Simulation des consultations du jour
  const todayConsultations = [
    { id: 1, patient: "Jean-Pierre Dupont", time: "09:00", type: "Cabinet", motif: "Douleur au dos" },
    { id: 2, patient: "Marie Lefebvre", time: "10:30", type: "Visioconférence", motif: "Suivi diabète" },
    { id: 3, patient: "Thomas Dubois", time: "14:00", type: "Cabinet", motif: "Renouvellement ordonnance" },
    { id: 4, patient: "Sophie Martin", time: "16:30", type: "Visioconférence", motif: "Consultation grippale" }
  ];

  return (
    <div className="dashboard-layout">
      
      {/* Barre latérale pour Laptop */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon" />
          <h2>SuiviHealth</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><FaHome /> Tableau de bord</button>
          <button className="nav-item" onClick={() => navigate('/consultations-medecin')}><FaCalendarCheck /> Consultations</button>
          <button className="nav-item" onClick={() => navigate('/urgences-medecin')}><FaClock /> Urgence</button>
          <button className="nav-item" onClick={() => navigate('/dossier-medecin')}><FaFolderOpen /> Dossiers Médicaux</button>
          <button className="nav-item" onClick={() => navigate('/profil-medecin', { state: { name: doctorName } })}><FaUser /> Mon Profil</button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="dashboard-main">
        
        <div className="mobile-top-logo">
          <FaHeartbeat className="app-logo-icon" />
          <span>SuiviHealth Pro</span>
        </div>

        <header className="dashboard-header">
          <div>
            <h1>Bonjour {doctorName}</h1>
            <p>Votre programme de consultations du jour</p>
          </div>
          <div className="header-icon" onClick={() => navigate('/profil-medecin', { state: { name: doctorName } })}>
            <FaUser />
          </div>
        </header>

        {/* Cartes d'accès rapide Médecin */}
        <div className="quick-grid">
          
        <div className="pro-card" onClick={() => navigate('/salle-attente')}>
            <div className="pro-icon icon-blue"><FaVideo /></div>
            <div className="pro-text">
              <h3>Salle d'attente</h3>
              <p>Patients en ligne</p>
            </div>
          </div>

          <div className="pro-card" onClick={() => navigate('/consultations-medecin')}>
            <div className="pro-icon icon-teal"><FaCalendarCheck /></div>
            <div className="pro-text">
              <h3>Planning</h3>
              <p>Voir les consultations</p>
            </div>
          </div>
          
          <div className="pro-card" onClick={() => navigate('/dossier-medecin')}>
            <div className="pro-icon icon-indigo"><FaFolderOpen /></div>
            <div className="pro-text">
            <h3>Dossiers</h3>
            <p>Rechercher un patient</p>
            </div>
          </div>

          <div className="pro-card" onClick={() => navigate('/urgences-medecin')}>
            <div className="pro-icon icon-red"><FaClock /></div>
            <div className="pro-text">
              <h3>Urgences</h3>
              <p>Alertes IA en cours</p>
            </div>
          </div>

        </div>

        {/* Section : Consultations du jour */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Consultations d'aujourd'hui</h2>
            <button className="see-all-btn">Voir tout le planning</button>
          </div>
          <div className="activity-list">
            {todayConsultations.map(consult => (
              <div key={consult.id} className="activity-item consult-item">
                <div className="consult-time">
                  <FaClock />
                  <span>{consult.time}</span>
                </div>
                <div className="act-info">
                  <h4>{consult.patient}</h4>
                  <p>{consult.motif}</p>
                </div>
                <span className={`consult-type ${consult.type === 'Visioconférence' ? 'type-visio' : 'type-cabinet'}`}>
                  {consult.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Barre de navigation Mobile (CORRIGÉE AVEC DOSSIER) */}
            {/* Barre de navigation Mobile */}
      <nav className="bottom-nav">
        <button className="nav-item active"><FaHome /> Accueil</button>
        <button className="nav-item" onClick={() => navigate('/consultations-medecin')}><FaCalendarCheck /> Planning</button>
        <button className="nav-item" onClick={() => navigate('/dossier-medecin')}><FaFolderOpen /> Dossier</button>
        <button className="nav-item" onClick={() => navigate('/urgences-medecin')}><FaClock /> Urgence</button>
        <button className="nav-item" onClick={() => navigate('/profil-medecin', { state: { name: doctorName } })}><FaUser /> Profil</button>
      </nav>

    </div>
  );
};

export default DashboardMedecin;