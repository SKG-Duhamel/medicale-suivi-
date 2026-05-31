import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUserShield, FaLock, FaArrowLeft } from 'react-icons/fa';
import './LoginSuperAdmin.css';

const LoginSuperAdmin = () => {
  const [email, setEmail] = useState(''); // Plus de valeur par défaut
  const [password, setPassword] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logique pour extraire le nom
    let rawName = email.includes('@') ? email.split('@')[0] : email;
    rawName = rawName.replace(/[._-]/g, ' ').replace(/[0-9]/g, '');
    let finalName = rawName.trim().replace(/\b\w/g, char => char.toUpperCase());
    if (!finalName) finalName = "Super Admin";

    navigate('/dashboard-super-admin', { state: { name: finalName } });
  };

  return (
    <div className="sa-login-container">
      <div className="sa-login-card">
        
        <button className="back-btn" onClick={() => navigate('/accueil-roles')}>
          <FaArrowLeft /> Retour
        </button>

        <div className="sa-login-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <div className="space-identity">
            <FaUserShield className="space-icon sa-color" />
            <h2>Super Administrateur</h2>
          </div>
          <p>Niveau d'accès maximum · Haute sécurité</p>
        </div>

        <div className="sa-notice">
          <FaLock className="sa-notice-icon" />
          <div>
            <h4>Accès Restreint</h4>
            <p>Cet espace est strictement réservé à la direction de la plateforme. Toute tentative d'accès non autorisé est enregistrée et poursuivie.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="sa-login-form">
          <div className="sa-input-group">
            <label htmlFor="sa-email">Email Super Administrateur</label>
            <input
              type="email"
              id="sa-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="superadmin@suivihealth.cm" // Simple placeholder
              required
            />
          </div>

          <div className="sa-input-group">
            <label htmlFor="sa-password">Mot de passe principal</label>
            <input
              type="password"
              id="sa-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="sa-input-group">
            <label htmlFor="sa-2fa">Code d'authentification 2FA</label>
            <input
              type="text"
              id="sa-2fa"
              value={code2FA}
              onChange={(e) => setCode2FA(e.target.value)}
              placeholder="Code à 6 chiffres"
              required
            />
          </div>

          <button type="submit" className="sa-btn-primary">
            Authentification sécurisée
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSuperAdmin;