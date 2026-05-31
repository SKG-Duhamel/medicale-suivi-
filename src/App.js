import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des pages publiques
import PublicLayout from './components/public/PublicLayout';
import Accueil from './components/public/Accueil';
import Services from './components/public/Services';
import APropos from './components/public/APropos';

// Composant Commun
import Welcome from './components/Welcome';

// Espace Patient
import Login from './components/patient/Login';
import RegisterPatient from './components/patient/RegisterPatient';
import DashboardPatient from './components/patient/DashboardPatient';
import Consultation from './components/patient/Consultation';
import Generalistes from './components/patient/Generalistes';
import Specialistes from './components/patient/Specialistes';
import DossierMedical from './components/patient/DossierMedical';
import Messagerie from './components/patient/Messagerie';
import Urgences from './components/patient/Urgences';
import ProfilPatient from './components/patient/ProfilPatient';

// Espace Médecin
import LoginMedecin from './components/medecin/LoginMedecin';
import DashboardMedecin from './components/medecin/DashboardMedecin';
import ConsultationsMedecin from './components/medecin/ConsultationsMedecin';
import DossierMedecin from './components/medecin/DossierMedecin';
import FichePatient from './components/medecin/FichePatient';
import SalleAttente from './components/medecin/SalleAttente';
import UrgencesMedecin from './components/medecin/UrgencesMedecin';
import ProfilMedecin from './components/medecin/ProfilMedecin';

// Espace Admin
import LoginAdmin from './components/admin/LoginAdmin';
import DashboardAdmin from './components/admin/DashboardAdmin';
import GestionMedecins from './components/admin/GestionMedecins';
import GestionTransactions from './components/admin/GestionTransactions';
import AdminUrgences from './components/admin/AdminUrgences';
import AdminPatients from './components/admin/AdminPatients';
import ProfilAdmin from './components/admin/ProfilAdmin';

// Espace Super Admin
import LoginSuperAdmin from './components/super-admin/LoginSuperAdmin';
import DashboardSuperAdmin from './components/super-admin/DashboardSuperAdmin';
import GestionHopitaux from './components/super-admin/GestionHopitaux';
import AbonnementsPremium from './components/super-admin/AbonnementsPremium';
import Statistiques from './components/super-admin/Statistiques';
import ProfilSuperAdmin from './components/super-admin/ProfilSuperAdmin'; // NOUVEAU

function App() {
  return (
    <Routes>
      
      {/* ROUTES PUBLIQUES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Accueil />} />
        <Route path="services" element={<Services />} />
        <Route path="a-propos" element={<APropos />} />
      </Route>

      {/* ROUTES APPLICATION */}
      <Route path="/accueil-roles" element={<Welcome />} />
      
      {/* Patient */}
      <Route path="/login-patient" element={<Login />} />
      <Route path="/register-patient" element={<RegisterPatient />} />
      <Route path="/dashboard-patient" element={<DashboardPatient />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/generalistes" element={<Generalistes />} />
      <Route path="/specialistes" element={<Specialistes />} />
      <Route path="/dossier-patient" element={<DossierMedical />} />
      <Route path="/messagerie" element={<Messagerie />} />
      <Route path="/urgences" element={<Urgences />} />
      <Route path="/profil-patient" element={<ProfilPatient />} />

      {/* Médecin */}
      <Route path="/login-medecin" element={<LoginMedecin />} />
      <Route path="/dashboard-medecin" element={<DashboardMedecin />} />
      <Route path="/consultations-medecin" element={<ConsultationsMedecin />} />
      <Route path="/dossier-medecin" element={<DossierMedecin />} />
      <Route path="/fiche-patient" element={<FichePatient />} />
      <Route path="/salle-attente" element={<SalleAttente />} />
      <Route path="/urgences-medecin" element={<UrgencesMedecin />} />
      <Route path="/profil-medecin" element={<ProfilMedecin />} />

      {/* Admin */}
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/gestion-medecins" element={<GestionMedecins />} />
      <Route path="/gestion-transactions" element={<GestionTransactions />} />
      <Route path="/admin-urgences" element={<AdminUrgences />} />
      <Route path="/admin-patients" element={<AdminPatients />} />
      <Route path="/profil-admin" element={<ProfilAdmin />} />

      {/* Super Admin */}
      <Route path="/login-super-admin" element={<LoginSuperAdmin />} />
      <Route path="/dashboard-super-admin" element={<DashboardSuperAdmin />} />
      <Route path="/gestion-hopitaux" element={<GestionHopitaux />} />
      <Route path="/abonnements-premium" element={<AbonnementsPremium />} />
      <Route path="/statistiques" element={<Statistiques />} />
      <Route path="/profil-super-admin" element={<ProfilSuperAdmin />} /> {/* NOUVEAU */}
      
    </Routes>
  );
}

export default App;