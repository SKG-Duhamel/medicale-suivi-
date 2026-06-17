import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./RegisterPatient.css";

// cryptage du mot de passe
const simulerCryptageMotDePasse = (motDePasseClair) => {
    return btoa(unescape(encodeURIComponent(motDePasseClair)));
};

function RegisterPatient() {
    const navigate = useNavigate();
    
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [sexe, setSexe] = useState('');
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [afficherConfirmationMotDePasse, setAfficherConfirmationMotDePasse] = useState(false);
    const [estEnChargement, setEstEnChargement] = useState(false);
    
    const [champsTouches, setChampsTouches] = useState({
        nom: false,
        email: false,
        motDePasse: false,
        confirmationMotDePasse: false,
        sexe: false,
    });
    
    const [erreurSoumission, setErreurSoumission] = useState('');
    
    const estNonVide = (valeur) => valeur.trim().length > 0;
    const estEmailValide = (emailStr) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(emailStr);
    const estLongueurMotDePasseValide = (mdp) => mdp.length >= 6;
    
    const obtenirStatutEmail = () => {
        if (!champsTouches.email && email === '') return null;
        if (email.length === 0) return null;
        return estEmailValide(email) ? 'valide' : 'invalide';
    };
    
    const obtenirStatutMotDePasse = () => {
        if (!champsTouches.motDePasse && motDePasse === '') return null;
        if (motDePasse.length === 0) return null;
        return estLongueurMotDePasseValide(motDePasse) ? 'valide' : 'invalide';
    };
    
    const obtenirStatutConfirmation = () => {
        if (!champsTouches.confirmationMotDePasse && confirmationMotDePasse === '') return null;
        if (confirmationMotDePasse.length === 0) return null;
        return (motDePasse === confirmationMotDePasse && estLongueurMotDePasseValide(motDePasse)) ? 'valide' : 'invalide';
    };
    
    const statutEmail = obtenirStatutEmail();
    const statutMotDePasse = obtenirStatutMotDePasse();
    const statutConfirmation = obtenirStatutConfirmation();
    
    const motsDePasseCorrespondent = () => {
        return motDePasse === confirmationMotDePasse;
    };
    
    const gererChangementChamp = (champ, valeur) => {
        switch(champ) {
            case 'nom': setNom(valeur); break;
            case 'email': setEmail(valeur); break;
            case 'motDePasse': setMotDePasse(valeur); break;
            case 'confirmation': setConfirmationMotDePasse(valeur); break;
            default: break;
        }
        setChampsTouches(prev => ({ ...prev, [champ]: true }));
        setErreurSoumission('');
    };
    
    const gererChangementSexe = (valeur) => {
        setSexe(valeur);
        setChampsTouches(prev => ({ ...prev, sexe: true }));
        setErreurSoumission('');
    };
    
    const gererSoumission = async (e) => {
        e.preventDefault();
        
        setChampsTouches({
            nom: true,
            email: true,
            motDePasse: true,
            confirmationMotDePasse: true,
            sexe: true,
        });
        
        setErreurSoumission('');
        
        let erreurs = [];
        if (!estNonVide(nom)) erreurs.push("Le nom est requis.");
        if (!estEmailValide(email)) erreurs.push("Veuillez entrer une adresse email valide.");
        if (!estLongueurMotDePasseValide(motDePasse)) erreurs.push("Le mot de passe doit contenir au moins 6 caractères.");
        
        if (!motsDePasseCorrespondent()) {
            erreurs.push("Les mots de passe ne correspondent pas.");
        }
        
        if (!sexe) erreurs.push("Veuillez sélectionner un sexe.");
        
        if (erreurs.length > 0) {
            setErreurSoumission(erreurs.join(" • "));
            return;
        }
        
        setEstEnChargement(true);
        
        try {
            const motDePasseCrypte = simulerCryptageMotDePasse(motDePasse);
            
            const donnees = {
                nom: nom.trim(),
                email: email.trim().toLowerCase(),
                motDePasseHache: motDePasseCrypte,
                sexe: sexe,
            };
            
            console.log("Inscription - Données envoyées à la base (cryptées) :", donnees);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            navigate('/patient', { 
                state: { 
                    message: `Inscription réussie ! Bienvenue ${nom}. Veuillez vous connecter.` 
                } 
            });
            
        } catch (error) {
            setErreurSoumission("Une erreur technique est survenue. Veuillez réessayer plus tard.");
            setEstEnChargement(false);
        }
    };
    
    return(
        <div className="register-patient-page">
            <div className="register-patient-card">
                <div className="register-inner-padding">
                  <div style={{ position: 'relative' }}>
                     <span className="back-btn" onClick={() => navigate('/accueil-roles')}>
                        <FaArrowLeft /> Retour
                      </span>
                      <div className="register-login-header">
                          <div className="register-logo-sidebar">
                              <div className="register-logo-icon"><i className="fas fa-heartbeat"></i></div>
                              <div className="register-logo-text">Suivi<span>Health</span></div>
                          </div>
                          <h2>Créer un compte</h2>
                          <p className="register-subtitle">Rejoignez SuiviHealth pour gérer votre santé</p>
                      </div>
                  </div>
                    {erreurSoumission && (
                        <div className="register-global-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{erreurSoumission}</span>
                        </div>
                    )}
                    
                    <form onSubmit={gererSoumission}>
                        {/* Champ Nom */}
                        <div className="register-input-group">
                            <div className="register-input-label">
                                <span><i className="fas fa-user register-label-icon"></i> Nom Complèt</span>
                            </div>
                            <div className="register-input-wrapper">
                                <i className="fas fa-user register-input-icon"></i>
                                <input 
                                    type="text"
                                    className="register-input-field"
                                    value={nom}
                                    onChange={(e) => gererChangementChamp('nom', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, nom: true}))}
                                    placeholder="Votre nom complèt"
                                    disabled={estEnChargement}
                                />
                            </div>
                            {champsTouches.nom && !estNonVide(nom) && (
                                <div className="register-error-msg"><i className="fas fa-exclamation-circle"></i> Le nom est obligatoire</div>
                            )}
                        </div>
                        
                        {/* Champ Email */}
                        <div className="register-input-group">
                            <div className="register-input-label">
                                <span><i className="far fa-envelope register-label-icon"></i> Adresse email</span>
                            </div>
                            <div className="register-input-wrapper">
                                <i className="far fa-envelope register-input-icon"></i>
                                <input 
                                    type="email"
                                    className="register-input-field"
                                    value={email}
                                    onChange={(e) => gererChangementChamp('email', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, email: true}))}
                                    placeholder="vidalsteven@gmail.com"
                                    disabled={estEnChargement}
                                />
                                <div className="register-status-icon-right">
                                    {statutEmail === 'valide' && <i className="fas fa-check-circle register-success-marker"></i>}
                                    {statutEmail === 'invalide' && <i className="fas fa-times-circle register-error-marker"></i>}
                                </div>
                            </div>
                            {champsTouches.email && email.length > 0 && statutEmail === 'invalide' && (
                                <div className="register-error-msg"><i className="fas fa-info-circle"></i> Email invalide (ex: nom@gmail.com)</div>
                            )}
                        </div>
                        
                        {/* Champ Mot de passe */}
                        <div className="register-input-group">
                            <div className="register-input-label">
                                <span><i className="fas fa-lock register-label-icon"></i> Mot de passe (min. 6 caractères)</span>
                            </div>
                            <div className="register-input-wrapper">
                                <i className="fas fa-lock register-input-icon"></i>
                                <input 
                                    type={afficherMotDePasse ? "text" : "password"}
                                    className="register-input-field"
                                    value={motDePasse}
                                    onChange={(e) => gererChangementChamp('motDePasse', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, motDePasse: true}))}
                                    placeholder="••••••••"
                                    disabled={estEnChargement}
                                />
                                <div className="register-status-icon-right">
                                    {statutMotDePasse === 'valide' && <i className="fas fa-check-circle register-success-marker"></i>}
                                    {statutMotDePasse === 'invalide' && motDePasse.length > 0 && <i className="fas fa-times-circle register-error-marker"></i>}
                                    <button type="button" className="register-password-toggle" onClick={() => setAfficherMotDePasse(!afficherMotDePasse)} disabled={estEnChargement}>
                                        <i className={afficherMotDePasse ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </button>
                                </div>
                            </div>
                            {champsTouches.motDePasse && motDePasse.length > 0 && !estLongueurMotDePasseValide(motDePasse) && (
                                <div className="register-error-msg"><i className="fas fa-key"></i> 6 caractères minimum requis</div>
                            )}
                            {champsTouches.motDePasse && motDePasse.length === 0 && (
                                <div className="register-error-msg"><i className="fas fa-lock"></i> Mot de passe requis</div>
                            )}
                        </div>
                        
                        {/* Champ Confirmation mot de passe */}
                        <div className="register-input-group">
                            <div className="register-input-label">
                                <span><i className="fas fa-check-circle register-label-icon"></i> Confirmation mot de passe</span>
                            </div>
                            <div className="register-input-wrapper">
                                <i className="fas fa-redo-alt register-input-icon"></i>
                                <input 
                                    type={afficherConfirmationMotDePasse ? "text" : "password"}
                                    className="register-input-field"
                                    value={confirmationMotDePasse}
                                    onChange={(e) => gererChangementChamp('confirmation', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, confirmationMotDePasse: true}))}
                                    placeholder="Confirmer le mot de passe"
                                    disabled={estEnChargement}
                                />
                                <div className="register-status-icon-right">
                                    {statutConfirmation === 'valide' && <i className="fas fa-check-circle register-success-marker"></i>}
                                    {statutConfirmation === 'invalide' && confirmationMotDePasse.length > 0 && <i className="fas fa-times-circle register-error-marker"></i>}
                                    <button type="button" className="register-password-toggle" onClick={() => setAfficherConfirmationMotDePasse(!afficherConfirmationMotDePasse)} disabled={estEnChargement}>
                                        <i className={afficherConfirmationMotDePasse ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </button>
                                </div>
                            </div>
                            {champsTouches.confirmationMotDePasse && confirmationMotDePasse.length > 0 && motDePasse !== confirmationMotDePasse && (
                                <div className="register-error-msg" style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                    <i className="fas fa-exclamation-triangle"></i> ⚠️ Les mots de passe ne correspondent pas !
                                </div>
                            )}
                            {champsTouches.confirmationMotDePasse && confirmationMotDePasse.length === 0 && (
                                <div className="register-error-msg"><i className="fas fa-question-circle"></i> Confirmation requise</div>
                            )}
                            {champsTouches.confirmationMotDePasse && confirmationMotDePasse.length > 0 && motDePasse === confirmationMotDePasse && estLongueurMotDePasseValide(motDePasse) && (
                                <div className="register-success-msg">
                                    <i className="fas fa-check-circle"></i> ✓ Les mots de passe correspondent
                                </div>
                            )}
                        </div>
                        
                        {/* Sélection du sexe */}
                        <div className="register-gender-group">
                            <div className="register-gender-title">
                                <i className="fas fa-venus-mars"></i> Sexe
                            </div>
                            <div className="register-radio-container">
                                <label className="register-radio-option">
                                    <input type="radio" name="sexe" value="homme" checked={sexe === 'homme'} onChange={() => gererChangementSexe('homme')} disabled={estEnChargement} /> Homme
                                </label>
                                <label className="register-radio-option">
                                    <input type="radio" name="sexe" value="femme" checked={sexe === 'femme'} onChange={() => gererChangementSexe('femme')} disabled={estEnChargement} /> Femme
                                </label>
                            </div>
                            {champsTouches.sexe && !sexe && (
                                <div className="register-error-msg register-gender-error"><i className="fas fa-asterisk"></i> Veuillez sélectionner un sexe</div>
                            )}
                        </div>
                        
                        <button type="submit" className="register-btn-register" disabled={estEnChargement}>
                            {estEnChargement ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Inscription en cours...
                                </>
                            ) : (
                                "S'inscrire"
                            )}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            Déjà un compte ? <Link to="/login-patient">Se connecter</Link>
                        </p>
                        <p className="register-privacy">
                            En créant un compte, vous acceptez nos <a href="/terms">Conditions d'utilisation</a> et notre <a href="/privacy">Politique de confidentialité</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPatient;