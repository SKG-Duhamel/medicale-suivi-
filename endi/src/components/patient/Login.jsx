import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./RegisterPatient.css";

// cryptage du mot de passe
const simulerCryptageMotDePasse = (motDePasseClair) => {
    return btoa(unescape(encodeURIComponent(motDePasseClair)));
};

function Login() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [estEnChargement, setEstEnChargement] = useState(false);
    
    const [champsTouches, setChampsTouches] = useState({
        email: false,
        motDePasse: false,
    });
    
    const [erreurSoumission, setErreurSoumission] = useState('');
    
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
    
    const statutEmail = obtenirStatutEmail();
    const statutMotDePasse = obtenirStatutMotDePasse();
    
    const gererChangementChamp = (champ, valeur) => {
        switch(champ) {
            case 'email': setEmail(valeur); break;
            case 'motDePasse': setMotDePasse(valeur); break;
            default: break;
        }
        setChampsTouches(prev => ({ ...prev, [champ]: true }));
        setErreurSoumission('');
    };
    
    const gererSoumission = async (e) => {
        e.preventDefault();
        
        setChampsTouches({
            email: true,
            motDePasse: true,
        });
        
        setErreurSoumission('');
        
        let erreurs = [];
        if (!estEmailValide(email)) erreurs.push("Veuillez entrer une adresse email valide.");
        if (!estLongueurMotDePasseValide(motDePasse)) erreurs.push("Le mot de passe doit contenir au moins 6 caractères.");
        
        if (erreurs.length > 0) {
            setErreurSoumission(erreurs.join(" • "));
            return;
        }
        
        setEstEnChargement(true);
        
        try {
            const motDePasseCrypte = simulerCryptageMotDePasse(motDePasse);
            
            const donnees = {
                email: email.trim().toLowerCase(),
                motDePasseHache: motDePasseCrypte,
            };
            
            console.log("Inscription - Données envoyées à la base (cryptées) :", donnees);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            navigate('/patient', { 
                state: { 
                    message: `Connexion réussie ! Bienvenue ${email}.` 
                } 
            });
            
        } catch (error) {
            setErreurSoumission("Une erreur technique est survenue. Veuillez réessayer plus tard.");
            setEstEnChargement(false);
        }
    };
    const navigation = useNavigate();
    const oublierPWD = () => {
        navigation('/ReinitialiserPWD')
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
                            <h2>Content de vous revoir</h2>
                            <p className="register-subtitle">Connectez-vous à votre compte</p>
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
                                    placeholder="Bastos902@gmail.com"
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
                        <span className="login-forgot-link" onClick={oublierPWD}>Mot de passe oublié ?</span>
                        <button type="submit" className="register-btn-register" disabled={estEnChargement}>
                            {estEnChargement ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Connexion en cours...
                                </>
                            ) : (
                                "Connexion"
                            )}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            Pas encore de compte ?<Link to="/register-patient">Créer un compte</Link>
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
export default Login;