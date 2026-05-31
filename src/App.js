import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des pages publiques
import PublicLayout from './components/public/PublicLayout';
import Accueil from './components/public/Accueil';
import Services from './components/public/Services';
import APropos from './components/public/APropos';

// Importation des pages de l'application
import Welcome from './components/Welcome';
import Login from './components/Login';
import RegisterPatient from './components/RegisterPatient';
import DashboardPatient from './components/DashboardPatient';
import Consultation from './components/Consultation';
import Generalistes from './components/Generalistes';
import Specialistes from './components/Specialistes';
import DossierMedical from './components/DossierMedical';
import LoginMedecin from './components/LoginMedecin';
import LoginAdmin from './components/LoginAdmin';
import LoginSuperAdmin from './components/LoginSuperAdmin';

function App() {
  return (
    <Routes>
      
      {/* ROUTES PUBLIQUES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Accueil />} />
        <Route path="services" element={<Services />} />
        <Route path="a-propos" element={<APropos />} />
      </Route>

      {/* ROUTES DE L'APPLICATION */}
      <Route path="/accueil-roles" element={<Welcome />} />
      <Route path="/login-patient" element={<Login />} />
      <Route path="/register-patient" element={<RegisterPatient />} />
      <Route path="/dashboard-patient" element={<DashboardPatient />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/generalistes" element={<Generalistes />} />
      <Route path="/specialistes" element={<Specialistes />} />
      <Route path="/dossier-patient" element={<DossierMedical />} />
      <Route path="/login-medecin" element={<LoginMedecin />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/login-super-admin" element={<LoginSuperAdmin />} />
      
    </Routes>
  );
}

export default App;