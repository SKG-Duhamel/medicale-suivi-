import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import './ChatInterface.css';

const Messagerie = () => {
  const navigate = useNavigate();
  const { modeUrgence, setModeUrgence } = useOutletContext() || {};
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'assistant virtuel SuiviHealth. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  // Scroll automatique vers le dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ajuster la hauteur du textarea automatiquement
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // Si le mode urgence est activé, changer le message d'accueil
  useEffect(() => {
    if (modeUrgence) {
      setMessages([
        { id: 1, text: "⚠️ Service d'urgence SuiviHealth. Veuillez décrire précisément la situation d'urgence. Si le cas est grave, une alerte sera immédiatement envoyée à l'administration et au médecin le plus proche.", sender: 'bot' }
      ]);
    } else {
      setMessages([
        { id: 1, text: "Bonjour ! Je suis l'assistant virtuel SuiviHealth. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
      ]);
    }
  }, [modeUrgence]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (modeUrgence) {
      // Comportement du mode urgence
      setTimeout(() => {
        const isSevere = true;
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
    } else {
      // Comportement normal du chatbot
      setTimeout(() => {
        const botResponse = { 
          id: Date.now() + 1, 
          text: "Je comprends votre souci. Laissez-moi vérifier la disponibilité des médecins... Dr. Sophie Martin est actuellement en ligne. Souhaitez-vous démarrer une téléconsultation avec elle ?", 
          sender: 'bot',
          action: 'consultation'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
            {msg.isAlert ? (
              <div className="alert-banner">
                <FaRobot size={20} />
                {msg.text}
              </div>
            ) : (
              msg.text
            )}
            {msg.action === 'consultation' && !modeUrgence && (
              <button className="chat-action-btn" onClick={() => navigate('/patient/consultation')}>
                Démarrer la consultation
              </button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={textareaRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={modeUrgence ? "Décrivez l'urgence..." : "Décrivez vos symptômes..."}
          style={modeUrgence ? { borderColor: '#fecaca' } : {}}
          rows={1}
        />
        <button className={`chat-send-btn ${modeUrgence ? 'btn-urgent' : ''}`} onClick={handleSend}>
          {modeUrgence ? 'Alerte' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
};

export default Messagerie;