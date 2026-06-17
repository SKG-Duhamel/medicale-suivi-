import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaUser, FaInfoCircle, FaCogs, FaShieldAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import './ProfilSuperAdmin.css';

const ProfilSuperAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saName = location.state?.name || 'Super Admin';

  const handleLogout = () => {
    if(window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      navigate('/accueil-roles');
    }
  };

  return (
    <div className="profil-container sa-profil-container">
      <div className="profil-card sa-profil-card">
        
        <button className="back-btn sa-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="profil-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon sa-logo-color" />
            <h1>SuiviHealth SA</h1>
          </div>
          <h2>Mon Profil</h2>
        </div>

        {/* Avatar et Identité */}
        <div className="profil-identity">
          <div className="profil-avatar sa-avatar">
            <FaUser />
          </div>
          <h3>{saName}</h3>
          <p>Super Administrateur</p>
        </div>

        {/* Menu des paramètres */}
        <div className="profil-menu">
          <div className="menu-section">
            <div className="menu-item" onClick={() => alert('Page Informations Personnelles')}>
              <div className="menu-icon"><FaInfoCircle /></div>
              <span>Informations personnelles</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Paramètres Plateforme')}>
              <div className="menu-icon"><FaCogs /></div>
              <span>Paramètres de la plateforme</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Sécurité')}>
              <div className="menu-icon"><FaShieldAlt /></div>
              <span>Sécurité et confidentialité</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Aide')}>
              <div className="menu-icon"><FaQuestionCircle /></div>
              <span>Aide et support</span>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-item logout" onClick={handleLogout}>
              <div className="menu-icon"><FaSignOutAlt /></div>
              <span>Se déconnecter</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilSuperAdmin;