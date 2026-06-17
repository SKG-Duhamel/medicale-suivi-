import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowLeft, FaUsers, FaHospital, FaMoneyBillWave, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Statistiques.css';

const Statistiques = () => {
  const navigate = useNavigate();

  // Données statistiques globales simulées
  const stats = [
    { id: 1, title: "Patients Inscrits", value: "1 240", evolution: "+12%", up: true, icon: <FaUsers />, color: "blue" },
    { id: 2, title: "Hôpitaux Partenaires", value: "05", evolution: "+1", up: true, icon: <FaHospital />, color: "purple" },
    { id: 3, title: "Revenus Mensuels", value: "2 500 000 FCFA", evolution: "+8%", up: true, icon: <FaMoneyBillWave />, color: "green" },
    { id: 4, title: "Consultations (Mois)", value: "312", evolution: "-3%", up: false, icon: <FaChartLine />, color: "orange" }
  ];

  const monthlyData = [
    { month: "Jan", value: 80 },
    { month: "Fév", value: 65 },
    { month: "Mar", value: 90 },
    { month: "Avr", value: 75 },
    { month: "Mai", value: 110 },
    { month: "Juin", value: 95 },
    { month: "Juil", value: 120 }
  ];

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
          <h2>Statistiques de la Plateforme</h2>
        </div>

        {/* Cartes de stats globales */}
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.id} className={`stat-box ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
              <span className={`stat-evolution ${stat.up ? 'up' : 'down'}`}>
                {stat.up ? <FaArrowUp /> : <FaArrowDown />} {stat.evolution}
              </span>
            </div>
          ))}
        </div>

        {/* Graphique simulé avec CSS */}
        <div className="chart-container">
          <h3>Activité des consultations (6 derniers mois)</h3>
          <div className="css-chart">
            {monthlyData.map((data, index) => (
              <div key={index} className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: `${data.value}%` }}></div>
                <span className="chart-label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Statistiques;