import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Panier.module.css";

const Panier = () => {
    const { cart, removeFromCart, getTotal } = useCart();

    return (
        <div className="container py-4">
            <div className={styles.block}>
                <div className={styles.blockTitre}>
                    <h3 className={styles.h3}>Mon Panier</h3>
                    <div className={styles.blockIcon}>
                        <img style={{ width: '30px', height: '30px' }} src="/photoIcon/basket-shop.png" alt="icône panier" />
                    </div>
                </div>
            </div>
            <hr className={styles.hr} />

            {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Votre panier est vide</p>
                    <Link to="/" className="btn btn-primary">Continuer mes achats</Link>
                </div>
            ) : (
                <div className={styles.cartContainer}>
                    <div className="row">
                        <div className="col-md-8">
                            {cart.map((item) => (
                                <div key={item._id} className={styles.cartItem}>
                                    <div className={styles.cartItemImage}>
                                        <img src={item.image || "/Logo/LogoMarque.jpg"} alt={item.nom} />
                                    </div>
                                    <div className={styles.cartItemDetails}>
                                        <h4>{item.nom}</h4>
                                        <p className={styles.description}>{item.description}</p>
                                        <p className={styles.price}>{item.prix} €</p>
                                        <button 
                                            className={styles.removeButton}
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <div className={styles.orderSummary}>
                                <h4>Récapitulatif de commande</h4>
                                <div className={styles.summaryItem}>
                                    <span>Sous-total</span>
                                    <span>{getTotal()} €</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span>Livraison</span>
                                    <span>Gratuite</span>
                                </div>
                                <hr />
                                <div className={styles.summaryTotal}>
                                    <span>Total</span>
                                    <span>{getTotal()} €</span>
                                </div>
                                <button className={styles.checkoutButton}>
                                    Passer la commande
                                </button>
                                <Link to="/" className={styles.continueShoppingLink}>
                                    Continuer mes achats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Panier;
