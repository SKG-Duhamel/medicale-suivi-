import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRobot } from 'react-icons/fa';
import './ChatInterface.css';

const Messagerie = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'assistant virtuel SuiviHealth. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Ajout du message utilisateur
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulation de la réponse de l'IA
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: "Je comprends votre souci. Laissez-moi vérifier la disponibilité des médecins... Dr. Sophie Martin est actuellement en ligne. Souhaitez-vous démarrer une téléconsultation avec elle ?", 
        sender: 'bot',
        action: 'consultation' // Clé pour afficher le bouton
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      
      <div className="chat-header bot-assistant">
        <button className="back-btn" onClick={() => navigate(-1)} style={{position: 'relative', top: '0', left: '0', marginRight: '10px'}}>
          <FaArrowLeft />
        </button>
        <div className="chat-avatar avatar-blue"><FaRobot /></div>
        <div className="chat-header-info">
          <h2>Assistant SuiviHealth</h2>
          <p>En ligne</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
            {msg.text}
            {msg.action === 'consultation' && (
              <button className="chat-action-btn" onClick={() => navigate('/consultation')}>
                Démarrer la consultation
              </button>
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
          placeholder="Décrivez vos symptômes..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send-btn" onClick={handleSend}>Envoyer</button>
      </div>

    </div>
  );
};

export default Messagerie;