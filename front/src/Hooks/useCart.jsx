// src/hooks/useCart.js
import { useState } from 'react';

function useCart() {
  const [cart, setCart] = useState([]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Calculer le total du panier
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotal
  };
}

export default useCart;
