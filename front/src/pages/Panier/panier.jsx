import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Panier.module.css";


const Panier = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);
        setTotal(total);
    }, [cart]);

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
                                        <img src={item.photo[0] || "/Logo/LogoMarque.jpg"} alt={item.nom} />
                                    </div>
                                    <div className={styles.cartItemDetails}>
                                        <h4>{item.nom}</h4>
                                        <p className={styles.description}>{item.description}</p>
                                        <p className={styles.price}>{item.prix} €</p>
                                        <div className={styles.quantitySelector}>
                                            <button className={styles.quantityBtn} onClick={() => updateQuantity(item._id, item.quantity - 1)}> - </button>
                                            <span>{item.quantity}</span>
                                            <button className={styles.quantityBtn} onClick={() => updateQuantity(item._id, item.quantity + 1)}> + </button>
                                        </div>
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
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span>Livraison</span>
                                    <span>+5 €</span>
                                </div>
                                <hr />
                                <div className={styles.summaryTotal}>
                                    <span>Total</span>
                                    <span>{(total + 5).toFixed(2)} €</span>
                                </div>
                                <button className="btn btn-primary w-100">
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
