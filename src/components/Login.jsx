import React, { useState } from 'react';
import { FaHeartbeat } from 'react-icons/fa';    // Icône logo santé
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion en cours avec:', { email, password });
    // Ajoute ici ta logique d'authentification (API, Firebase, etc.)
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* En-tête */}
        <div className="login-header">
          <div className="logo">
            <FaHeartbeat className="logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Content de vous revoir</h2>
          <p className="subtitle">Connectez-vous à votre compte</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse email"
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

          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>

        

        {/* Pied de page */}
        <div className="login-footer">
          <p>
            Pas encore de compte ? <a href="/register">Créer un compte</a>
          </p>
          <p className="privacy">
            En vous connectant, vous acceptez nos <a href="/terms">Conditions d'utilisation</a> et notre <a href="/privacy">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;