import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserMd, FaMoneyBillWave, FaExclamationTriangle, FaUsers, FaUser, FaHeartbeat, FaChartLine } from 'react-icons/fa';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const adminName = location.state?.name || 'Admin';

  // Statistiques simulées de l'hôpital
  const hospitalStats = {
    doctors: 12,
    patients: 342,
    transactions: "1 250 000 FCFA",
    urgences: 2
  };

  // Transactions récentes
  const recentTransactions = [
    { id: 1, patient: "Jean-Pierre Dupont", doctor: "Dr. Martin", amount: "15 000 FCFA", type: "Consultation" },
    { id: 2, patient: "Marie Lefebvre", doctor: "Dr. Lefebvre", amount: "25 000 FCFA", type: "Spécialiste" },
    { id: 3, patient: "Sophie Martin", doctor: "Dr. Dubois", amount: "15 000 FCFA", type: "Visioconférence" }
  ];

  return (
    <div className="dashboard-layout">
      
      {/* Barre latérale pour Laptop */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon" />
          <h2>SuiviHealth</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><FaHome /> Tableau de bord</button>
          <button className="nav-item" onClick={() => navigate('/gestion-medecins')}><FaUserMd /> Médecins</button>
          <button className="nav-item" onClick={() => navigate('/gestion-transactions')}><FaMoneyBillWave /> Transactions</button>
          <button className="nav-item" onClick={() => navigate('/admin-urgences')}><FaExclamationTriangle /> Urgences</button>
          <button className="nav-item" onClick={() => navigate('/admin-patients')}><FaUsers /> Patients</button>
          <button className="nav-item" onClick={() => navigate('/profil-admin', { state: { name: adminName } })}><FaUser /> Mon Profil</button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="dashboard-main">
        
        <div className="mobile-top-logo">
          <FaHeartbeat className="app-logo-icon" />
          <span>SuiviHealth Admin</span>
        </div>

        <header className="dashboard-header">
          <div>
            <h1>Bonjour {adminName}</h1>
            <p>Gestion de l'hôpital</p>
          </div>
          <div className="header-icon" onClick={() => navigate('/profil-admin', { state: { name: adminName } })}>
            <FaUser />
          </div>
        </header>

        {/* Cartes Statistiques */}
        <div className="quick-grid admin-grid">
          
          <div className="pro-card stat-card" onClick={() => navigate('/gestion-medecins')}>
            <div className="pro-icon icon-blue"><FaUserMd /></div>
            <div className="pro-text">
              <h3>{hospitalStats.doctors}</h3>
              <p>Médecins actifs</p>
            </div>
          </div>

          <div className="pro-card stat-card" onClick={() => navigate('/admin-patients')}>
            <div className="pro-icon icon-teal"><FaUsers /></div>
            <div className="pro-text">
              <h3>{hospitalStats.patients}</h3>
              <p>Patients suivis</p>
            </div>
          </div>

          <div className="pro-card stat-card" onClick={() => navigate('/gestion-transactions')}>
            <div className="pro-icon icon-green"><FaMoneyBillWave /></div>
            <div className="pro-text">
              <h3>{hospitalStats.transactions}</h3>
              <p>Revenus du jour</p>
            </div>
          </div>

          <div className="pro-card stat-card" onClick={() => navigate('/admin-urgences')}>
            <div className="pro-icon icon-red"><FaExclamationTriangle /></div>
            <div className="pro-text">
              <h3>{hospitalStats.urgences}</h3>
              <p>Alertes critiques</p>
            </div>
          </div>

        </div>

        {/* Section : Dernières transactions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Dernières transactions</h2>
            <button className="see-all-btn" onClick={() => navigate('/gestion-transactions')}>Voir tout</button>
          </div>
          <div className="activity-list">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="activity-item consult-item">
                <div className="consult-time">
                  <FaChartLine />
                  <span>{tx.type}</span>
                </div>
                <div className="act-info">
                  <h4>{tx.patient} <span className="apt-spec">avec {tx.doctor}</span></h4>
                </div>
                <span className="tx-amount">{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Barre de navigation Mobile */}
      <nav className="bottom-nav">
        <button className="nav-item active"><FaHome /> Accueil</button>
        <button className="nav-item" onClick={() => navigate('/gestion-medecins')}><FaUserMd /> Médecins</button>
        <button className="nav-item" onClick={() => navigate('/admin-patients')}><FaUsers /> Patients</button>
        <button className="nav-item" onClick={() => navigate('/gestion-transactions')}><FaMoneyBillWave /> Finances</button>
        <button className="nav-item" onClick={() => navigate('/profil-admin', { state: { name: adminName } })}><FaUser /> Profil</button>
      </nav>

    </div>
  );
};

export default DashboardAdmin;