import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./RegisterPatient.css";

// cryptage du mot de passe
const simulerCryptageMotDePasse = (motDePasseClair) => {
    return btoa(unescape(encodeURIComponent(motDePasseClair)));
};

function ReinitialiserPWD() {
    const navigate = useNavigate();
    
    // Champs du formulaire
    const [code, setcode] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [estEnChargement, setEstEnChargement] = useState(false);

// État des champs touchés et validation UI
    const [champsTouches, setChampsTouches] = useState({
        email: false,
        motDePasse: false,
        code:false,
    });
    
    const [erreurSoumission, setErreurSoumission] = useState('');
    const estCodeValide = (valeur) => valeur.trim().length > 0;
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
    
    const statutEmail = obtenirStatutEmail();
    const statutMotDePasse = obtenirStatutMotDePasse();
    
    // Gestionnaire de changement de champ
    const gererChangementChamp = (champ, valeur) => {
        switch(champ) {
            case 'email': setEmail(valeur); break;
            case 'code': setcode(valeur); break;
            case 'motDePasse': setMotDePasse(valeur); break;
            default: break;
        }
        setChampsTouches(prev => ({ ...prev, [champ]: true }));
        setErreurSoumission('');
    };
    
    // Gestionnaire de soumission
    const gererSoumission = async (e) => {
        e.preventDefault();
        
        // Marquer tous les champs comme touchés
        setChampsTouches({
            email: true,
            code: true,
            motDePasse: true,
        });
        
        setErreurSoumission('');
        
        // Validation des champs
        let erreurs = [];
        if (!estEmailValide(email)) erreurs.push("Veuillez entrer une adresse email valide.");
        if (!estCodeValide(code)) erreurs.push("code reçu par mail.");
        if (!estLongueurMotDePasseValide(motDePasse)) erreurs.push("Le mot de passe doit contenir au moins 6 caractères.");
            
        if (erreurs.length > 0) {
            setErreurSoumission(erreurs.join(" • "));
            return;
        }
        
        setEstEnChargement(true);
        
        try {
            
            // cryptage et envoi à la base de données
            const motDePasseCrypte = simulerCryptageMotDePasse(motDePasse);
                
            // Préparation des données pour l'appel API
            const donnees = {
                email: email.trim().toLowerCase(),
                code:code.trim(),
                motDePasseHache: motDePasseCrypte,
            };
            
            console.log("Inscription - Données envoyées à la base (cryptées) :", donnees);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            navigate('/login-patient', { 
                state: { 
                    message: `Réinitialisation réussie !` 
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
                            <h2>Réinitialiser</h2>
                            <p className="register-subtitle">Mot de passe oublier réinitialiser le ici</p>
                        </div>
                    </div>
                    
                    {erreurSoumission && (
                        <div className="register-global-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{erreurSoumission}</span>
                        </div>
                    )}
                    
                    <form onSubmit={gererSoumission}> 
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
                                    placeholder="gordan34@gmail.com"
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
                                <span><i className="fas fa-lock register-label-icon"></i>Nouveau Mot de passe (min. 6 caractères)</span>
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
                        
                        {/* code reçu par email */}
                        {/* <div className="row-2cols">
                            <div className="register-input-groupC">
                                <div className="register-input-label">
                                    <span><i className="fas fa-lock register-label-icon"></i> code</span>
                                </div>
                                <div className="register-input-wrapper">
                                    <i className="fas fa-lock register-input-icon"></i>
                                    <input 
                                        type="text"
                                        className="register-input-fieldC"
                                        value={code}
                                        onChange={(e) => gererChangementChamp('code', e.target.value)}
                                        onBlur={() => setChampsTouches(prev => ({...prev, code: true}))}
                                        placeholder="Le code reçu par mail"
                                    />
                                </div>
                                {champsTouches.code && !estCodeValide(code) && (
                                    <div className="register-error-msg"><i className="fas fa-exclamation-circle"></i>le code obligatoire</div>
                                )}
                            </div>
                            <button type="submit" className="btn-registerR">
                                Réenvoyer
                            </button>
                        </div> */}
                        <div className="register-input-group">
                            <div className="register-input-label">
                                <span><i className="fas fa-lock register-label-icon"></i> Code</span>
                            </div>
                            <div className="register-input-wrapper">
                                <i className="fas fa-lock register-input-icon"></i>
                                <input 
                                    type="email"
                                    className="register-input-fieldC"
                                    value={code}
                                    onChange={(e) => gererChangementChamp('code', e.target.value)}
                                    onBlur={() => setChampsTouches(prev => ({...prev, email: true}))}
                                    placeholder="Le code reçu par mail"
                                    disabled={estEnChargement}
                                />
                                <button type="submit" className="btn-registerR">
                                    Réenvoyer
                                </button>
                            </div>
                            {champsTouches.code && !estCodeValide(code) && (
                                    <div className="register-error-msg"><i className="fas fa-exclamation-circle"></i>le code obligatoire</div>
                                )}
                        </div>
                        
                        <button type="submit" className="register-btn-register" disabled={estEnChargement}>
                            {estEnChargement ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Reinitialisation en cours...
                                </>
                            ) : (
                                "Reinitialiser"
                            )}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            Déjà un compte ? <Link to="/login-patient">Se connecter</Link>
                        </p>
                        <p className="register-privacy">
                            En vous connectant, vous acceptez nos <a href="/terms">Conditions d'utilisation</a> et notre <a href="/privacy">Politique de confidentialité</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ReinitialiserPWD;