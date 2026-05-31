import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUserShield, FaLock, FaArrowLeft, FaExclamationTriangle, FaKey } from 'react-icons/fa';
import './LoginSuperAdmin.css';

const LoginSuperAdmin = () => {
  const [email, setEmail] = useState('superadmin@suivihealth.cm');
  const [password, setPassword] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion Super Admin avec:', { email, password, code2FA });
    // Logique d'authentification super admin ici
  };

  return (
    <div className="super-login-container">
      <div className="super-login-card">
        
        {/* En-tête Violet */}
        <div className="super-login-header">
          {/* Bouton Retour */}
          <button className="back-btn back-btn-super" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Retour
          </button>

          {/* Logo Principal SuiviHealth (en blanc) */}
          <div className="app-logo app-logo-white">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>

          {/* Identité de l'espace */}
          <div className="space-identity">
            <FaUserShield className="space-icon super-color" />
            <h2>Super Administrateur</h2>
          </div>
          
          <p>Niveau d'accès maximum · Haute sécurité</p>
        </div>

        {/* Avertissement Accès Restreint */}
        <div className="super-notice">
          <FaExclamationTriangle className="super-notice-icon" />
          <div>
            <h4>Accès Restreint</h4>
            <p>Cet espace est strictement réservé au personnel autorisé. Toute tentative d'accès non autorisé est enregistrée et poursuivie.</p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="super-login-form">
          <div className="super-input-group">
            <label htmlFor="super-email">Email Super Administrateur</label>
            <input
              type="email"
              id="super-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="super-input-group">
            <label htmlFor="super-password">Mot de passe principal</label>
            <input
              type="password"
              id="super-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="super-input-group">
            <label htmlFor="super-2fa">Code d'authentification 2FA</label>
            <input
              type="text"
              id="super-2fa"
              value={code2FA}
              onChange={(e) => setCode2FA(e.target.value)}
              placeholder="Code à 6 chiffres"
              required
            />
          </div>

          <button type="submit" className="super-btn-primary">
            <FaKey /> Authentification sécurisée
          </button>
        </form>

        {/* Pied de page sécurisé */}
        <div className="super-security-footer">
          <FaLock className="super-security-icon" />
          <div>
            <p className="super-security-title">Connexion chiffrée de bout en bout</p>
            <p className="super-security-sub">Activité surveillée · IP enregistrée</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSuperAdmin;