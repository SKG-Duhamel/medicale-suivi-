import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaVideo, FaHospital, FaCalendarAlt, FaClock, FaCheckCircle, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import './RdvModal.css';

const RdvModal = ({ isOpen, onClose, doctor }) => {
  const navigate = useNavigate();
  
  // Gestion des étapes et des données du formulaire
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('carte_bancaire');

  // Réinitialiser et fermer la modale
  const handleClose = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    onClose();
  };

  // Fonction pour revenir au tableau de bord après confirmation
  const handleReturnToDashboard = () => {
    handleClose();
    navigate('/dashboard-patient');
  };

  // Si la modale n'est pas ouverte ou s'il n'y a pas de médecin, on n'affiche rien
  if (!isOpen || !doctor) return null;

  const doctorName = doctor.name;
  const doctorPrice = doctor.price;
  const doctorSpecialty = doctor.specialty || 'Généraliste';

  // ÉTAPE 1 : Choix du type de consultation
  const renderStep1 = () => (
    <>
      <div className="modal-rdv-header">
        <h2>Prendre Rendez-vous</h2>
        <p>Avec {doctorName}</p>
      </div>

      <div className="modal-rdv-options">
        <div className="modal-rdv-card" onClick={() => setStep(2)}>
          <div className="modal-rdv-icon video-icon"><FaVideo /></div>
          <div className="modal-rdv-info">
            <h3>Téléconsultation</h3>
            <p>Disponible 24h/24</p>
          </div>
        </div>

        <div className="modal-rdv-card" onClick={() => setStep(2)}>
          <div className="modal-rdv-icon cabinet-icon"><FaHospital /></div>
          <div className="modal-rdv-info">
            <h3>Au cabinet</h3>
            <p>Réservation en ligne</p>
          </div>
        </div>
      </div>
    </>
  );

  // ÉTAPE 2 : Choix de la date et de l'heure
  const renderStep2 = () => (
    <>
      <div className="modal-rdv-header">
        <h2>Prendre rendez-vous</h2>
        <p className="subtitle-doctor">{doctorName} ({doctorSpecialty})</p>
      </div>

      <div className="datetime-section">
        <div className="datetime-group">
          <label><FaCalendarAlt /> Date</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            required 
          />
        </div>

        <div className="datetime-group">
          <label><FaClock /> Horaire</label>
          <div className="time-slots">
            {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
              <button 
                key={time} 
                type="button" 
                className={`time-slot-btn ${selectedTime === time ? 'active' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={handleClose}>Annuler</button>
        <button 
          className="btn-continue" 
          disabled={!selectedDate || !selectedTime}
          onClick={() => setStep(3)}
        >
          Continuer vers le paiement
        </button>
      </div>
    </>
  );

  // ÉTAPE 3 : Paiement
  const renderStep3 = () => (
    <>
      <div className="modal-rdv-header">
        <h2>Paiement</h2>
        <p className="subtitle-doctor">{doctorName}</p>
      </div>

      <div className="payment-summary">
        <div className="summary-row">
          <span>Date & Heure</span>
          <strong>{selectedDate} à {selectedTime}</strong>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <strong>{doctorPrice}</strong>
        </div>
      </div>

      <div className="payment-methods">
        <h4>Mode de paiement</h4>
        <div className="method-options">
          <div className={`method-card ${paymentMethod === 'mobile_money' ? 'active' : ''}`} onClick={() => setPaymentMethod('mobile_money')}>
            <FaMobileAlt /> Mobile Money
          </div>
          <div className={`method-card ${paymentMethod === 'carte_bancaire' ? 'active' : ''}`} onClick={() => setPaymentMethod('carte_bancaire')}>
            <FaCreditCard /> Carte bancaire
          </div>
        </div>

        {paymentMethod === 'carte_bancaire' && (
          <div className="card-input-group">
            <label>Numéro de carte</label>
            <input type="text" placeholder="0000 0000 0000 0000" />
          </div>
        )}
         {paymentMethod === 'mobile_money' && (
          <div className="card-input-group">
            <label>Numéro de téléphone</label>
            <input type="text" placeholder="+237 6 XX XX XX XX" />
          </div>
        )}
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={() => setStep(2)}>Retour</button>
        <button className="btn-continue btn-pay" onClick={() => setStep(4)}>
          Confirmer le paiement
        </button>
      </div>
    </>
  );

  // ÉTAPE 4 : Confirmation
  const renderStep4 = () => (
    <>
      <div className="confirmation-section">
        <FaCheckCircle className="check-icon" />
        <h2>Rendez-vous confirmé!</h2>
        <p>{doctorName} a été notifiée</p>
      </div>

      <div className="modal-actions column-layout">
        <button className="btn-continue" onClick={handleReturnToDashboard}>
          Retour au tableau de bord
        </button>
        <button className="btn-cancel btn-outline" onClick={() => { handleClose(); navigate('/dossier-patient'); }}>
          Voir mon dossier
        </button>
      </div>
    </>
  );

  return (
    <div className="modal-rdv-overlay" onClick={handleClose}>
      <div className="modal-rdv-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Bouton Fermer (caché à l'étape de confirmation) */}
        {step !== 4 && (
          <button className="modal-rdv-close" onClick={handleClose}>
            <FaTimes />
          </button>
        )}

        {/* Affichage conditionnel de l'étape */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

      </div>
    </div>
  );
};

export default RdvModal;