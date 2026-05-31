import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaShieldAlt, FaGlobeAfrica } from 'react-icons/fa';
import './PublicLayout.css';

const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="public-layout">
      {/* Navbar */}
      <nav className="pub-navbar">
        <div className="pub-nav-logo" onClick={() => navigate('/')}>
          <FaHeartbeat className="pub-logo-icon" />
          <span>SuiviHealth</span>
        </div>
        <div className="pub-nav-links">
          <button onClick={() => navigate('/')}>Accueil</button>
          <button onClick={() => navigate('/services')}>Services</button>
          <button onClick={() => navigate('/a-propos')}>À propos</button>
          <button className="pub-btn-login" onClick={() => navigate('/accueil-roles')}>
            Se connecter
          </button>
        </div>
      </nav>

      {/* Le contenu de la page (Accueil, Services, etc.) s'affiche ici */}
      <main className="pub-main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="pub-footer">
        <div className="footer-top">
          <div className="footer-col">
            <h3><FaHeartbeat /> SuiviHealth</h3>
            <p>La plateforme de santé numérique qui vous simplifie la vie. Consultez, gérez votre dossier et prenez rendez-vous en toute sécurité.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><button onClick={() => navigate('/')}>Accueil</button></li>
              <li><button onClick={() => navigate('/services')}>Nos services</button></li>
              <li><button onClick={() => navigate('/a-propos')}>Qui sommes-nous</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Espaces</h4>
            <ul>
              <li><button onClick={() => navigate('/login-patient')}>Espace Patient</button></li>
              <li><button onClick={() => navigate('/login-medecin')}>Espace Médecin</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="certifications">
            <div className="cert-badge"><FaShieldAlt /> HDS CERTIFIÉ</div>
            <div className="cert-badge"><FaGlobeAfrica /> CAMEROUN</div>
          </div>
          <p>© {new Date().getFullYear()} SuiviHealth Professional. Tous droits réservés. Conformément aux réglementations en vigueur.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;