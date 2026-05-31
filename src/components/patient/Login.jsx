import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Changé pour un nom d'utilisateur générique
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Prendre la partie avant le @ si c'est un email
    let rawName = username.includes('@') ? username.split('@')[0] : username;
    
    // 2. Remplacer les . _ - par des espaces
    rawName = rawName.replace(/[._-]/g, ' ');
    
    // 3. Supprimer tous les chiffres
    rawName = rawName.replace(/[0-9]/g, '');
    
    // 4. Mettre une majuscule à chaque mot et nettoyer les espaces
    let finalName = rawName.trim().replace(/\b\w/g, char => char.toUpperCase());
    
    // 5. Si le nom est vide (ex: username était "123@..."), on met un nom par défaut
    if (!finalName) finalName = "Utilisateur";

    navigate('/dashboard-patient', { state: { name: finalName } });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="login-header">
          <div className="logo">
            <FaHeartbeat className="logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Content de vous revoir</h2>
          <p className="subtitle">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Nom d'utilisateur ou Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: jpierre ou jean@email.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Se connecter</button>
        </form>

        <div className="login-footer">
          <p>Pas encore de compte ? <Link to="/register-patient">Créer un compte</Link></p>
          <p className="privacy">En vous connectant, vous acceptez nos <a href="/terms">Conditions d'utilisation</a> et notre <a href="/privacy">Politique de confidentialité</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;