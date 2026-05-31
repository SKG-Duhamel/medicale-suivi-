import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUserShield, FaLock, FaArrowLeft, FaExclamationTriangle, FaShieldAlt, FaGlobeAfrica } from 'react-icons/fa';
import './LoginAdmin.css';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let rawName = email.includes('@') ? email.split('@')[0] : email;
    rawName = rawName.replace(/[._-]/g, ' ').replace(/[0-9]/g, '');
    let finalName = rawName.trim().replace(/\b\w/g, char => char.toUpperCase());
    if (!finalName) finalName = "Admin";

    navigate('/dashboard-admin', { state: { name: finalName } });
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        
        <button className="admin-back-btn" onClick={() => navigate('/accueil-roles')}>
          <FaArrowLeft /> Retour
        </button>

        <div className="admin-login-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon admin-icon-color" />
            <h1>SuiviHealth</h1>
          </div>
          <div className="space-identity">
            <FaUserShield className="space-icon admin-color" />
            <h2>Espace Administrateur</h2>
          </div>
          <p>Gestion de votre établissement</p>
        </div>

        <div className="admin-notice">
          <FaExclamationTriangle className="admin-notice-icon" />
          <div>
            <h4>Accès Réservé</h4>
            <p>Cet espace est strictement réservé au personnel administratif de l'établissement. Toute connexion non autorisée est tracée.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="admin-email">Email Administrateur</label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hopital.cm"
              required
            />
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password">Mot de passe</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="admin-remember-me">
            <input
              type="checkbox"
              id="admin-remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="admin-remember">Se souvenir de moi</label>
          </div>

          <button type="submit" className="admin-btn-submit">
            Se connecter
          </button>
        </form>

        <div className="admin-login-footer">
          <div className="admin-certifications">
            <div className="admin-cert-badge"><FaShieldAlt /> HDS CERTIFIÉ</div>
            <div className="admin-cert-badge"><FaGlobeAfrica /> CAMEROUN</div>
          </div>
          <p className="admin-secure-notice">
            <FaLock /> Connexion chiffrée SSL/TLS
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginAdmin;