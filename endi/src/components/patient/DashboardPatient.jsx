import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUser, FaCrown, FaExclamationTriangle, FaHeartbeat, FaFolderOpen, FaEnvelope, FaClock, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import './DashboardPatient.css';

const DashboardPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.name || 'Utilisateur';

  // Simulations de données pour remplir le dashboard
  const nextAppointment = {
    doctor: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    date: "Demain",
    time: "14:30",
    location: "Centre Médical Saint-Antoine"
  };

  const recentActivity = [
    { id: 1, type: "Ordonnance", desc: "Paracétamol 1000mg", date: "14 Fév", icon: <FaFileAlt /> },
    { id: 2, type: "Analyse", desc: "Prise de sang - Résultat disponible", date: "10 Fév", icon: <FaFileAlt /> },
    { id: 3, type: "Symptôme", desc: "Douleur au dos enregistrée", date: "05 Fév", icon: <FaFileAlt /> }
  ];

  return (
    <div className="dashboard-layout">
      
      {/* Barre latérale pour Laptop */}
      {/* <aside className="sidebar">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon" />
          <h2>SuiviHealth</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><FaHome /> Tableau de bord</button>
          <button className="nav-item" onClick={() => navigate('/consultation')}><FaCalendarAlt /> Consultation</button>
          <button className="nav-item" onClick={() => navigate('/dossier-patient')}><FaFolderOpen /> Dossier Médical</button>
          <button className="nav-item" onClick={() => navigate('/messagerie')}><FaEnvelope /> Messagerie</button>
          <button className="nav-item" onClick={() => navigate('/profil-patient', { state: { name: userName } })}><FaUser /> Paramètres</button>
        </nav>
      </aside> */}

      {/* Contenu principal */}
      <main className="dashboard-main">
        
        

        {/* NOUVELLES CARTES PROFESSIONNELLES (Blanches avec icônes colorées) */}
        <div className="quick-grid">
          
          <div className="pro-card" onClick={() => navigate('/patient/consultation')}>
            <div className="pro-icon icon-blue"><FaCalendarAlt /></div>
            <div className="pro-text">
              <h3>Consultation</h3>
              <p>Prendre RDV</p>
            </div>
          </div>

          <div className="pro-card" onClick={() => navigate('/patient/dossier-medical')}>
            <div className="pro-icon icon-teal"><FaFolderOpen /></div>
            <div className="pro-text">
              <h3>Dossier Médical</h3>
              <p>Voir l'historique</p>
            </div>
          </div>

          <div className="pro-card" onClick={() => navigate('/patient/messagerie')}>
            <div className="pro-icon icon-indigo"><FaEnvelope /></div>
            <div className="pro-text">
              <h3>Messagerie</h3>
              <p>Contacter un médecin</p>
            </div>
          </div>

          <div className="pro-card" onClick={() => navigate('/patient/urgences')}>
            <div className="pro-icon icon-red"><FaExclamationTriangle /></div>
            <div className="pro-text">
              <h3>Urgences</h3>
              <p>Signaler un cas urgent</p>
            </div>
          </div>

        </div>

        {/* SECTION : Prochain Rendez-vous */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Prochain Rendez-vous</h2>
            <button className="see-all-btn" onClick={() => navigate('/patient/rendez-vous')}>Voir tout</button>
          </div>
          <div className="appointment-card">
            <div className="apt-icon"><FaCalendarAlt /></div>
            <div className="apt-info">
              <h3>{nextAppointment.doctor} <span className="apt-spec">{nextAppointment.specialty}</span></h3>
              <p><FaClock /> {nextAppointment.date} à {nextAppointment.time}</p>
              <p><FaMapMarkerAlt /> {nextAppointment.location}</p>
            </div>
            <button className="apt-btn">Détails</button>
          </div>
        </div>

        {/* SECTION : Activité Récente */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Activité Récente</h2>
            <button className="see-all-btn" onClick={() => navigate('/patient/dossier-medical')}>Voir dossier</button>
          </div>
          <div className="activity-list">
            {recentActivity.map(act => (
              <div key={act.id} className="activity-item">
                <div className="act-icon">{act.icon}</div>
                <div className="act-info">
                  <span className="act-type">{act.type}</span>
                  <p>{act.desc}</p>
                </div>
                <span className="act-date">{act.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION : Abonnement (Plus discret) */}
        <div className="premium-banner">
          <div className="prem-info">
            <FaCrown className="prem-icon" />
            <div>
              <h4>Passer en Premium</h4>
              <p>Débloquez les consultations illimitées et le suivi avancé.</p>
            </div>
          </div>
          <button className="btn-premium">DÉCOUVRIR</button>
        </div>

      </main>

      {/* Barre de navigation Mobile */}
      <nav className="bottom-nav">
        <button className="nav-item active"><FaHome /> Accueil</button>
        <button className="nav-item" onClick={() => navigate('/dossier-patient')}><FaFolderOpen /> Dossier</button>
        <button className="nav-item" onClick={() => navigate('/messagerie')}><FaEnvelope /> Messages</button>
        <button className="nav-item" onClick={() => navigate('/consultation')}><FaCalendarAlt /> RDV</button>
        <button className="nav-item" onClick={() => navigate('/profil-patient', { state: { name: userName } })}><FaUser /> Profil</button>
      </nav>

    </div>
  );
};

export default DashboardPatient;