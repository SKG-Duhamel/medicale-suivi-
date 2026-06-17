import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaPlus, FaHospital, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './GestionHopitaux.css';

const GestionHopitaux = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHospital, setNewHospital] = useState({ name: '', city: '', director: '' });

  const [hospitals, setHospitals] = useState([
    { id: 1, name: "Centre Médical Saint-Antoine", city: "Douala", director: "Dr. Nganou", plan: "Premium", status: "Actif" },
    { id: 2, name: "Clinique de la Paix", city: "Yaoundé", director: "Mme Fotso", plan: "Standard", status: "Actif" },
    { id: 3, name: "Hôpital Régional de Bafoussam", city: "Bafoussam", director: "Dr. Fonkem", plan: "Premium", status: "Actif" },
    { id: 4, name: "Polyclinique de Bonapriso", city: "Douala", director: "Dr. Tchinda", plan: "Standard", status: "Inactif" }
  ]);

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHospital = (e) => {
    e.preventDefault();
    setHospitals([{ id: Date.now(), ...newHospital, plan: "Standard", status: "Actif" }, ...hospitals]);
    setNewHospital({ name: '', city: '', director: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Supprimer cet hôpital de la plateforme ?")) {
      setHospitals(hospitals.filter(h => h.id !== id));
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
          <h2>Hôpitaux Partenaires</h2>
        </div>

        <div className="gestion-actions">
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Rechercher un hôpital..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="sa-btn-add" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Ajouter un hôpital
          </button>
        </div>

        <div className="hopital-list">
          {filteredHospitals.map(hop => (
            <div key={hop.id} className="hopital-item">
              <div className="hopital-avatar">
                <FaHospital />
              </div>
              <div className="hopital-info">
                <h3>{hop.name}</h3>
                <p className="hopital-city">{hop.city} - Dir: {hop.director}</p>
              </div>
              <div className="hopital-meta">
                <span className={`sa-plan-badge ${hop.plan === 'Premium' ? 'premium' : 'standard'}`}>
                  {hop.plan}
                </span>
                <span className={`sa-status ${hop.status === 'Actif' ? 'active' : 'inactive'}`}>
                  {hop.status}
                </span>
              </div>
              <div className="hopital-actions">
                <button className="btn-icon edit" onClick={() => alert('Modifier ' + hop.name)}><FaEdit /></button>
                <button className="btn-icon delete" onClick={() => handleDelete(hop.id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modale ajout hôpital */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content sa-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}><FaTimes /></button>
            <h2>Ajouter un hôpital</h2>
            <form onSubmit={handleAddHospital} className="modal-form">
              <div className="form-group">
                <label>Nom de l'établissement</label>
                <input type="text" value={newHospital.name} onChange={(e) => setNewHospital({...newHospital, name: e.target.value})} placeholder="Hôpital Central" required />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input type="text" value={newHospital.city} onChange={(e) => setNewHospital({...newHospital, city: e.target.value})} placeholder="Douala" required />
              </div>
              <div className="form-group">
                <label>Directeur / Contact</label>
                <input type="text" value={newHospital.director} onChange={(e) => setNewHospital({...newHospital, director: e.target.value})} placeholder="Dr. Exemple" required />
              </div>
              <button type="submit" className="sa-btn-submit">Enregistrer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionHopitaux;