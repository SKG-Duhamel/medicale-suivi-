import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaUserMd, FaNotesMedical, FaFlask, FaAmbulance, FaPills } from 'react-icons/fa';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { icon: <FaVideo />, title: "Téléconsultation", desc: "Consultez un médecin généraliste ou spécialiste par vidéoconférence. Un moyen rapide et sûr d'obtenir un avis médical sans vous déplacer." },
    { icon: <FaUserMd />, title: "Rendez-vous au cabinet", desc: "Trouvez le praticien qu'il vous faut près de chez vous et réservez le créneau horaire qui vous convient. Confirmation instantanée." },
    { icon: <FaNotesMedical />, title: "Dossier Médical Numérique", desc: "Centralisez votre historique médical, vos allergies et vos traitements en cours. Un outil indispensable pour un suivi de qualité." },
    { icon: <FaPills />, title: "Ordonnances numériques", desc: "Recevez vos ordonnances directement sur votre espace patient et transmettez-les en un clic à la pharmacie." },
    { icon: <FaFlask />, title: "Résultats d'analyses", desc: "Accédez à vos résultats biologiques et radiologiques dès leur validation par le laboratoire." },
    { icon: <FaAmbulance />, title: "Orientation urgences", desc: "Notre système d'orientation vous aide à déterminer si vous devez consulter en urgence ou si une téléconsultation suffit." }
  ];

  return (
    <div className="page-container">
      
      <div className="split-layout" style={{marginBottom: '80px'}}>
        <div className="split-content">
          <h1>Nos Services</h1>
          <p style={{fontSize: '18px', color: '#555', lineHeight: '1.6'}}>
            Une suite complète d'outils pour gérer votre santé au quotidien. De la téléconsultation à la gestion de votre dossier médical, SuiviHealth vous accompagne à chaque étape.
          </p>
        </div>
        <div className="split-image">
          <img 
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80" 
            alt="Équipement médical moderne" 
          />
        </div>
      </div>

      <div className="services-detail-grid">
        {services.map((service, index) => (
          <div key={index} className="service-detail-card">
            <div className="service-detail-icon">{service.icon}</div>
            <div className="service-detail-content">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-inline">
        <h3>Besoin de prendre rendez-vous ?</h3>
        <button className="pub-btn-login" onClick={() => navigate('/accueil-roles')}>Accéder à la plateforme</button>
      </div>
    </div>
  );
};

export default Services;