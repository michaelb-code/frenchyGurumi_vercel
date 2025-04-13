import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { useAuth } from "../../context/AuthContext";
import URL from '../../constant/api';
import { RGXR, validateField } from '../../Utils/regexx';

// import css
import styles from './Register.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserRegister = () => {
    const { loading } = useSelector((state) => state.user);
    const notify = () => toast.success('Utilisateur créé avec succès', { autoClose: 2500, position: "top-center" });
    const navigate = useNavigate();
    const { auth } = useAuth();

     // Déterminer si l'utilisateur actuel est un administrateur
    //  en verifiant si auth existe , si les données utilisateur existent et si le role de l'utilisateur est admin
    const isAdmin = auth && auth.data && auth.data.role === 'admin';

    const [user, setUser] = useState({
        isActive: true,
        nom: '',
        prenom: '',
        date_naissance: '',
        sexe: '',
        email: '',
        password: '',
        adresse: '',
        code_postal: '',
        ville: '',
        telephone: '',
        role: 'user', // Par défaut, l'utilisateur est un utilisateur

    });
    const [formErrors, setFormErrors] = useState({
        nom: { isValid: true, message: '' },
        prenom: { isValid: true, message: '' },
        date_naissance: { isValid: true, message: '' },
        sexe: { isValid: true, message: '' },
        email: { isValid: true, message: '' },
        password: { isValid: true, message: '' },
        adresse: { isValid: true, message: '' },
        code_postal: { isValid: true, message: '' },
        ville: { isValid: true, message: '' },
        telephone: { isValid: true, message: '' },
        role: { isValid: true, message: '' },
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        const regex = RGXR[name];
        
        if (regex) {
            const result = validateField(value, regex, name);
            setFormErrors(prev => ({
                ...prev,
                [name]: result
            }));
        }
        
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Vérifier si tous les champs sont valides
        const isFormValid = Object.values(formErrors).every(field => field.isValid);
        
        if (!isFormValid) {
            toast.error('Veuillez corriger les erreurs dans le formulaire.', { autoClose: 2500, position: "top-center" });
            return;
        }
        
        try {
            const response = await fetch(URL.CREATE_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la creation de l'utilisateur");
            }

            const data = await response.json();
            console.log("Utilisateur créé", data);
            notify();
            setTimeout(() => {
                navigate('/');
            }, 2500);

        } catch (error) {
            console.error(error.message);
        }
    };

    if (loading) return <div className={styles.loading}><img src="/Logo/LogoMarque.jpg" alt="loading" />
        <p className={styles.loadingTest}>Chargement...</p>
    </div>

return (
    <div className={styles.registerContainer}>
        <h1 className={styles.heading}>Inscription</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className="container py-5">
                <input type="text" name="nom" onChange={handleChange} placeholder="Nom*" required className={`${styles.input} ${!formErrors.nom.isValid && user.nom ? styles.inputError : ''}`} />
                {!formErrors.nom.isValid && user.nom && (
                    <div className={styles.errorText}>{formErrors.nom.message}</div>
                )}
                
                <input type="text" name="prenom" onChange={handleChange} placeholder="Prenom*" required className={`${styles.input} ${!formErrors.prenom.isValid && user.prenom ? styles.inputError : ''}`} />
                {!formErrors.prenom.isValid && user.prenom && (
                    <div className={styles.errorText}>{formErrors.prenom.message}</div>
                )}

                <input type="date" name="date_naissance" onChange={handleChange} placeholder="Date de naissance*" required className={`${styles.input} ${!formErrors.date_naissance.isValid && user.date_naissance ? styles.inputError : ''}`} />

                <select name="sexe" value={user.sexe} onChange={handleChange} placeholder="Sexe*" required className={styles.select}>
                    <option value="">Sélectionnez votre sexe*</option>
                    <option value="masculin">Masculin</option>
                    <option value="feminin">Feminin</option>
                </select>

                <input type="email" name="email" onChange={handleChange} placeholder="Email*" required className={`${styles.input} ${!formErrors.email.isValid && user.email ? styles.inputError : ''}`} />
                {!formErrors.email.isValid && user.email && (
                    <div className={styles.errorText}>{formErrors.email.message}</div>
                )}

                <input type="password" name="password" onChange={handleChange} placeholder="Mot De Passe*" required className={`${styles.input} ${!formErrors.password.isValid && user.password ? styles.inputError : ''}`} />
                {!formErrors.password.isValid && user.password && (
                    <div className={styles.errorText}>{formErrors.password.message}</div>
                )}

                <input type="text" name="adresse" onChange={handleChange} placeholder="Adresse*" required className={`${styles.input} ${!formErrors.adresse.isValid && user.adresse ? styles.inputError : ''}`} />
                {!formErrors.adresse.isValid && user.adresse && (
                    <div className={styles.errorText}>{formErrors.adresse.message}</div>
                )}

                <input type="text" name="code_postal" onChange={handleChange} placeholder="Code postal*" required className={`${styles.input} ${!formErrors.code_postal.isValid && user.code_postal ? styles.inputError : ''}`} />
                {!formErrors.code_postal.isValid && user.code_postal && (
                    <div className={styles.errorText}>{formErrors.code_postal.message}</div>
                )}

                <input type="text" name="ville" onChange={handleChange} placeholder="Ville*" required className={`${styles.input} ${!formErrors.ville.isValid && user.ville ? styles.inputError : ''}`} />
                {!formErrors.ville.isValid && user.ville && (
                    <div className={styles.errorText}>{formErrors.ville.message}</div>
                )}

                <input type="text" name="telephone" onChange={handleChange} placeholder="Telephone*" required className={`${styles.input} ${!formErrors.telephone.isValid && user.telephone ? styles.inputError : ''}`} />
                {!formErrors.telephone.isValid && user.telephone && (
                    <div className={styles.errorText}>{formErrors.telephone.message}</div>
                )}

                {isAdmin && (
                    <select name="role" value={user.role} onChange={handleChange} placeholder="Role*" required className={styles.select}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                )}
                <div className={styles.containerBtn}>
                    <button type="submit" className={`${styles.button} btn btn-primary`}>S'inscrire</button>
                    <ToastContainer />
                    <p className={styles.paragraph}>Vous avez un compte,<a href="/login" > connectez-vous ici</a></p>
                </div>
            </div>
        </form>
    </div>
);
};

export default UserRegister;
