import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaSlidersH, FaStar, FaMapMarkerAlt, FaBriefcase, FaUserMd } from 'react-icons/fa';
import RdvModal from './RdvModal'; // NOUVEAU : Import de la modale
import './Generalistes.css'; // On réutilise le même CSS

const Specialistes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // NOUVEAU : États pour gérer la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  // Données simulées des spécialistes
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Marie Lefebvre",
      specialty: "Cardiologie",
      clinic: "Hôpital Universitaire",
      rating: 4.8,
      distance: "3.1 km",
      experience: "20 ans",
      price: "30000 FCFA",
      available: true
    },
    {
      id: 2,
      name: "Dr. Jean Rousseau",
      specialty: "Dermatologie",
      clinic: "Centre Dermatologique",
      rating: 4.7,
      distance: "1.8 km",
      experience: "10 ans",
      price: "27000 FCFA",
      available: true
    }
  ];

  // NOUVEAU : Fonction pour ouvrir la modale
  const handleOpenRdv = (doctor) => { 
    setSelectedDoctor(doctor); 
    setIsModalOpen(true); 
  };

  return (
    <div className="gen-container">
      <div className="gen-card">
        
        {/* Bouton Retour */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="gen-header">
          {/* Logo */}
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Spécialistes</h2>
          <p className="subtitle">{doctorsData.length} médecins trouvés à proximité</p>
        </div>

        {/* Barre de recherche et filtre */}
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher un spécialiste..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <FaSlidersH />
          </button>
        </div>

        {/* Liste des médecins */}
        <div className="doctors-list">
          {doctorsData.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-avatar">
                <FaUserMd />
              </div>
              
              <div className="doctor-info">
                <div className="doctor-top-row">
                  <h3>{doctor.name}</h3>
                  {doctor.available && <span className="badge-dispo">Dispo</span>}
                </div>
                {/* Affichage de la spécialité avec la clinique */}
                <p className="clinic-name">{doctor.specialty} - {doctor.clinic}</p>
                
                <div className="doctor-details">
                  <span><FaStar className="detail-icon star" /> {doctor.rating}</span>
                  <span><FaMapMarkerAlt className="detail-icon loc" /> {doctor.distance}</span>
                  <span><FaBriefcase className="detail-icon exp" /> {doctor.experience}</span>
                </div>
              </div>

              <div className="doctor-actions">
                <div className="doctor-price">{doctor.price}</div>
                <div className="action-buttons">
                  {/* MODIFICATION : On appelle la fonction d'ouverture de modale */}
                  <button className="btn-rdv" onClick={() => handleOpenRdv(doctor)}>RDV</button>
                  <button className="btn-consulter">Consulter</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* NOUVEAU : Affichage de la Modale */}
      <RdvModal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    doctor={selectedDoctor}
    />
    </div>
  );
};

export default Specialistes;