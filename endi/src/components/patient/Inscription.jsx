import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import "./Inscription.css";

    // cryptage du mot de passe
    const simulerCryptageMotDePasse = (motDePasseClair) => {
        // encodage base64 (cryptage/hachage)
        return btoa(unescape(encodeURIComponent(motDePasseClair)));
    };

    function Inscription(){
        // Champs du formulaire
        const [prenom, setPrenom] = useState('');
        const [nom, setNom] = useState('');
        const [email, setEmail] = useState('');
        const [motDePasse, setMotDePasse] = useState('');
        const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
        const [sexe, setSexe] = useState(''); // 'homme', 'femme', 'autre'
        const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
        const [afficherConfirmationMotDePasse, setAfficherConfirmationMotDePasse] = useState(false);
    
    // État des champs touchés / validation UI
    const [champsTouches, setChampsTouches] = useState({
        prenom: false,
        nom: false,
        email: false,
        motDePasse: false,
        confirmationMotDePasse: false,
        sexe: false,
    });
    
    const [erreurSoumission, setErreurSoumission] = useState('');
    
    // Fonctions de validation
    const estNonVide = (valeur) => valeur.trim().length > 0;
    const estEmailValide = (emailStr) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(emailStr);
    const estLongueurMotDePasseValide = (mdp) => mdp.length >= 6;
    
    // Statuts des champs
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
    
    // Gestionnaire de changement de champ
    const gererChangementChamp = (champ, valeur) => {
        switch(champ) {
            case 'prenom': setPrenom(valeur); break;
            case 'nom': setNom(valeur); break;
            case 'email': setEmail(valeur); break;
            case 'motDePasse': setMotDePasse(valeur); break;
            case 'confirmation': setConfirmationMotDePasse(valeur); break;
            default: break;
        }
        setChampsTouches(prev => ({ ...prev, [champ]: true }));
        setErreurSoumission('');
    };
    
    // Gestionnaire de changement de sexe
    const gererChangementSexe = (valeur) => {
        setSexe(valeur);
        setChampsTouches(prev => ({ ...prev, sexe: true }));
        setErreurSoumission('');
    };
    
    // Gestionnaire de soumission
    const gererSoumission = (e) => {
        e.preventDefault();
        
        // Marquer tous les champs comme touchés
        setChampsTouches({
            prenom: true,
            nom: true,
            email: true,
            motDePasse: true,
            confirmationMotDePasse: true,
            sexe: true,
        });
        
        // Validation des champs
        let erreurs = [];
        if (!estNonVide(prenom)) erreurs.push("Le prénom est requis.");
        if (!estNonVide(nom)) erreurs.push("Le nom est requis.");
        if (!estEmailValide(email)) erreurs.push("Veuillez entrer une adresse email valide.");
        if (!estLongueurMotDePasseValide(motDePasse)) erreurs.push("Le mot de passe doit contenir au moins 6 caractères.");
        if (motDePasse !== confirmationMotDePasse) erreurs.push("Les mots de passe ne correspondent pas.");
        if (!sexe) erreurs.push("Veuillez sélectionner un sexe.");
        
        if (erreurs.length > 0) {
            setErreurSoumission(erreurs.join(" • "));
            return;
        }
        
        // Simulation du cryptage et envoi à la base de données
        const motDePasseCrypte = simulerCryptageMotDePasse(motDePasse);
        
        // Préparation des données pour l'appel API
        const donnees = {
            prenom: prenom.trim(),
            nom: nom.trim(),
            email: email.trim().toLowerCase(),
            motDePasseHache: motDePasseCrypte,
            sexe: sexe,
        };
        
        console.log("Inscription - Données envoyées à la base (cryptées) :", donnees);
        alert(`Inscription réussie !\nBienvenue ${prenom} ${nom}.\n\nVotre mot de passe a été crypté avant envoi.\nHash: ${motDePasseCrypte.substring(0, 12)}...`);
    };
    
    // Gestionnaires pour les options d'inscription alternatives
    // const gererInscriptionGoogle = () => alert("Inscription avec Google (simulation)");
    // const gererBiometrique = () => alert("Inscription / connexion biométrique (simulation)");
    

    // pour  etre redirectionner a la page voulu
        const navigation = useNavigate();
    const RedirectionConnexion = () => {
        navigation('/Connexion')
    };
    const Redirectionaccuiel = () => {
        navigation('/Login')
    };
    return(
        <div className="register-card">
            <div className="inner-padding">
<div className="login-header">
                    <div className="logo-sidebar">
                        <div className="logo-icon"><i className="fas fa-heartbeat"></i></div>
                        <div className="logo-text">Suivi<span>Health</span></div>
                    </div>
                    <h2>Créer un compte</h2>
                    <p className="subtitle">Rejoignez SuiviHealth pour gérer votre santé</p>
                </div>

                <div className="brand">
                    <h1>
                        <i class="fas fa-heartbeat"></i>
                        Suivi<span>Health</span> 
                    </h1>
                </div>
                <div className="welcome">
                    {/* <h2>Créer un compte patient</h2> */}
                    <p>Inscrivez-vous pour accéder à votre espace santé sécurisé.</p>
                </div>
                
                {erreurSoumission && (
                    <div className="global-error">
                        <i className="fas fa-exclamation-triangle"></i>
                        <span>{erreurSoumission}</span>
                    </div>
                )}
                
                <form onSubmit={gererSoumission}>
                    {/* Ligne pour Prénom & Nom */}
                    <div className="row-2cols">
                        <div className="input-group">
                            <div className="input-label">
                                <span><i className="fas fa-user label-icon"></i> Nom</span>
                            </div>
                            <div className="input-wrapper">
                                <i className="fas fa-user input-icon"></i>
                                <input 
                                    type="text"
                                    className="input-field"
                                    value={nom}
                                    onChange={(e) => gererChangementChamp('nom', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, nom: true}))}
                                    placeholder="Votre Nom"
                                />
                            </div>
                            {champsTouches.nom && !estNonVide(nom) && (
                                <div className="error-msg"><i className="fas fa-exclamation-circle"></i>le Nom obligatoire</div>
                            )}
                        </div>
                        <div className="input-group">
                            <div className="input-label">
                                <span><i className="fas fa-user label-icon"></i>Prénom</span>
                            </div>
                            <div className="input-wrapper">
                                <i className="fas fa-user input-icon"></i>
                                <input 
                                    type="text"
                                    className="input-field"
                                    value={prenom}
                                    onChange={(e) => gererChangementChamp('prenom', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, prenom: true}))}
                                    placeholder="Votre Prénom"
                                />
                            </div>
                            {champsTouches.prenom && !estNonVide(prenom) && (
                                <div className="error-msg"><i className="fas fa-exclamation-circle"></i>Le Prénom obligatoire</div>
                            )}
                        </div>
                    </div>
                    
                    {/* Champ Email avec validation visuelle */}
                    <div className="input-group">
                        <div className="input-label">
                            <span><i className="far fa-envelope label-icon"></i> Adresse email</span>
                        </div>
                        <div className="input-wrapper">
                            <i className="far fa-envelope input-icon"></i>
                            <input 
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => gererChangementChamp('email', e.target.value)}
                                onBlur={() => setChampsTouches(prev => ({...prev, email: true}))}
                                placeholder="exemple@gmail.com"
                            />
                            {statutEmail === 'valide' && <span className="status-icon-right"><i className="fas fa-check-circle success-marker"></i></span>}
                            {statutEmail === 'invalide' && <span className="status-icon-right"><i className="fas fa-times-circle error-marker"></i></span>}
                        </div>
                        {champsTouches.email && email.length > 0 && statutEmail === 'invalide' && (
                            <div className="error-msg"><i className="fas fa-info-circle"></i> Email invalide (ex: nom@gmail.com)</div>
                        )}
                    </div>
                    
                    {/* Champ Mot de passe avec œil et validation */}
                    <div className="input-group">
                        <div className="input-label">
                            <span><i className="fas fa-lock label-icon"></i> Mot de passe (min. 6 caractères)</span>
                        </div>
                        <div className="input-wrapper">
                            <i className="fas fa-lock input-icon"></i>
                            <input 
                                type={afficherMotDePasse ? "text" : "password"}
                                className="input-field"
                                value={motDePasse}
                                onChange={(e) => gererChangementChamp('motDePasse', e.target.value)}
                                onBlur={() => setChampsTouches(prev => ({...prev, motDePasse: true}))}
                                placeholder="••••••••"
                            />
                            <div style={{ position: 'absolute', right: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'auto' }}>
                                {statutMotDePasse === 'valide' && <i className="fas fa-check-circle success-marker"></i>}
                                {statutMotDePasse === 'invalide' && motDePasse.length > 0 && <i className="fas fa-times-circle error-marker"></i>}
                                <button type="button" className="password-toggle" onClick={() => setAfficherMotDePasse(!afficherMotDePasse)} style={{ position: 'relative', right: 'auto' }}>
                                    <i className={afficherMotDePasse ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </button>
                            </div>
                        </div>
                        {champsTouches.motDePasse && motDePasse.length > 0 && !estLongueurMotDePasseValide(motDePasse) && (
                            <div className="error-msg"><i className="fas fa-key"></i> 6 caractères minimum requis</div>
                        )}
                        {champsTouches.motDePasse && motDePasse.length === 0 && (
                            <div className="error-msg"><i className="fas fa-lock"></i> Mot de passe requis</div>
                        )}
                    </div>
                    
                    {/* Champ Confirmation mot de passe */}
                    <div className="input-group">
                        <div className="input-label">
                            <span><i className="fas fa-check-circle label-icon"></i> Confirmation mot de passe</span>
                        </div>
                        <div className="input-wrapper">
                            <i className="fas fa-redo-alt input-icon"></i>
                            <input 
                                type={afficherConfirmationMotDePasse ? "text" : "password"}
                                className="input-field"
                                value={confirmationMotDePasse}
                                onChange={(e) => gererChangementChamp('confirmation', e.target.value)}
                                onBlur={() => setChampsTouches(prev => ({...prev, confirmationMotDePasse: true}))}
                                placeholder="Confirmer le mot de passe"
                            />
                            <div style={{ position: 'absolute', right: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'auto' }}>
                                {statutConfirmation === 'valide' && <i className="fas fa-check-circle success-marker"></i>}
                                {statutConfirmation === 'invalide' && confirmationMotDePasse.length > 0 && <i className="fas fa-times-circle error-marker"></i>}
                                <button type="button" className="password-toggle" onClick={() => setAfficherConfirmationMotDePasse(!afficherConfirmationMotDePasse)} style={{ position: 'relative', right: 'auto' }}>
                                    <i className={afficherConfirmationMotDePasse ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </button>
                            </div>
                        </div>
                        {champsTouches.confirmationMotDePasse && confirmationMotDePasse.length > 0 && motDePasse !== confirmationMotDePasse && (
                            <div className="error-msg"><i className="fas fa-exclamation-triangle"></i> Les mots de passe ne correspondent pas</div>
                        )}
                        {champsTouches.confirmationMotDePasse && confirmationMotDePasse.length === 0 && (
                            <div className="error-msg"><i className="fas fa-question-circle"></i> Confirmation requise</div>
                        )}
                    </div>
                    
                    {/* Sélection du sexe avec boutons radio */}
                    <div className="gender-group">
                        <div className="gender-title">
                            <i className="fas fa-venus-mars" ></i> Sexe
                        </div>
                        <div className="radio-container">
                            <label className="radio-option">
                                <input type="radio" name="sexe" value="homme" checked={sexe === 'homme'} onChange={() => gererChangementSexe('homme')} /> Homme
                            </label>
                            <label className="radio-option">
                                <input type="radio" name="sexe" value="femme" checked={sexe === 'femme'} onChange={() => gererChangementSexe('femme')} /> Femme
                            </label>
                            {/* <label className="radio-option">
                                <input type="radio" name="sexe" value="autre" checked={sexe === 'autre'} onChange={() => gererChangementSexe('autre')} /> Autre
                            </label> */}
                        </div>
                        {champsTouches.sexe && !sexe && (
                            <div className="error-msg gender-error"><i className="fas fa-asterisk"></i> Veuillez sélectionner un sexe</div>
                        )}
                    </div>
                    
                    <button type="submit" className="btn-register">
                        S'inscrire
                    </button>
                </form>
                
                {/* <button className="btn-google" onClick={gererInscriptionGoogle}>
                    <i className="fab fa-google"></i> Continuer avec Google
                </button> */}
                
                {/* <div className="divider"><span>OU</span></div>
                
                <button className="biometric-btn" onClick={gererBiometrique}>
                    <i className="fas fa-fingerprint"></i> Connexion Biométrique
                </button> */}
                
                <div className="login-redirect">
                    Déjà inscrit ? <span className="login-link" onClick={RedirectionConnexion} style={{marginRight:'10px'}}>Se connecter  </span>
                    <span className="forgot-link" onClick={Redirectionaccuiel}>  Retourner à l'accuiel</span>
                </div>
                
                <div className="footer-links">
                    <span>Confidentialité</span> • <span>Conditions d'utilisation</span>
                </div>
            </div>
        </div>
    );
};

export default Inscription;