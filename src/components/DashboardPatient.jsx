import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUser, FaExclamationTriangle, FaCrown, FaArrowRight, FaHeartbeat, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import './DashboardPatient.css';

const DashboardPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.name || 'Utilisateur';

  return (
    <div className="dashboard-layout">
      
      {/* Barre latérale pour Laptop */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon" />
          <h2>SuiviHealth</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><FaHome /> Accueil</button>
          <button className="nav-item" onClick={() => navigate('/consultation')}><FaCalendarAlt /> Consultation</button>
          <button className="nav-item" onClick={() => navigate('/dossier-patient')}><FaFolderOpen /> Dossier</button>
          <button className="nav-item"><FaEnvelope /> Messages</button>
          <button className="nav-item"><FaUser /> Profil</button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="dashboard-main">
        
        {/* Logo au-dessus de la page sur Mobile */}
        <div className="mobile-top-logo">
          <FaHeartbeat className="app-logo-icon" />
          <span>SuiviHealth</span>
        </div>

        <header className="dashboard-header">
          <div>
            <h1>Bonjour {userName}</h1>
            <p>Votre résumé de santé du jour</p>
          </div>
          <div className="header-icon">
            <FaUser />
          </div>
        </header>

        {/* Cartes d'accès rapide (4 options) */}
        <div className="quick-actions">
          <div className="action-card rdv-card" onClick={() => navigate('/consultation')}>
            <FaCalendarAlt className="action-icon" />
            <span>Consultation</span>
          </div>
          <div className="action-card dossier-card" onClick={() => navigate('/dossier-patient')}>
            <FaFolderOpen className="action-icon" />
            <span>Dossier</span>
          </div>
          <div className="action-card message-card">
            <FaEnvelope className="action-icon" />
            <span>Messagerie</span>
          </div>
          <div className="action-card urgency-card">
            <FaExclamationTriangle className="action-icon" />
            <span>Urgences</span>
          </div>
        </div>

        {/* Abonnement - Texte exact de la maquette */}
        <div className="info-card subscription-card">
          <div className="sub-icon">
            <FaCrown />
          </div>
          <div className="sub-info">
            <h4>Plan Standard</h4>
          </div>
          <button className="btn-premium">
            DÉCOUVRIR LE PREMIUM <FaArrowRight />
          </button>
        </div>

      </main>

      {/* Barre de navigation en bas pour Mobile */}
      <nav className="bottom-nav">
        <button className="nav-item active"><FaHome /> Accueil</button>
        <button className="nav-item" onClick={() => navigate('/dossier-patient')}><FaFolderOpen /> Dossier</button>
        <button className="nav-item"><FaEnvelope /> Messages</button>
        <button className="nav-item" onClick={() => navigate('/consultation')}><FaCalendarAlt /> Consultation</button>
        <button className="nav-item"><FaUser /> Profil</button>
      </nav>

    </div>
  );
};

export default DashboardPatient;