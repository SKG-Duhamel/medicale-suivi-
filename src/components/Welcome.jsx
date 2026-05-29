import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaStethoscope, FaShieldAlt, FaGlobeAfrica } from 'react-icons/fa';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

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
          <button 
            className="btn-primary" 
            onClick={() => navigate('/login-patient')}
          >
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
          <button 
            className="btn-primary" 
            onClick={() => navigate('/login-medecin')} // À créer plus tard si besoin
          >
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
    </div>
  );
};

export default Welcome;