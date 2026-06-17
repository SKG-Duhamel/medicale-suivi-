import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './BarreNavigation.css';

function BarreNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    
    //  ÉTATS DE L'INTERFACE 
    const [sidebarOuverte, setSidebarOuverte] = useState(true);
    const [modeSombre, setModeSombre] = useState(false);
    const [afficherNotifications, setAfficherNotifications] = useState(false);
    const [recherche, setRecherche] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [sidebarMobileOuverte, setSidebarMobileOuverte] = useState(false);
    
    // ÉTAT POUR LE CHATBOT - MODE URGENCE
    const [modeUrgence, setModeUrgence] = useState(false);
    
    //  ÉTATS POUR LES FILTRES DE CONSULTATION 
    const [typeConsultation, setTypeConsultation] = useState('generaliste');
    const [modeConsultation, setModeConsultation] = useState('messagerie');
    const [afficherTypeListe, setAfficherTypeListe] = useState(false);
    const [afficherModeListe, setAfficherModeListe] = useState(false);

    //  DONNÉES STATIQUES 
    const onglets = [
        { id: 'tableau-bord', nom: 'Tableau de bord', icone: 'fas fa-chart-line', path: '/patient/dashboard' },
        { id: 'dossier-medical', nom: 'Dossier médical', icone: 'fas fa-folder-open', path: '/patient/dossier-medical' },
        { id: 'rendez-vous', nom: 'Rendez-vous', icone: 'fas fa-calendar-check', path: '/patient/rendez-vous' },
        { id: 'consultation', nom: 'Consultation', icone: 'fas fa-video', path: '/patient/consultation' },
        { id: 'chatbot', nom: 'Assistant santé', icone: 'fas fa-robot', path: '/patient/messagerie' },
        { id: 'profil', nom: 'Mon profil', icone: 'fas fa-user-circle', path: '/patient/profil' }
    ];

    const types = [
        { id: 'generaliste', nom: 'Généraliste', abreviation: 'G' },
        { id: 'specialiste', nom: 'Spécialiste', abreviation: 'S' }
    ];
    
    const modes = [
        { id: 'messagerie', nom: 'Messagerie', icone: 'fas fa-comment-dots' },
        { id: 'video', nom: 'Appel vidéo', icone: 'fas fa-video' }
    ];

    const [notifications, setNotifications] = useState([
        { id: 1, message: "Rappel : Consultation avec Dr. Kamga demain à 10h", lu: false, date: "2024-11-24" },
        { id: 2, message: "Vos résultats d'analyse sont disponibles", lu: false, date: "2024-11-23" },
        { id: 3, message: "Nouveau message de Dr. Eto'o", lu: true, date: "2024-11-22" }
    ]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarMobileOuverte(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.filtre-type') && !event.target.closest('.filtre-mode')) {
                setAfficherTypeListe(false);
                setAfficherModeListe(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const getActiveOnglet = () => {
        const currentPath = location.pathname;
        const onglet = onglets.find(o => currentPath.includes(o.id) || currentPath === o.path);
        return onglet ? onglet.id : 'tableau-bord';
    };

    const ongletActif = getActiveOnglet();
    const estConsultation = ongletActif === 'consultation';
    const estChatbot = ongletActif === 'chatbot';

    const handleOngletClick = (ongletId, path) => {
        // Si on quitte le chatbot, on désactive le mode urgence
        if (ongletId !== 'chatbot') {
            setModeUrgence(false);
        }
        navigate(path);
        if (isMobile) {
            setSidebarMobileOuverte(false);
        }
        setRecherche('');
    };

    const handleHamburgerClick = () => {
        if (isMobile) {
            setSidebarMobileOuverte(!sidebarMobileOuverte);
        } else {
            setSidebarOuverte(!sidebarOuverte);
        }
    };

    // Gestion du mode urgence
    const handleUrgenceClick = () => {
        setModeUrgence(!modeUrgence);
        // Si on active l'urgence, on navigue vers le chatbot
        if (!modeUrgence) {
            navigate('/patient/messagerie');
        }
    };

    useEffect(() => {
        const modeSauvegarde = localStorage.getItem('modeSombre');
        if (modeSauvegarde === 'true') {
            setModeSombre(true);
            document.body.classList.add('mode-sombre');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('modeSombre', modeSombre);
        if (modeSombre) {
            document.body.classList.add('mode-sombre');
        } else {
            document.body.classList.remove('mode-sombre');
        }
    }, [modeSombre]);

    const marquerCommeLu = (id) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, lu: true } : notif
        ));
    };

    const notificationsNonLues = notifications.filter(n => !n.lu).length;
    
    const getPlaceholder = () => {
        if (estConsultation) {
            return "Rechercher un médecin...";
        }
        return `Rechercher dans ${onglets.find(o => o.id === ongletActif)?.nom || '...'}`;
    };
    
    return (
        <div className="conteneur-principal">
            {isMobile && sidebarMobileOuverte && (
                <div className="sidebar-overlay visible" onClick={() => setSidebarMobileOuverte(false)}></div>
            )}
            
            <div className={`navigation ${!isMobile && !sidebarOuverte ? 'fermee' : ''} ${isMobile && sidebarMobileOuverte ? 'mobile-ouverte' : ''}`}>
                <div className="logo-sidebar">
                    <div className="logo-icon"><i className="fas fa-heartbeat"></i></div>
                    <div className="logo-text">Suivi<span>Health</span></div>
                </div>
                <ul className="nav-sidebar">
                    {onglets.map(onglet => (
                        <li 
                            key={onglet.id}
                            className={`nav-elem ${ongletActif === onglet.id ? 'actif' : ''}`}
                            onClick={() => handleOngletClick(onglet.id, onglet.path)}
                        >
                            <i className={onglet.icone}></i>
                            <span className="texte-onglet">{onglet.nom}</span>
                        </li>
                    ))}
                </ul>
            </div>
        
            <div className={`barre-superieure ${!isMobile && !sidebarOuverte ? 'sidebar-fermee' : ''}`}>
                <div className="gauche-superieure">
                    <button className="btn-hamburger" onClick={handleHamburgerClick}>
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    {estConsultation && (
                        <div className="filtre-type">
                            <button 
                                className="btn-filtre"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAfficherTypeListe(!afficherTypeListe);
                                    setAfficherModeListe(false);
                                }}
                            >
                                {isMobile && window.innerWidth <= 480 ? (
                                    <span className="filtre-abreviation">
                                        {types.find(t => t.id === typeConsultation)?.abreviation}
                                    </span>
                                ) : (
                                    <span className='ttype'>{types.find(t => t.id === typeConsultation)?.nom}</span>
                                )}
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            
                            {afficherTypeListe && (
                                <div className="liste-filtre">
                                    {types.map(type => (
                                        <div 
                                            key={type.id}
                                            className={`option-filtre ${typeConsultation === type.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setTypeConsultation(type.id);
                                                setAfficherTypeListe(false);
                                            }}
                                        >
                                            {type.nom}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {estConsultation && (
                        <div className="filtre-mode">
                            <button 
                                className="btn-filtre"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAfficherModeListe(!afficherModeListe);
                                    setAfficherTypeListe(false);
                                }}
                            >
                                {isMobile && window.innerWidth <= 480 ? (
                                    <i className={modes.find(m => m.id === modeConsultation)?.icone}></i>
                                ) : (
                                    <>
                                        <i className={modes.find(m => m.id === modeConsultation)?.icone}></i>
                                        <span>{modes.find(m => m.id === modeConsultation)?.nom}</span>
                                    </>
                                )}
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            
                            {afficherModeListe && (
                                <div className="liste-filtre">
                                    {modes.map(mode => (
                                        <div 
                                            key={mode.id}
                                            className={`option-filtre ${modeConsultation === mode.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setModeConsultation(mode.id);
                                                setAfficherModeListe(false);
                                            }}
                                        >
                                            <i className={mode.icone}></i>
                                            <span>{mode.nom}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Barre de recherche - cachée sur l'onglet chatbot */}
                    {!estChatbot && (
                        <div className="recherche-wrapper">
                            <i className="fas fa-search"></i>
                            <input 
                                type="text" 
                                placeholder={getPlaceholder()}
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                            />
                        </div>
                    )}
                    {/* Groupe Chatbot + Urgence - Toujours visible sur l'onglet chatbot */}
                    {estChatbot && (
                        <div className="chatbot-urgence-group">
                            <button 
                                className={`btn-chatbot ${modeUrgence ? 'urgence' : ''}`}
                                onClick={handleUrgenceClick}
                            >
                                <i className="fas fa-robot"></i>
                            </button>
                        </div>
                    )}
                </div>
                
                {/* SECTION DROITE - Toujours visible avec tous les éléments */}
                <div className={`droite-superieure ${estConsultation && isMobile ? 'cache-mobile' : ''}`}>
                    
                    {/* Groupe Chatbot + Urgence - Toujours visible sur l'onglet chatbot */}
                    {estChatbot && (
                        <div className="chatbot-urgence-group">
                            <button 
                                className={`btn-urgence ${modeUrgence ? 'actif' : ''}`}
                                onClick={handleUrgenceClick}
                            >
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>Urgence</span>
                            </button>
                        </div>
                    )}
                    {/* Bouton notifications - Toujours visible */}
                    <div className="btn-notification" onClick={() => setAfficherNotifications(!afficherNotifications)}>
                        <i className="fas fa-bell"></i>
                        {notificationsNonLues > 0 && (
                            <span className="badge-notification">{notificationsNonLues}</span>
                        )}
                    </div>
                    
                    <button className="btn-mode-sombre" onClick={() => setModeSombre(!modeSombre)}>
                        <i className={modeSombre ? "fas fa-sun" : "fas fa-moon"}></i>
                    </button>
                    
                    <div className="profile-image" onClick={() => handleOngletClick('profil', '/patient/profil')}>
                        <i className="fas fa-user"></i>
                    </div>
                </div>
            </div>

            {afficherNotifications && (
                <div className="panneau-notifications">
                    <h4><i className="fas fa-bell"></i> Notifications</h4>
                    {notifications.map(notif => (
                        <div key={notif.id} className="notification-item" onClick={() => marquerCommeLu(notif.id)}>
                            <p style={{ fontWeight: notif.lu ? 'normal' : 'bold' }}>{notif.message}</p>
                            <small>{notif.date}</small>
                        </div>
                    ))}
                </div>
            )}
        
            <div className={`zone-contenu ${!isMobile && !sidebarOuverte ? 'sidebar-fermee' : ''}`}>
                <Outlet context={{
                    rechercheConsultation: recherche,
                    typeConsultation,
                    modeConsultation,
                    modeUrgence,
                    setModeUrgence
                }} />
            </div>
        </div>
    );
}

export default BarreNavigation;