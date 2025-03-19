import React, { createContext, useState, useContext, useEffect } from 'react';

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

    // Charger le panier depuis le localStorage au premier rendu
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Erreur lors du chargement du panier:', error);
                setCart([]);
            }
        }
    }, []);

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Ajouter un article au panier
    const addToCart = (article) => {
        // Vérifier si l'article est déjà dans le panier
        const existingItemIndex = cart.findIndex(item => item._id === article._id);

        if (existingItemIndex >= 0) {
            // Si l'article existe déjà, augmenter la quantité
            const newCart = [...cart];
            newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
            setCart(newCart);
        } else {
            // Sinon, ajouter l'article avec quantité 1
            setCart([...cart, { ...article, quantity: 1 }]);
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