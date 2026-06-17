import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRobot, FaExclamationTriangle } from 'react-icons/fa';
import './ChatInterface.css';

const Urgences = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "⚠️ Service d'urgence SuiviHealth. Veuillez décrire précisément la situation d'urgence. Si le cas est grave, une alerte sera immédiatement envoyée à l'administration et au médecin le plus proche.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulation du triage IA
    setTimeout(() => {
      const isSevere = true; // Simule la détection d'un cas grave par l'IA
      
      const botResponse = { 
        id: Date.now() + 1, 
        text: isSevere 
          ? "Analyse en cours... Les symptômes décrits nécessitent une prise en charge immédiate. Je déclenche une alerte." 
          : "Analyse en cours... Ce cas ne semble pas critique. Je vous oriente vers une téléconsultation.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);

      if (isSevere) {
        setTimeout(() => {
          const alertMsg = { 
            id: Date.now() + 2, 
            text: "ALERTE ENVOYÉE : L'administration et le médecin le plus proche ont été notifiés. Restez en ligne et en sécurité, de l'aide arrive.", 
            sender: 'bot',
            isAlert: true 
          };
          setMessages(prev => [...prev, alertMsg]);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="chat-container">
      
      <div className="chat-header bot-urgence">
        <button className="back-btn" onClick={() => navigate(-1)} style={{position: 'relative', top: '0', left: '0', marginRight: '10px'}}>
          <FaArrowLeft />
        </button>
        <div className="chat-avatar avatar-red"><FaRobot /></div>
        <div className="chat-header-info">
          <h2>Triage d'Urgence IA</h2>
          <p style={{color: '#ef4444'}}>Priorité haute</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
            {msg.isAlert ? (
              <div className="alert-banner">
                <FaExclamationTriangle size={20} />
                {msg.text}
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input 
          className="chat-input"
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Décrivez l'urgence..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{borderColor: '#fecaca'}} // Légère touche rouge
        />
        <button className="chat-send-btn btn-urgent" onClick={handleSend}>Alerte</button>
      </div>

    </div>
  );
};

export default Urgences;