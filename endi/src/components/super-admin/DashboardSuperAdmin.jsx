import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaHospital, FaCrown, FaUsers, FaUser, FaHeartbeat, FaChartLine } from 'react-icons/fa';
import './DashboardSuperAdmin.css';

const DashboardSuperAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const saName = location.state?.name || 'Super Admin';

  // Statistiques globales de la plateforme
  const platformStats = {
    hospitals: 5,
    doctors: 62,
    patients: 1240,
    revenue: "12 500 000 FCFA"
  };

  // Derniers hôpitaux inscrits
  const recentHospitals = [
    { id: 1, name: "Centre Médical Saint-Antoine", city: "Douala", plan: "Premium" },
    { id: 2, name: "Clinique de la Paix", city: "Yaoundé", plan: "Standard" },
    { id: 3, name: "Hôpital Régional de Bafoussam", city: "Bafoussam", plan: "Premium" }
  ];

  return (
    <div className="dashboard-layout sa-layout">
      
      {/* Barre latérale pour Laptop */}
      <aside className="sidebar sa-sidebar">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon sa-icon" />
          <h2>SuiviHealth</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><FaHome /> Tableau de bord</button>
          <button className="nav-item" onClick={() => navigate('/gestion-hopitaux')}><FaHospital /> Hôpitaux</button>
          <button className="nav-item" onClick={() => navigate('/abonnements-premium')}><FaCrown /> Abonnements</button>
          <button className="nav-item" onClick={() => navigate('/statistiques')}><FaChartLine /> Statistiques</button>
          <button className="nav-item" onClick={() => navigate('/profil-super-admin', { state: { name: saName } })}><FaUser /> Mon Profil</button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="dashboard-main">
        
        <div className="mobile-top-logo">
          <FaHeartbeat className="app-logo-icon sa-icon" />
          <span>SuiviHealth SA</span>
        </div>

        <header className="dashboard-header">
          <div>
            <h1>Bonjour {saName}</h1>
            <p>Vue globale de la plateforme</p>
          </div>
          <div className="header-icon sa-header-icon" onClick={() => navigate('/profil-super-admin', { state: { name: saName } })}>
            <FaUser />
          </div>
        </header>

        {/* Cartes Statistiques Globales */}
        <div className="quick-grid admin-grid sa-grid">
          
          <div className="pro-card stat-card" onClick={() => navigate('/gestion-hopitaux')}>
            <div className="pro-icon icon-purple"><FaHospital /></div>
            <div className="pro-text">
              <h3>{platformStats.hospitals}</h3>
              <p>Hôpitaux partenaires</p>
            </div>
          </div>

          <div className="pro-card stat-card" onClick={() => navigate('/statistiques')}>
            <div className="pro-icon icon-blue"><FaUsers /></div>
            <div className="pro-text">
              <h3>{platformStats.patients}</h3>
              <p>Patients totaux</p>
            </div>
          </div>

          {/* LIEN VERS STATISTIQUES AJOUTÉ ICI AUSSI */}
          <div className="pro-card stat-card" onClick={() => navigate('/statistiques')}>
            <div className="pro-icon icon-teal"><FaChartLine /></div>
            <div className="pro-text">
              <h3>{platformStats.revenue}</h3>
              <p>Revenus plateforme</p>
            </div>
          </div>

          <div className="pro-card stat-card" onClick={() => navigate('/abonnements-premium')}>
            <div className="pro-icon icon-gold"><FaCrown /></div>
            <div className="pro-text">
              <h3>{platformStats.doctors}</h3>
              <p>Médecins certifiés</p>
            </div>
          </div>

        </div>

        {/* Section : Derniers hôpitaux inscrits */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Derniers hôpitaux inscrits</h2>
            <button className="see-all-btn" onClick={() => navigate('/gestion-hopitaux')}>Voir tout</button>
          </div>
          <div className="activity-list">
            {recentHospitals.map(hop => (
              <div key={hop.id} className="activity-item consult-item">
                <div className="consult-time">
                  <FaHospital />
                  <span>{hop.city}</span>
                </div>
                <div className="act-info">
                  <h4>{hop.name}</h4>
                </div>
                <span className={`tx-status ${hop.plan === 'Premium' ? 'status-paid' : 'status-pending'}`}>
                  {hop.plan}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Barre de navigation Mobile */}
            {/* Barre de navigation Mobile (5 onglets) */}
        <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => navigate('/dashboard-super-admin')}><FaHome /> Accueil</button>
        <button className="nav-item" onClick={() => navigate('/gestion-hopitaux')}><FaHospital /> Hôpitaux</button>
        <button className="nav-item" onClick={() => navigate('/abonnements-premium')}><FaCrown /> Premium</button>
        <button className="nav-item" onClick={() => navigate('/statistiques')}><FaChartLine /> Stats</button>
        <button className="nav-item" onClick={() => navigate('/profil-super-admin', { state: { name: saName } })}><FaUser /> Profil</button>
      </nav>

    </div>
  );
};

export default DashboardSuperAdmin;