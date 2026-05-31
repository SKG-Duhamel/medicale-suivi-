import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaUserMd, FaAward } from 'react-icons/fa';
import './Consultation.css';

const Consultation = () => {
  const navigate = useNavigate(); 

  return (
    <div className="consultation-container">
      <div className="consultation-card">
        
        {/* Bouton Retour */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="consultation-header">
          {/* Logo Principal SuiviHealth */}
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Nouvelle Consultation</h2>
          <p className="subtitle">Quel type de consultation ?</p>
        </div>

        <div className="consultation-options">
          
          {/* Option Généraliste */}
          <div className="option-card" onClick={() => navigate('/generalistes')}>
            <div className="option-icon general-icon">
              <FaUserMd />
            </div>
            <div className="option-info">
              <h3>Généraliste</h3>
              <p className="option-desc">Consultations courantes</p>
              <p className="option-price">À partir de <strong>15000 FCFA</strong></p>
            </div>
          </div>

          {/* Option Spécialiste */}
          <div className="option-card" onClick={() => navigate('/specialistes')}>
            <div className="option-icon specialist-icon">
              <FaAward />
            </div>
            <div className="option-info">
              <h3>Spécialiste</h3>
              <p className="option-desc">Experts certifiés</p>
              <p className="option-price">À partir de <strong>25000 FCFA</strong></p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Consultation;