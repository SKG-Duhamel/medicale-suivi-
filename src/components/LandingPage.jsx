import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaVideo, FaShieldAlt, FaUserMd, FaArrowRight } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="nav-logo">
          <FaHeartbeat className="nav-logo-icon" />
          <span>SuiviHealth</span>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">À propos</a>
          <button className="btn-nav-login" onClick={() => navigate('/accueil-roles')}>
            Se connecter
          </button>
        </div>
      </nav>

      {/* Hero Section (La grande bannière) */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Votre santé, notre priorité</h1>
          <p className="hero-subtitle">
            Plateforme professionnelle de santé numérique. Prenez rendez-vous, consultez en ligne et gérez votre dossier médical en toute sécurité.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-hero" onClick={() => navigate('/accueil-roles')}>
              Commencer maintenant <FaArrowRight />
            </button>
            <button className="btn-secondary-hero" onClick={() => navigate('/register-patient')}>
              Créer un compte
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>+500</strong>
              <span>Médecins certifiés</span>
            </div>
            <div className="stat-item">
              <strong>24/7</strong>
              <span>Téléconsultation</span>
            </div>
            <div className="stat-item">
              <strong>HDS</strong>
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card main-card">
            <FaUserMd className="visual-icon" />
            <h3>Dr. Sophie Martin</h3>
            <p>Cardiologue - Disponible</p>
            <button className="btn-visual-rdv">Prendre RDV</button>
          </div>
        </div>
      </header>

      {/* Section Services */}
      <section id="services" className="services-section">
        <h2>Nos Services</h2>
        <p className="section-subtitle">Tout ce dont vous avez besoin pour votre bien-être</p>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><FaVideo /></div>
            <h3>Téléconsultation</h3>
            <p>Consultez un médecin de n'importe où, 24h/24 et 7j/7 depuis votre appareil.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon"><FaUserMd /></div>
            <h3>Rendez-vous au cabinet</h3>
            <p>Trouvez le spécialiste qu'il vous faut et réservez en ligne en un clic.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon"><FaShieldAlt /></div>
            <h3>Dossier Sécurisé</h3>
            <p>Vos données de santé sont chiffrées et certifiées conformément aux normes HDS.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} SuiviHealth Professional. Tous droits réservés.</p>
        <div className="footer-badges">
          <span>HDS CERTIFIÉ</span>
          <span>CAMEROUN 🇨🇲</span>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;