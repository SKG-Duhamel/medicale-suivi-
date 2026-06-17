import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaSearch, FaMoneyBillWave, FaCheckCircle, FaClock, FaFilter } from 'react-icons/fa';
import './GestionTransactions.css';

const GestionTransactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous'); // 'tous', 'paye', 'en_attente'

  // Données simulées des transactions de l'hôpital
  const transactionsData = [
    { id: 1, date: "15 Fév. 2024", patient: "Jean-Pierre Dupont", doctor: "Dr. Martin", type: "Consultation Cabinet", amount: "15 000 FCFA", status: "Payé" },
    { id: 2, date: "15 Fév. 2024", patient: "Marie Lefebvre", doctor: "Dr. Lefebvre", type: "Visioconférence", amount: "25 000 FCFA", status: "Payé" },
    { id: 3, date: "14 Fév. 2024", patient: "Lucas Bernard", doctor: "Dr. Dubois", type: "Consultation Spécialiste", amount: "30 000 FCFA", status: "En attente" },
    { id: 4, date: "14 Fév. 2024", patient: "Sophie Martin", doctor: "Dr. Martin", type: "Consultation Cabinet", amount: "15 000 FCFA", status: "Payé" },
    { id: 5, date: "13 Fév. 2024", patient: "Emma Durand", doctor: "Dr. Lefebvre", type: "Visioconférence", amount: "25 000 FCFA", status: "En attente" }
  ];

  // Filtrage
  const filteredTransactions = transactionsData.filter(tx => {
    const matchSearch = tx.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       tx.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'tous' || tx.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Calcul des stats
  const totalPaid = transactionsData.filter(tx => tx.status === 'Payé').length;
  const totalPending = transactionsData.filter(tx => tx.status === 'En attente').length;

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
          <h2>Transactions & Paiements</h2>
        </div>

        {/* Cartes de synthèse financière */}
        <div className="tx-summary-grid">
          <div className="tx-summary-card total">
            <FaMoneyBillWave className="tx-summary-icon" />
            <div>
              <h3>1 250 000 FCFA</h3>
              <p>Revenus du mois</p>
            </div>
          </div>
          <div className="tx-summary-card paid">
            <FaCheckCircle className="tx-summary-icon" />
            <div>
              <h3>{totalPaid}</h3>
              <p>Paiements validés</p>
            </div>
          </div>
          <div className="tx-summary-card pending">
            <FaClock className="tx-summary-icon" />
            <div>
              <h3>{totalPending}</h3>
              <p>Paiements en attente</p>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="tx-filters">
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher par patient ou médecin..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button className={`filter-btn ${filterStatus === 'tous' ? 'active' : ''}`} onClick={() => setFilterStatus('tous')}>
              <FaFilter /> Tous
            </button>
            <button className={`filter-btn filter-paid ${filterStatus === 'Payé' ? 'active' : ''}`} onClick={() => setFilterStatus('Payé')}>
              Payés
            </button>
            <button className={`filter-btn filter-pending ${filterStatus === 'En attente' ? 'active' : ''}`} onClick={() => setFilterStatus('En attente')}>
              En attente
            </button>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="tx-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className="tx-date">
                  <span>{tx.date}</span>
                </div>
                
                <div className="tx-info">
                  <h3>{tx.patient}</h3>
                  <p>{tx.type} <span className="tx-doc">avec {tx.doctor}</span></p>
                </div>

                <div className="tx-financials">
                  <span className={`tx-status ${tx.status === 'Payé' ? 'status-paid' : 'status-pending'}`}>
                    {tx.status}
                  </span>
                  <span className="tx-amount">{tx.amount}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aucune transaction trouvée.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GestionTransactions;