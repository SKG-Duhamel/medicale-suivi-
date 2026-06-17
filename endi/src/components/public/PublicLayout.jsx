import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaShieldAlt, FaGlobeAfrica, FaBars, FaTimes } from 'react-icons/fa'; // Ajout de FaBars et FaTimes
import './PublicLayout.css';

const PublicLayout = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // État pour le menu mobile

  // Fonction pour naviguer et fermer le menu en même temps
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="public-layout">
      
      {/* Navbar */}
      <nav className="pub-navbar">
        <div className="pub-nav-logo" onClick={() => handleNavigate('/')}>
          <FaHeartbeat className="pub-logo-icon" />
          <span>SuiviHealth</span>
        </div>
        
        {/* Bouton Hamburger pour mobile */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Liens de navigation (avec classe dynamique pour le menu mobile) */}
        <div className={`pub-nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => handleNavigate('/')}>Accueil</button>
          <button onClick={() => handleNavigate('/services')}>Services</button>
          <button onClick={() => handleNavigate('/a-propos')}>À propos</button>
          <button className="pub-btn-login" onClick={() => handleNavigate('/accueil-roles')}>
            Se connecter
          </button>
        </div>
      </nav>

      {/* Le contenu de la page s'affiche ici */}
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
              <li><button onClick={() => handleNavigate('/')}>Accueil</button></li>
              <li><button onClick={() => handleNavigate('/services')}>Nos services</button></li>
              <li><button onClick={() => handleNavigate('/a-propos')}>Qui sommes-nous</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Espaces</h4>
            <ul>
              <li><button onClick={() => handleNavigate('/login-patient')}>Espace Patient</button></li>
              <li><button onClick={() => handleNavigate('/login-medecin')}>Espace Médecin</button></li>
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