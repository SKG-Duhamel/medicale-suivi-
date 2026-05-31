import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaStethoscope, FaShieldAlt, FaGlobeAfrica, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './LoginMedecin.css';

const LoginMedecin = () => {
  const [rppsOrEmail, setRppsOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // TRÈS IMPORTANT : Initialisation de navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let rawName = rppsOrEmail.includes('@') ? rppsOrEmail.split('@')[0] : rppsOrEmail;
    rawName = rawName.replace(/[._-]/g, ' ');
    rawName = rawName.replace(/[0-9]/g, ''); // Enlève les chiffres du RPPS s'il a tapé son numéro
    
    let finalName = rawName.trim().replace(/\b\w/g, char => char.toUpperCase());
    
    // Si le nom est vide, on met "Médecin" par défaut
    if (!finalName) finalName = "Médecin";

    navigate('/dashboard-medecin', { state: { name: `Dr. ${finalName}` } });
  };

  const handleGoogleLogin = () => {
    console.log('Connexion via Google');
  };

  return (
    <div className="med-login-container">
      <div className="med-login-card">
        
        {/* Bouton Retour */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="med-login-header">
          {/* Logo Principal SuiviHealth */}
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>

          {/* Identité de l'espace */}
          <div className="space-identity">
            <FaStethoscope className="space-icon med-color" />
            <h2>Espace Médecin</h2>
          </div>
          
          <p className="med-subtitle">Accédez à votre espace professionnel</p>
        </div>

        <form onSubmit={handleSubmit} className="med-login-form">
          <div className="med-input-group">
            <label htmlFor="rpps">Numéro RPPS ou Email</label>
            <input
              type="text"
              id="rpps"
              value={rppsOrEmail}
              onChange={(e) => setRppsOrEmail(e.target.value)}
              placeholder="Ex: 10001234567 ou email@exemple.com"
              required
            />
          </div>

          <div className="med-input-group">
            <label htmlFor="med-password">Mot de passe</label>
            <input
              type="password"
              id="med-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="med-btn-primary">
            Se connecter
          </button>
        </form>

        <div className="med-separator">
          <span>OU</span>
        </div>

        {/* Connexion Google */}
        <button className="med-btn-google" onClick={handleGoogleLogin}>
          <FcGoogle className="med-google-icon" />
          Continuer avec Google
        </button>

      </div>

      {/* Pied de page */}
      <footer className="med-footer">
        <div className="med-certifications">
          <div className="med-cert-badge"><FaShieldAlt className="med-cert-icon" /><span>HDS CERTIFIÉ</span></div>
          <div className="med-cert-badge"><FaGlobeAfrica className="med-cert-icon" /><span>CAMEROUN</span></div>
        </div>
        <p className="med-legal-notice">Conformément aux réglementations en vigueur concernant la protection des données de santé.</p>
        <p className="med-copyright">© 2024 SuiviHealth Professional. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default LoginMedecin;