import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Création du contexte
export const CartContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export const useCart = () => {
    return useContext(CartContext);
};

// Provider du contexte
export const CartProvider = ({ children }) => {
    // État local pour stocker les articles du panier
    const [cart, setCart] = useState([]);
    const { auth } = useAuth(); // Utiliser le contexte d'authentification
    
    // Obtenir l'ID utilisateur pour stocker le panier
    const getUserId = () => {
        return auth && auth.data && auth.data._id ? auth.data._id : 'guest';
    };
    
    // Clé de stockage unique pour chaque utilisateur
    const getCartKey = () => `cart_${getUserId()}`;

    // Charger le panier depuis le localStorage au premier rendu et à chaque changement d'utilisateur
    useEffect(() => {
        const loadCart = () => {
            const cartKey = getCartKey();
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Erreur lors du chargement du panier:', error);
                    setCart([]);
                }
            } else {
                // Si pas de panier pour cet utilisateur, panier vide
                setCart([]);
            }
        };
        
        loadCart();
    }, [auth]); // Réexécuter quand l'utilisateur change

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        const cartKey = getCartKey();
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }, [cart, auth]);

    // Ajouter un article au panier
    const addToCart = (article) => {
        // Vérifier si l'article est déjà dans le panier
        const existingItemIndex = cart.findIndex(item => item._id === article._id);

        if (existingItemIndex >= 0) {
            // Si l'article existe déjà, mettre à jour la quantité
            const newCart = [...cart];
            newCart[existingItemIndex].quantity = (article.quantity || 1) + (newCart[existingItemIndex].quantity || 0);
            setCart(newCart);
        } else {
            // Sinon, ajouter l'article avec la quantité spécifiée ou 1 par défaut
            setCart([...cart, { ...article, quantity: article.quantity || 1 }]);
        }
    };

    // Supprimer un article du panier
    const removeFromCart = (articleId) => {
        setCart(cart.filter(item => item._id !== articleId));
    };

    // Vider le panier
    const clearCart = () => {
        setCart([]);
    };

    // Calculer le total du panier
    const getTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.prix * (item.quantity || 1));
        }, 0);
    };

    // Mettre à jour la quantité d'un article
    const updateQuantity = (articleId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(articleId);
            return;
        }

        const newCart = cart.map(item => {
            if (item._id === articleId) {
                return { ...item, quantity };
            }
            return item;
        });

        setCart(newCart);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            getTotal,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;