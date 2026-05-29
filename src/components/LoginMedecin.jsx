import React, { useState } from 'react';
import { FaStethoscope, FaShieldAlt, FaGlobeAfrica } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Icône Google officielle
import './LoginMedecin.css';

const LoginMedecin = () => {
  const [rppsOrEmail, setRppsOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion Médecin avec:', { rppsOrEmail, password });
    // Logique d'authentification médecin ici
  };

  const handleGoogleLogin = () => {
    console.log('Connexion via Google');
    // Logique OAuth Google ici
  };

  return (
    <div className="med-login-container">
      <div className="med-login-card">
        
        {/* En-tête */}
        <div className="med-login-header">
          <div className="med-logo">
            <FaStethoscope className="med-logo-icon" />
            <h1>Espace Médecin</h1>
          </div>
          <p className="med-subtitle">Accédez à votre espace professionnel</p>
        </div>

        {/* Formulaire */}
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

        {/* Séparateur */}
        <div className="med-separator">
          <span>OU</span>
        </div>

        {/* Connexion Google */}
        <button className="med-btn-google" onClick={handleGoogleLogin}>
          <FcGoogle className="med-google-icon" />
          Continuer avec Google
        </button>

      </div>

      {/* Pied de page avec certifications (comme sur l'image) */}
      <footer className="med-footer">
        <div className="med-certifications">
          <div className="med-cert-badge">
            <FaShieldAlt className="med-cert-icon" />
            <span>HDS CERTIFIÉ</span>
          </div>
          <div className="med-cert-badge">
            <FaGlobeAfrica className="med-cert-icon" />
            <span>CAMEROUN</span>
          </div>
        </div>
        <p className="med-legal-notice">
          Conformément aux réglementations en vigueur concernant la protection des données de santé.
        </p>
        <p className="med-copyright">
          © 2024 SuiviHealth Professional. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default LoginMedecin;