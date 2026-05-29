import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- AJOUT IMPORTANT
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Enveloppe l'application */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);