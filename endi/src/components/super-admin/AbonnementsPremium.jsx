import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaCrown, FaCheckCircle, FaTimesCircle, FaArrowUp } from 'react-icons/fa';
import './AbonnementsPremium.css';

const AbonnementsPremium = () => {
  const navigate = useNavigate();
  
  const [subs, setSubs] = useState([
    { id: 1, name: "Centre Médical Saint-Antoine", plan: "Premium", expiry: "15 Déc 2024", price: "100 000 FCFA/mois" },
    { id: 2, name: "Clinique de la Paix", plan: "Standard", expiry: "Illimité (Gratuit)", price: "0 FCFA" },
    { id: 3, name: "Hôpital Régional de Bafoussam", plan: "Premium", expiry: "22 Jan 2025", price: "100 000 FCFA/mois" },
    { id: 4, name: "Polyclinique de Bonapriso", plan: "Standard", expiry: "Illimité (Gratuit)", price: "0 FCFA" }
  ]);

  const premiumCount = subs.filter(s => s.plan === 'Premium').length;
  const standardCount = subs.filter(s => s.plan === 'Standard').length;

  const handleUpgrade = (id) => {
    setSubs(subs.map(sub => sub.id === id ? { ...sub, plan: 'Premium', price: '100 000 FCFA/mois', expiry: '12 mois après paiement' } : sub));
  };

  const handleDowngrade = (id) => {
    if(window.confirm("Passer cet hôpital au plan Standard ? Il perdra l'accès aux fonctionnalités avancées.")) {
      setSubs(subs.map(sub => sub.id === id ? { ...sub, plan: 'Standard', price: '0 FCFA', expiry: 'Illimité (Gratuit)' } : sub));
    }
  };

  return (
    <div className="gestion-container sa-gestion">
      <div className="gestion-card sa-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="gestion-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon sa-logo-color" />
            <h1>SuiviHealth SA</h1>
          </div>
          <h2>Gestion des Abonnements</h2>
        </div>

        {/* Stats Premium */}
        <div className="sub-summary">
          <div className="sub-stat premium-bg">
            <FaCrown className="sub-stat-icon" />
            <div>
              <h3>{premiumCount}</h3>
              <p>Partenaires Premium</p>
            </div>
          </div>
          <div className="sub-stat standard-bg">
            <div>
              <h3>{standardCount}</h3>
              <p>Plans Standards</p>
            </div>
          </div>
        </div>

        {/* Liste des abonnements */}
        <div className="sub-list">
          {subs.map(sub => (
            <div key={sub.id} className={`sub-item ${sub.plan.toLowerCase()}`}>
              <div className="sub-info">
                <h3>{sub.name}</h3>
                <p className="sub-details">Expiration: {sub.expiry} | Tarif: {sub.price}</p>
              </div>
              
              <div className="sub-actions">
                {sub.plan === 'Standard' ? (
                  <button className="btn-upgrade" onClick={() => handleUpgrade(sub.id)}>
                    <FaArrowUp /> Passer Premium
                  </button>
                ) : (
                  <button className="btn-downgrade" onClick={() => handleDowngrade(sub.id)}>
                    <FaTimesCircle /> Rétrograder
                  </button>
                )}
                
                <span className={`sa-plan-badge ${sub.plan === 'Premium' ? 'premium' : 'standard'}`}>
                  {sub.plan === 'Premium' ? <FaCheckCircle /> : <FaTimesCircle />}
                  {sub.plan}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AbonnementsPremium;