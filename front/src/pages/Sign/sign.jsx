//import du usecontext pour acceder au contexte d'authentification
import React, { useState } from "react";
//import du link pour la navigation
import { Link } from "react-router-dom";
//import de l'api
import styles from './Sign.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from "../../context/AuthContext";




const Sign = () => {
    

    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        try {
            login(formData);
            

        } catch (error) {
            console.log(error);
            setError(error.message || "Connexion echouée");
        }
    };
    return (
        <>
            <div className={styles.blockSign}>
                <div className={styles.signContainer}>
                    <h1 className={`${styles.heading} text-center mb-4`}>Connexion</h1>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* <label htmlFor="email" className="label form-label">Email:</label> */}
                        <input
                            type="email"
                            className={`${styles.input} form-control`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required placeholder="Email"
                        />



                        {/* <label htmlFor="password" className="label form-label">Mot de passe:</label> */}
                        <input
                            type="password"
                            className={`${styles.input} form-control`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required placeholder="Mot de passe"
                        />


                        <button 
                            type="submit"
                            className={`${styles.button} btn btn-primary`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>

                        <div className="text-center mt-3">
                            <p>Pas encore inscrit ?<a href="/register"> Créer un compte ici</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Sign;

