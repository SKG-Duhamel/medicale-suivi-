import React from 'react';
import { FaHeartbeat, FaLock, FaHandshake } from 'react-icons/fa';

const APropos = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>À Propos de SuiviHealth</h1>
        <p>Réinventer l'accès aux soins grâce à la technologie</p>
      </div>

      <div className="split-layout" style={{marginBottom: '60px'}}>
        <div className="split-image">
          <img 
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80" 
            alt="Équipe médicale collaborant" 
          />
        </div>
        <div className="split-content">
          <div className="about-block" style={{textAlign: 'left', marginBottom: '0'}}>
            <FaHeartbeat className="about-icon" style={{marginLeft: '0'}} />
            <h3>Notre Mission</h3>
            <p>Chez SuiviHealth, nous croyons que chaque individu mérite un accès facile, rapide et sécurisé aux soins de santé. Notre mission est de briser les barrières géographiques et temporelles en connectant les patients aux meilleurs professionnels de santé, où qu'ils soient.</p>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="about-block">
          <FaLock className="about-icon" />
          <h3>Confiance et Sécurité</h3>
          <p>La santé est une donnée intime et sensible. C'est pourquoi la sécurité est au cœur de notre architecture. SuiviHealth est certifié HDS (Hébergement de Données de Santé), garantissant que vos informations sont chiffrées, protégées et accessibles uniquement par vous et les médecins que vous autorisez.</p>
        </div>

        <div className="about-block">
          <FaHandshake className="about-icon" />
          <h3>Notre Engagement</h3>
          <p>Nous sélectionnons avec soin les médecins de notre plateforme pour garantir une qualité de soins irréprochable. Nous nous engageons à offrir une plateforme inclusive, où le patient est acteur de sa santé, et où le médecin dispose des meilleurs outils pour exercer son art.</p>
        </div>
      </div>
    </div>
  );
};

export default APropos;