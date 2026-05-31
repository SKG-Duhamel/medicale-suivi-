import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaShieldAlt, FaArrowRight, FaClock, FaNotesMedical } from 'react-icons/fa';
import './PublicLayout.css';

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="accueil-page">
      
      {/* Hero Section - Image centrée sur le patient/l'usage */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Votre santé, notre priorité</h1>
          <p className="hero-subtitle">
            Prenez le contrôle de votre parcours de santé. Consultez des médecins certifiés, gérez votre dossier médical et prenez rendez-vous en toute simplicité, où que vous soyez.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-hero" onClick={() => navigate('/accueil-roles')}>
              Commencer maintenant <FaArrowRight />
            </button>
            <button className="btn-secondary-hero" onClick={() => navigate('/services')}>
              Découvrir nos services
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
            alt="Patient utilisant la plateforme de téléconsultation" 
            className="hero-image"
          />
        </div>
      </header>

      {/* Section Pourquoi nous choisir (Mise en page splittée) */}
      <section className="home-section why-us">
        <div className="split-layout">
          
        <div className="split-image">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
              alt="Suivi médical et contrôle des signes vitaux" 
            />
          </div>

          <div className="split-content">
            <h2>Pourquoi choisir SuiviHealth ?</h2>
            <p className="section-subtitle" style={{textAlign: 'left'}}>Une expérience patient redéfinie par le numérique</p>
            
            <div className="features-list">
              <div className="feature-item-inline">
                <FaClock className="feature-icon-small" />
                <div>
                  <h3>Gagnez du temps</h3>
                  <p>Réservez votre consultation en ligne en quelques clics, 24h/24 et 7j/7.</p>
                </div>
              </div>
              
              <div className="feature-item-inline">
                <FaVideo className="feature-icon-small" />
                <div>
                  <h3>Téléconsultation sécurisée</h3>
                  <p>Consultez un médecin depuis chez vous par vidéoconférence.</p>
                </div>
              </div>

              <div className="feature-item-inline">
                <FaNotesMedical className="feature-icon-small" />
                <div>
                  <h3>Dossier médical centralisé</h3>
                  <p>Retrouvez votre historique et vos ordonnances dans un espace unique.</p>
                </div>
              </div>

              <div className="feature-item-inline">
                <FaShieldAlt className="feature-icon-small" />
                <div>
                  <h3>Données protégées</h3>
                  <p>Données chiffrées et hébergées sur des serveurs certifiés HDS.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section Statistiques */}
      <section className="home-section stats-section">
        <div className="stat-box">
          <strong>+2 500</strong>
          <span>Patients satisfaits</span>
        </div>
        <div className="stat-box">
          <strong>+150</strong>
          <span>Médecins vérifiés</span>
        </div>
        <div className="stat-box">
          <strong>98%</strong>
          <span>Taux de satisfaction</span>
        </div>
      </section>

      {/* CTA Final */}
      <section className="home-section cta-section">
        <h2>Prêt à prendre soin de votre santé ?</h2>
        <p>Rejoignez SuiviHealth dès aujourd'hui et accédez à une plateforme de santé conçue pour vous.</p>
        <button className="btn-primary-hero" onClick={() => navigate('/register-patient')}>
          Créer mon compte gratuitement <FaArrowRight />
        </button>
      </section>

    </div>
  );
};

export default Accueil;