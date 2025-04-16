import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Confirmation = () => {
    const { clearCart } = useCart();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const cartCleared = useRef(false);

    // Si l'utilisateur n'est pas connecté, le rediriger vers la page d'accueil
    useEffect(() => {
        if (!auth || !auth.data) {
            navigate('/');
            return;
        }

        //pour Vider le panier après une commande réussie (seulement une fois)
        if (!cartCleared.current) {
            clearCart();
            cartCleared.current = true;
        }
    }, [auth, navigate, clearCart]);

    // Générer un numéro de commande aléatoire
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    // Date de livraison estimée (entre 4 et 5 jours ouvrés)
    const today = new Date(); //date du jour de la commande 
    const deliveryDate = new Date(today);//copie de la date actuelle pour ne pas changer today
    deliveryDate.setDate(today.getDate() + 5 + Math.floor(Math.random() * 3)); //ajout de 5 jours + 0-2 jours aléatoires
    const formattedDate = deliveryDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className={styles.container}>
            <div className={styles.confettiBg}></div>
            
            <div className={styles.card}>
                <div className={styles.iconContainer}>
                    <div className={styles.iconCircle}>
                        <span className={styles.checkmark}>✓</span>
                    </div>
                </div>
                
                <h1 className={styles.title}>Votre paiement a été confirmé</h1>
                
                <div className={styles.orderDetails}>
                    <div className={styles.orderInfo}>
                        <span>Numéro de commande</span>
                        <strong>#{orderNumber}</strong>
                    </div>
                    
                    <div className={styles.orderInfo}>
                        <span>Livraison estimée</span>
                        <strong>{formattedDate}</strong>
                    </div>
                </div>
                
                <p className={styles.message}>
                    Merci {auth.data.nom} {auth.data.prenom} pour votre commande ! Un email de confirmation a été envoyé à votre adresse. 
                    Vous recevrez une notification lorsque votre colis sera expédié.
                </p>
                
                <div className={styles.buttons}>
                    <Link to="/" className={styles.homeButton}>
                        Retour à l'accueil
                    </Link>
                    <Link to="/profil" className={styles.trackButton}>
                        Suivre ma commande
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;