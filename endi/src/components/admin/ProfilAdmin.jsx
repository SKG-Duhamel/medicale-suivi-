import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaUser, FaInfoCircle, FaHospital, FaShieldAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './ProfilAdmin.css';

const ProfilAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminName = location.state?.name || 'Admin';

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
            <h1>SuiviHealth Admin</h1>
          </div>
          <h2>Mon Profil</h2>
        </div>

        <div className="profil-identity">
          <div className="profil-avatar admin-avatar">
            <FaUser />
          </div>
          <h3>{adminName}</h3>
          <p>Administrateur</p>
        </div>

        <div className="profil-menu">
          <div className="menu-section">
            <div className="menu-item" onClick={() => alert('Page Informations Personnelles')}>
              <div className="menu-icon"><FaInfoCircle /></div>
              <span>Informations personnelles</span>
            </div>
            <div className="menu-item" onClick={() => alert('Page Établissement')}>
              <div className="menu-icon"><FaHospital /></div>
              <span>Mon établissement</span>
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

export default ProfilAdmin;