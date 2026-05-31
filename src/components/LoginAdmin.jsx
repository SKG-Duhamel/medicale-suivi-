import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUserShield, FaLock, FaArrowLeft } from 'react-icons/fa'; // Ajout de FaHeartbeat
import './LoginAdmin.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('admin@suivihealth.cm');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion Admin avec:', { email, password, rememberMe });
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        
        {/* En-tête Orange */}
        <div className="admin-login-header">
          {/* Bouton Retour */}
          <button className="back-btn back-btn-admin" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Retour
          </button>

          {/* Logo Principal SuiviHealth (en blanc) */}
          <div className="app-logo app-logo-white">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>

          {/* Sous-titre spécifique Admin */}
          <div className="space-identity">
            <FaUserShield className="space-icon admin-color" />
            <h2>Espace Administrateur</h2>
          </div>
          
          <p>Accès sécurisé et confidentiel</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="admin-email">Email administrateur</label>
            <input type="email" id="admin-email" onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email" required />
          </div>
          <div className="admin-input-group">
            <label htmlFor="admin-password">Mot de passe</label>
            <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe" required />
          </div>
          <div className="admin-remember-me">
            <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>
          <button type="submit" className="admin-btn-primary">Se connecter</button>
        </form>

        {/* Pied de page sécurisé */}
        <div className="admin-security-footer">
          <FaLock className="admin-security-icon" />
          <div>
            <p className="admin-security-title">Connexion sécurisée</p>
            <p className="admin-security-sub">Connection chiffrée SSL/TLS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;