import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaStethoscope, FaShieldAlt, FaGlobeAfrica, FaCog, FaTimes, FaUserShield } from 'react-icons/fa';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="welcome-container">
      
      {/* En-tête */}
      <header className="welcome-header">
        <h1>Bienvenue sur <span className="brand">SuiviHealth</span></h1>
        <p className="subtitle">Plateforme professionnelle de santé numérique</p>
      </header>

      {/* Cartes de sélection */}
      <div className="cards-container">
        
        {/* Espace Patient */}
        <div className="role-card">
          <div className="icon-circle patient-icon">
            <FaUserCircle />
          </div>
          <h2>Espace Patient</h2>
          <p>Connectez-vous pour accéder à votre espace santé</p>
          <button className="btn-primary" onClick={() => navigate('/login-patient')}>
            Se connecter
          </button>
        </div>

        {/* Espace Médecin */}
        <div className="role-card">
          <div className="icon-circle doctor-icon">
            <FaStethoscope />
          </div>
          <h2>Espace Médecin</h2>
          <p>Gérez vos consultations en toute simplicité</p>
          <button className="btn-primary" onClick={() => navigate('/login-medecin')}>
            Se connecter
          </button>
        </div>

      </div>

      {/* Pied de page avec certifications */}
      <footer className="welcome-footer">
        <div className="certifications">
          <div className="cert-badge">
            <FaShieldAlt className="cert-icon" />
            <span>HDS CERTIFIÉ</span>
          </div>
          <div className="cert-badge">
            <FaGlobeAfrica className="cert-icon" />
            <span>CAMEROUN</span>
          </div>
        </div>
        <p className="legal-notice">
          Conformément aux réglementations en vigueur concernant la protection des données de santé.
          © {new Date().getFullYear()} SuiviHealth. Tous droits réservés.
        </p>
      </footer>

      {/* Bouton Paramètres en bas à droite */}
      <button className="settings-btn" onClick={() => setShowAdminModal(true)} title="Accès Administrateur">
        <FaCog />
      </button>

      {/* Fenêtre Modale Administrateur */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdminModal(false)}>
              <FaTimes />
            </button>
            
            <div className="modal-header">
              <FaUserShield className="modal-header-icon" />
              <h2>Accès Administrateur</h2>
            </div>

            <div className="modal-body">
              <div className="admin-option" onClick={() => navigate('/login-admin')}>
                <h3>Espace Admin</h3>
                <p>Gestion de la plateforme</p>
              </div>
              
              <div className="admin-option super-admin" onClick={() => navigate('/login-super-admin')}>
                <h3>Espace Super Admin</h3>
                <p>Administration système complète</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Welcome;