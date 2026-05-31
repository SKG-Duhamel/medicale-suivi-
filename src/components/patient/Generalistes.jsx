import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaSlidersH, FaStar, FaMapMarkerAlt, FaBriefcase, FaUserMd } from 'react-icons/fa';
import RdvModal from './RdvModal'; // NOUVEAU : Import de la modale
import './Generalistes.css';

const Generalistes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // NOUVEAU : États pour gérer la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Sophie Martin",
      clinic: "Centre Médical Saint-Antoine",
      rating: 4.9,
      distance: "1.2 km",
      experience: "15 ans",
      price: "20000 FCFA",
      available: true
    },
    {
      id: 2,
      name: "Dr. Thomas Dubois",
      clinic: "Clinique de la Paix",
      rating: 4.8,
      distance: "2.5 km",
      experience: "12 ans",
      price: "17 000 FCFA",
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
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="gen-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth</h1>
          </div>
          <h2>Généralistes</h2>
          <p className="subtitle">{doctorsData.length} médecins trouvés à proximité</p>
        </div>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher un médecin..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <FaSlidersH />
          </button>
        </div>

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
                <p className="clinic-name">{doctor.clinic}</p>
                
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

export default Generalistes;