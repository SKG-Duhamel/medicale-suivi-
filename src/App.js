import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      {/* Page d'accueil par défaut */}
      <Route path="/" element={<Welcome />} />
      
      {/* Page de connexion du patient (celle créée précédemment) */}
      <Route path="/login-patient" element={<Login />} />
      
      {/* Page de connexion du médecin (à créer plus tard) */}
      <Route path="/login-medecin" element={<Login />} /> 
    </Routes>
  );
}

export default App;