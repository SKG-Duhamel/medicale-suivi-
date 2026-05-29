import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des pages existantes
import Welcome from './components/Welcome';
import Login from './components/Login';
import LoginMedecin from './components/LoginMedecin';

function App() {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Welcome />} />
      
      {/* Connexion Patient */}
      <Route path="/login-patient" element={<Login />} />
      
      {/* Connexion Médecin */}
      <Route path="/login-medecin" element={<LoginMedecin />} />
    </Routes>
  );
}

export default App;