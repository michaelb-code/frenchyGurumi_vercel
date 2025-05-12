import React, { useState } from "react";
import styles from './Sign.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import { RGXR, validateField } from "../../Utils/regexx";
import { useAuth } from "../../context/AuthContext";

const Sign = () => {
    const notify = () => {
        if (auth) {
            toast.success("Connexion réussie", { position: "top-center", autoClose: 2500 });
        } else {
            toast.error("Connexion échouée", { position: "top-center", autoClose: 2500 });
        }
    };
    const { auth, login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: { isValid: true, message: '' },
        password: { isValid: true, message: '' },
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = RGXR[name];

        if (regex) {
            const result = validateField(value, regex, name);
            setFormErrors(prev => ({
                ...prev,
                [name]: result
            }));
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({
            email: { isValid: true, message: '' },
            password: { isValid: true, message: '' },
        });

        try {
            await login(formData);
            notify();

        } catch (error) {
            console.log(error);
            setFormErrors(prev => ({
                ...prev,
                password: { isValid: false, message: error.message || "Connexion echouée" },
            }));
            notify();
        }
    };

    return (
        <>
            <ToastContainer/>
            <div className={styles.blockSign}>
                <div className={styles.signContainer}>
                    <h1 className={`${styles.heading} text-center mb-4`}>Connexion</h1>

                    {formErrors.password.isValid === false && (
                        <div className="alert alert-danger" role="alert">
                            {formErrors.password.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required placeholder="Email"
                            className={`${styles.input} ${!formErrors.email.isValid && formData.email ? styles.inputError : ''}`} />
                        {!formErrors.email.isValid && formData.email && (
                            <div className={styles.errorText}>{formErrors.email.message}</div>
                        )}

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required placeholder="Mot de passe"
                            className={`${styles.input} ${!formErrors.password.isValid && formData.password ? styles.inputError : ''}`} />
                        {!formErrors.password.isValid && formData.password && (
                            <div className={styles.errorText}>{formErrors.password.message}</div>
                        )}

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

