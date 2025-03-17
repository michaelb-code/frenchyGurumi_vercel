import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import URL from '../../constant/api';
import { useSelector } from 'react-redux';
import styles from './Register.module.css';



const UserRegister = () => {
    const { loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
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
        role: '',

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

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
                throw new Error(errorData.message || 'Erreur lors de la creation de l\'utilisateur');
            }

            const data = await response.json();
            console.log("Utilisateur créé", data);
            navigate('/');
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
                    <input type="text" name="nom" onChange={handleChange} placeholder="Nom*" required className={styles.input} />

                    <input type="text" name="prenom" onChange={handleChange} placeholder="Prenom*" required className={styles.input} />

                    <input type="date" name="date_naissance" onChange={handleChange} placeholder="Date de naissance*" required className={styles.input} />

                    <select name="sexe" value={user.sexe} onChange={handleChange} placeholder="Sexe*" required className={styles.select}>
                        <option value="">Sélectionnez votre sexe*</option>
                        <option value="masculin">Masculin</option>
                        <option value="feminin">Feminin</option>
                    </select>

                    <input type="email" name="email" onChange={handleChange} placeholder="Email*" required className={styles.input} />

                    <input type="password" name="password" onChange={handleChange} placeholder="Mot De Passe*" required className={styles.input} />

                    <input type="text" name="adresse" onChange={handleChange} placeholder="Adresse*" required className={styles.input} />

                    <input type="text" name="code_postal" onChange={handleChange} placeholder="Code postal*" required className={styles.input} />

                    <input type="text" name="ville" onChange={handleChange} placeholder="Ville*" required className={styles.input} />

                    <input type="text" name="telephone" onChange={handleChange} placeholder="Telephone*" required className={styles.input} />

                    <select name="role" value={user.role} onChange={handleChange} placeholder="Role*" required className={styles.select}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className={styles.containerBtn}>
                        <button type="submit" className={`${styles.button} btn btn-primary`}>S'inscrire</button>

                        <p className={styles.paragraph}>Vous avez un compte,<a href="/login" > connectez-vous ici</a></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;
