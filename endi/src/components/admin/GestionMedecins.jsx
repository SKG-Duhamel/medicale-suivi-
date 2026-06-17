import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaPlus, FaUserMd, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './GestionMedecins.css';

const GestionMedecins = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État du formulaire
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', email: '', phone: '' });

  // Données simulées des médecins de l'hôpital
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Sophie Martin", specialty: "Cardiologie", email: "sophie.martin@hopital.cm", status: "Actif" },
    { id: 2, name: "Dr. Thomas Dubois", specialty: "Généraliste", email: "thomas.dubois@hopital.cm", status: "Actif" },
    { id: 3, name: "Dr. Marie Lefebvre", specialty: "Dermatologie", email: "marie.lefebvre@hopital.cm", status: "En congé" },
  ]);

  // Filtrer les médecins selon la recherche
  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer l'ajout d'un médecin
  const handleAddDoctor = (e) => {
    e.preventDefault();
    const doctorToAdd = {
      id: Date.now(),
      ...newDoctor,
      status: "Actif"
    };
    setDoctors([doctorToAdd, ...doctors]);
    setNewDoctor({ name: '', specialty: '', email: '', phone: '' });
    setIsModalOpen(false);
  };

  // Gérer la suppression
  const handleDelete = (id) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?")) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

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
          <h2>Gestion des Médecins</h2>
        </div>

        {/* Barre d'actions */}
        <div className="gestion-actions">
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher un médecin..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Ajouter un médecin
          </button>
        </div>

        {/* Liste des médecins */}
        <div className="doc-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doc => (
              <div key={doc.id} className="doc-item">
                <div className="doc-avatar">
                  <FaUserMd />
                </div>
                <div className="doc-info">
                  <h3>{doc.name}</h3>
                  <p className="doc-specialty">{doc.specialty}</p>
                  <p className="doc-email">{doc.email}</p>
                </div>
                <div className="doc-status-actions">
                  <span className={`status-badge ${doc.status === 'Actif' ? 'status-active' : 'status-off'}`}>
                    {doc.status}
                  </span>
                  <div className="doc-actions">
                    <button className="btn-icon edit" onClick={() => alert(`Modifier ${doc.name}`)}><FaEdit /></button>
                    <button className="btn-icon delete" onClick={() => handleDelete(doc.id)}><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aucun médecin trouvé.</div>
          )}
        </div>
      </div>

      {/* Modale d'ajout de médecin */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h2>Ajouter un médecin</h2>
            
            <form onSubmit={handleAddDoctor} className="modal-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} placeholder="Dr. Exemple" required />
              </div>
              <div className="form-group">
                <label>Spécialité</label>
                <input type="text" value={newDoctor.specialty} onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})} placeholder="Cardiologie" required />
              </div>
              <div className="form-group">
                <label>Email professionnel</label>
                <input type="email" value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} placeholder="medecin@hopital.cm" required />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="tel" value={newDoctor.phone} onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})} placeholder="+237 6 XX XX XX XX" required />
              </div>
              <button type="submit" className="btn-submit">Enregistrer le médecin</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestionMedecins;