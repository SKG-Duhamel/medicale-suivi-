import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaUser, FaClock, FaFolderOpen } from 'react-icons/fa';
import './AdminPatients.css';

const AdminPatients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Simulations des patients de l'hôpital
  const patientsData = [
    { id: 1, name: "Jean-Pierre Dupont", email: "jp.dupont@email.com", lastVisit: "15 Fév. 2024", status: "Actif" },
    { id: 2, name: "Marie Lefebvre", email: "m.lefebvre@email.com", lastVisit: "10 Fév. 2024", status: "Actif" },
    { id: 3, name: "Thomas Dubois", email: "t.dubois@email.com", lastVisit: "05 Fév. 2024", status: "Inactif" },
    { id: 4, name: "Sophie Martin", email: "s.martin@email.com", lastVisit: "28 Jan. 2024", status: "Actif" },
    { id: 5, name: "Lucas Bernard", email: "l.bernard@email.com", lastVisit: "15 Jan. 2024", status: "Actif" }
  ];

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gestion-container">
      <div className="gestion-card">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>

        <div className="gestion-header">
          <div className="app-logo">
            <FaHeartbeat className="app-logo-icon" />
            <h1>SuiviHealth Admin</h1>
          </div>
          <h2>Gestion des Patients</h2>
          <p className="subtitle">{patientsData.length} patients enregistrés dans l'établissement</p>
        </div>

        {/* Barre de recherche */}
        <div className="search-bar-wrapper" style={{ marginBottom: '25px' }}>
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un patient par nom ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                    <span>{patient.email}</span>
                    <span className="meta-separator">•</span>
                    <span><FaClock /> Dernière visite: {patient.lastVisit}</span>
                  </div>
                </div>

                <div className="patient-actions">
                  <span className={`patient-rdv ${patient.status === 'Actif' ? 'has-rdv' : 'no-rdv'}`}>
                    {patient.status}
                  </span>
                  <button className="btn-open-dossier" onClick={() => navigate('/fiche-patient', { state: { name: patient.name } })}>
                    <FaFolderOpen /> Dossier
                  </button>
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

export default AdminPatients;