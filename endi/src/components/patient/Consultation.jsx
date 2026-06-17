import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
// import medecinPhoto from './components/patient/Capture.PNG';
import './Consultation.css';

function Consultation() {
    // RÉCUPÉRATION DES FILTRES DEPUIS LA BARRE DE NAVIGATION 
    const { rechercheConsultation, typeConsultation, modeConsultation } = useOutletContext();
    
    // ÉTAT POUR L'HISTORIQUE DES CONSULTATIONS 
    const [historiqueConsultations, setHistoriqueConsultations] = useState([
        { id: 1, date: '2024-11-20', medecin: 'Dr. Kamga Jean', type: 'Généraliste', mode: 'Messagerie' },
        { id: 2, date: '2024-11-15', medecin: 'Dr. Ngo Marie', type: 'Cardiologue', mode: 'Appel vidéo' },
        { id: 3, date: '2024-11-10', medecin: 'Dr. Fouda Paul', type: 'Généraliste', mode: 'Messagerie' },
        { id: 4, date: '2024-11-05', medecin: 'Dr. Djoko Alice', type: 'Pédiatre', mode: 'Appel vidéo' },
        { id: 5, date: '2024-10-28', medecin: 'Dr. Mbarga Charles', type: 'Dermatologue', mode: 'Messagerie' }
    ]);

    // LISTE DES MÉDECINS AVEC PHOTOS ET PRIX 
    const [medecins, setMedecins] = useState([
        {
            id: 1,
            nom: 'Dr. Kamga Jean',
            specialite: 'Généraliste',
            type: 'generaliste',
            photo: '/images/medecin1.jpg', 
            icone: 'fas fa-user-md',       
            aPhoto: true,                  
            note: 4.8,
            experience: '12 ans',
            disponibilite: 'Disponible aujourd\'hui',
            modeConsultation: ['messagerie', 'video'],
            prix: 5000                     // Prix en FCFA pour Généraliste
        },
        {
            id: 2,
            nom: 'Dr. Ngo Marie',
            specialite: 'Cardiologue',
            type: 'specialiste',
            photo:'/Capture.PNG',
            icone: 'fas fa-user-md',
            aPhoto: true,
            note: 4.9,
            experience: '15 ans',
            disponibilite: 'Disponible demain',
            modeConsultation: ['messagerie', 'video'],
            prix: 10000
        },
        {
            id: 3,
            nom: 'Dr. Fouda Paul',
            specialite: 'Généraliste',
            type: 'generaliste',
            photo: '/images/medecin3.jpg',
            icone: 'fas fa-user-md',
            aPhoto: true,
            note: 4.7,
            experience: '8 ans',
            disponibilite: 'Disponible aujourd\'hui',
            modeConsultation: ['messagerie', 'video'],
            prix: 5000
        },
        {
            id: 4,
            nom: 'Dr. Djoko Alice',
            specialite: 'Pédiatre',
            type: 'specialiste',
            photo: '/images/medecin4.jpg',
            icone: 'fas fa-user-md',
            aPhoto: true,
            note: 4.9,
            experience: '10 ans',
            disponibilite: 'Disponible cette semaine',
            modeConsultation: ['messagerie', 'video'],
            prix: 10000
        },
        {
            id: 5,
            nom: 'Dr. Mbarga Charles',
            specialite: 'Dermatologue',
            type: 'specialiste',
            photo: '',
            icone: 'fas fa-user-md',
            aPhoto: false,
            note: 4.6,
            experience: '7 ans',
            disponibilite: 'Disponible aujourd\'hui',
            modeConsultation: ['messagerie', 'video'],
            prix: 10000
        },
        {
            id: 6,
            nom: 'Dr. Atangana Beatrice',
            specialite: 'Gynécologue',
            type: 'specialiste',
            photo: '',
            icone: 'fas fa-user-md',
            aPhoto: true,
            note: 4.9,
            experience: '14 ans',
            disponibilite: 'Disponible demain',
            modeConsultation: ['messagerie'],
            prix: 10000
        }
    ]);

    /**
     * Filtre les médecins selon la recherche, le type et le mode de consultation
     * @returns {Array} - Liste des médecins filtrés
     */
    const medecinsFiltres = medecins.filter(medecin => {
        // Filtrage par type (Généraliste ou Spécialiste)
        if (typeConsultation && medecin.type !== typeConsultation) {
            return false;
        }
        
        // Filtrage par mode de consultation (Messagerie ou Appel vidéo)
        if (modeConsultation && !medecin.modeConsultation.includes(modeConsultation)) {
            return false;
        }
        
        // Filtrage par recherche textuelle (nom ou spécialité)
        if (rechercheConsultation && rechercheConsultation.trim() !== '') {
            const rechercheLower = rechercheConsultation.toLowerCase();
            return medecin.nom.toLowerCase().includes(rechercheLower) ||
                   medecin.specialite.toLowerCase().includes(rechercheLower);
        }
        
        return true;
    });

    /**
     * Gère l'action de consultation (messagerie ou appel vidéo)
     * @param {Object} medecin - Le médecin sélectionné
     */
    const handleConsulter = (medecin) => {
        // Récupération du mode de consultation actuel
        const mode = modeConsultation === 'messagerie' ? 'Messagerie' : 'Appel vidéo';
        
        // Ajout de la consultation dans l'historique
        const nouvelleConsultation = {
            id: Date.now(), // ID unique basé sur le timestamp
            date: new Date().toISOString().split('T')[0], // Date du jour au format YYYY-MM-DD
            medecin: medecin.nom,
            type: medecin.specialite,
            mode: mode
        };
        
        // Mise à jour de l'historique (la nouvelle consultation en premier)
        setHistoriqueConsultations([nouvelleConsultation, ...historiqueConsultations]);
        
        // Affichage du message de confirmation
        if (modeConsultation === 'messagerie') {
            alert(`📨 Démarrage de la messagerie avec ${medecin.nom}`);
        } else {
            alert(`📹 Lancement de l'appel vidéo avec ${medecin.nom}`);
        }
    };

    /**
     * Formate le prix en FCFA avec le symbole
     * @param {number} prix - Le prix à formater
     * @returns {string} - Le prix formaté
     */
    const formaterPrix = (prix) => {
        return prix.toLocaleString('fr-FR') + ' FCFA';
    };

    /**
     * Récupère l'icône ou la photo du médecin
     * @param {Object} medecin - Le médecin
     * @returns {JSX.Element} - L'élément à afficher
     */
    const renderPhotoMedecin = (medecin) => {
        if (medecin.aPhoto && medecin.photo) {
            // Si le médecin a une photo, on l'affiche
            return <img src={medecin.photo} alt={medecin.nom} className="medecin-photo-img" />;
        } else {
            // Sinon on affiche l'icône par défaut
            return <i className={medecin.icone}></i>;
        }
    };

    return (
        <div className="consultation-container">
            {/* PARTIE GAUCHE : LISTE DES MÉDECINS */}
            <div className="consultation-gauche">
                {/* En-tête de la section consultation */}
                <div className="consultation-header">
                    <h1>Consultation médicale</h1>
                    <p>Trouvez un médecin et consultez-le en ligne</p>
                </div>

                {/* Affichage si aucun médecin ne correspond aux filtres */}
                {medecinsFiltres.length === 0 ? (
                    <div className="aucun-resultat">
                        <i className="fas fa-user-md"></i>
                        <h3>Aucun médecin trouvé</h3>
                        <p>Essayez de modifier vos critères de recherche</p>
                    </div>
                ) : (
                    /* GRILLE DES MÉDECINS */
                    <div className="medecins-grid">
                        {medecinsFiltres.map(medecin => (
                            <div key={medecin.id} className="carte-medecin">
                                <div className='grand'>
                                  {/* Photo ou icône du médecin */}
                                  <div className="medecin-photo">
                                      {renderPhotoMedecin(medecin)}
                                  </div>
                                
                                  {/* Informations du médecin */}
                                  <div className="medecin-info">
                                      <h3>{medecin.nom}</h3>
                                      <p className="specialite">{medecin.specialite}</p>
                                      
                                      {/* Détails supplémentaires : note et expérience */}
                                      <div className="medecin-details">
                                          <span className="note">
                                              <i className="fas fa-star"></i> {medecin.note}
                                          </span>
                                          <span className="experience">
                                              <i className="fas fa-briefcase"></i> {medecin.experience}
                                          </span>
                                      </div>
                                      
                                      {/* Disponibilité du médecin */}
                                      <p className="disponibilite">
                                          <i className="fas fa-calendar-check"></i> {medecin.disponibilite}
                                      </p>
                                      
                                      {/* Prix de la consultation */}
                                      <p className="prix-consultation">
                                          <i className="fas fa-money-bill-wave"></i> 
                                          {formaterPrix(medecin.prix)}
                                      </p>
                                    
                                      {/* Modes de consultation disponibles */}
                                      <div className="modes-consultation">
                                          {medecin.modeConsultation.includes('messagerie') && (
                                              <span className="mode-badge messagerie">
                                                  <i className="fas fa-comment-dots"></i> Messagerie
                                              </span>
                                          )}
                                          {medecin.modeConsultation.includes('video') && (
                                              <span className="mode-badge video">
                                                  <i className="fas fa-video"></i> Appel vidéo
                                              </span>
                                          )}
                                    </div>  
                                  </div>
                                </div>
                                
                                {/* Bouton de consultation */}
                                <button 
                                    className="btn-consulter"
                                    onClick={() => handleConsulter(medecin)}
                                    disabled={!medecin.modeConsultation.includes(modeConsultation)}
                                >
                                    <i className={modeConsultation === 'messagerie' ? 'fas fa-comment-dots' : 'fas fa-video'}></i>
                                    Consulter
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PARTIE DROITE : HISTORIQUE DES CONSULTATIONS */}
            <div className="consultation-droite">
                <div className="historique-header">
                    <h3>
                        <i className="fas fa-history"></i> Historique des consultations
                    </h3>
                    <span className="nombre-consultations">
                        {historiqueConsultations.length} consultation{historiqueConsultations.length > 1 ? 's' : ''}
                    </span>
                </div>
                
                {/* Liste des consultations dans l'historique */}
                <div className="historique-liste">
                    {historiqueConsultations.length === 0 ? (
                        <div className="aucun-historique">
                            <i className="fas fa-calendar-plus"></i>
                            <p>Aucune consultation effectuée</p>
                        </div>
                    ) : (
                        historiqueConsultations.map(consultation => (
                            <div key={consultation.id} className="historique-item">
                                <div className="historique-date">
                                    <i className="fas fa-calendar-day"></i>
                                    <span>{consultation.date}</span>
                                </div>
                                <div className="historique-info">
                                    <p className="historique-medecin">{consultation.medecin}</p>
                                    <p className="historique-specialite">{consultation.type}</p>
                                    <span className={`historique-mode ${consultation.mode === 'Messagerie' ? 'mode-messagerie' : 'mode-video'}`}>
                                        <i className={consultation.mode === 'Messagerie' ? 'fas fa-comment-dots' : 'fas fa-video'}></i>
                                        {consultation.mode}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Consultation;