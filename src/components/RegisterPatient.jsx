import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft } from 'react-icons/fa';
import './RegisterPatient.css';

const RegisterPatient = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log('Inscription Patient avec:', { fullName, email, phone, password });
    navigate('/dashboard-patient'); // AJOUT : Redirection vers le dashboard
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* Bouton Retour */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="register-header">
          {/* Logo Principal SuiviHealth */}
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Créer un compte</h2>
          <p className="subtitle">Rejoignez SuiviHealth pour gérer votre santé</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="fullName">Nom complet</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Entrez votre nom"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+237 6 XX XX XX XX"
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
              placeholder="Créez un mot de passe"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            S'inscrire
          </button>
        </form>

        <div className="register-footer">
          <p>
            Déjà un compte ? <Link to="/login-patient">Se connecter</Link>
          </p>
          <p className="privacy">
            En créant un compte, vous acceptez nos <a href="/terms">Conditions d'utilisation</a> et notre <a href="/privacy">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;