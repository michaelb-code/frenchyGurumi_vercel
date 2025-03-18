import React, { createContext, useContext } from 'react';
import useCartHook from '../Hooks/useCart';

// Création du contexte
const CartContext = createContext();

// Provider qui va envelopper votre application
export function CartProvider({ children }) {
    // Utilise votre hook useCart existant pour la logique
    const cartUtils = useCartHook();

    return (
        <CartContext.Provider value={cartUtils}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
    }
    return context;
}