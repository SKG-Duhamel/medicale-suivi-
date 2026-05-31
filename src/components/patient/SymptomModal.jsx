import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './SymptomModal.css';

const SymptomModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (description.trim()) {
      onSave(description);
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="symptom-modal-overlay" onClick={onClose}>
      <div className="symptom-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="symptom-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Ajouter des symptômes</h2>

        <div className="symptom-form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Douleurs, localisation, intensité, durée..."
            rows="5"
          />
        </div>

        <p className="symptom-info">
          Ces informations aideront votre médecin à mieux comprendre votre état de santé.
        </p>

        <div className="symptom-modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn-save" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default SymptomModal;