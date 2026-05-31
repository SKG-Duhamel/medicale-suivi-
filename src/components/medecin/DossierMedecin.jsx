import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaUser, FaClock } from 'react-icons/fa';
import './DossierMedecin.css';

const DossierMedecin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Simulations des patients du médecin
  const patientsData = [
    { id: 1, name: "Jean-Pierre Dupont", age: "45 ans", lastVisit: "14 Fév. 2024", nextRdv: "Aujourd'hui 14:00" },
    { id: 2, name: "Marie Lefebvre", age: "32 ans", lastVisit: "10 Fév. 2024", nextRdv: "Aujourd'hui 10:30" },
    { id: 3, name: "Thomas Dubois", age: "28 ans", lastVisit: "05 Fév. 2024", nextRdv: "Demain 09:00" },
    { id: 4, name: "Sophie Martin", age: "50 ans", lastVisit: "28 Jan. 2024", nextRdv: "Aucun" },
    { id: 5, name: "Lucas Bernard", age: "19 ans", lastVisit: "15 Jan. 2024", nextRdv: "Aucun" }
  ];

  // Filtrage des patients selon la recherche
  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dossier-med-container">
      <div className="dossier-med-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="dossier-med-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Pro</h1>
          </div>
          <h2>Dossiers Médicaux</h2>
        </div>

        {/* Barre de recherche */}
        <div className="search-med-bar">
          <div className="search-med-input-wrapper">
            <FaSearch className="search-med-icon" />
            <input 
              type="text" 
              placeholder="Rechercher un patient..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des patients */}
        <div className="patient-list">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(patient => (
              <div key={patient.id} className="patient-item">
                <div className="patient-avatar">
                  <FaUser />
                </div>
                
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <div className="patient-meta">
                    <span>{patient.age}</span>
                    <span className="meta-separator">•</span>
                    <span><FaClock /> Dernière visite: {patient.lastVisit}</span>
                  </div>
                </div>

                <div className="patient-actions">
                  <span className={`patient-rdv ${patient.nextRdv === 'Aucun' ? 'no-rdv' : 'has-rdv'}`}>
                    {patient.nextRdv}
                  </span>
                  <button className="btn-open-dossier" onClick={() => navigate('/fiche-patient', { state: { name: patient.name } })}>Ouvrir</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aucun patient trouvé pour cette recherche.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DossierMedecin;