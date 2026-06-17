import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaUser, FaInfoCircle, FaShieldAlt, FaBell, FaQuestionCircle, FaSignOutAlt, FaClinicMedical } from 'react-icons/fa';
import './ProfilMedecin.css'; // On réutilise le même CSS, ou on en crée un nouveau

const ProfilMedecin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorName = location.state?.name || 'Docteur';

  const handleLogout = () => {
    if(window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      navigate('/accueil-roles');
    }
  };

  return (
    <div className="profil-container">
      <div className="profil-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="profil-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <h2>Mon Profil</h2>
        </div>

        {/* Avatar et Nom */}
        <div className="profil-identity">
          <div className="profil-avatar">
            <FaUser />
          </div>
          <h3>{doctorName}</h3>
          <p>Médecin</p>
        </div>

        {/* Menu des paramètres spécifiques médecin */}
        <div className="profil-menu">
          <div className="menu-section">
            <div className="menu-item" onClick={() => alert('Page Informations Personnelles')}>
              <div className="menu-icon"><FaInfoCircle /></div>
              <span>Informations professionnelles</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Cabinet')}>
              <div className="menu-icon"><FaClinicMedical /></div>
              <span>Mon cabinet / Établissement</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Sécurité')}>
              <div className="menu-icon"><FaShieldAlt /></div>
              <span>Sécurité et confidentialité</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Notifications')}>
              <div className="menu-icon"><FaBell /></div>
              <span>Notifications</span>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-item" onClick={() => alert('Page Aide')}>
              <div className="menu-icon"><FaQuestionCircle /></div>
              <span>Aide et support</span>
            </div>
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

export default ProfilMedecin;