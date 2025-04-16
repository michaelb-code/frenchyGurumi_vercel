import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormCheckOut from "./FormCheckOut";
import {useCart} from "../context/CartContext";
import { useLocation } from "react-router-dom";


const PUBLIC_KEY =
"pk_test_51R7mnpPdLf44OmPnQef6bgSAGijqvNvXj6OhpJYHNhO185LDQBDLKrKN6NF9kOJXUS9hIxJTFJjvjTmZPCV79Da400AOEK3tLy";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const ContainerStripe = () => {
  const {cart} = useCart();
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // Vérifie si des données ont été passées via location.state (achat direct)
    if (location.state && location.state.article) {
      const { article, quantity } = location.state;
      const articleWithQuantity = { ...article, quantity: quantity || 1 };
      
      // Calcul du prix pour un seul article
      const subtotal = article.prix * (quantity || 1);
      const shipping = 5; // Frais de livraison en euros
      const totalWithShipping = subtotal + shipping;
      
      // Mise à jour des états
      setAmount(Math.round(totalWithShipping * 100)); // Conversion en centimes
      setItems([articleWithQuantity]);
    } else {
      // Sinon, utilise le panier complet
      const subtotal = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);
      const shipping = 5; // Frais de livraison en euros
      const totalWithShipping = subtotal + shipping;
      
      setAmount(Math.round(totalWithShipping * 100));
      setItems(cart);
    }
  }, [location.state, cart]);

  const displayItems = items.length > 0 ? items : cart;
  const subtotal = displayItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  const shipping = 5;
  const totalWithShipping = subtotal + shipping;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Finaliser votre commande</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Récapitulatif</h5>
            </div>
            <div className="card-body">
              {displayItems.length === 0 ? (
                <p className="text-center">Votre panier est vide</p>
              ) : (
                <>
                  {displayItems.map((item, index) => (
                    <div key={item._id || index} className="d-flex justify-content-between mb-2">
                      <span>{item.nom} x {item.quantity}</span>
                      <span>{(item.prix * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mb-2">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Livraison</span>
                    <span>{shipping.toFixed(2)} €</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>{totalWithShipping.toFixed(2)} €</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {displayItems.length > 0 ? (
            <Elements stripe={stripeTestPromise}>
              <FormCheckOut amount={amount} items={displayItems} />
            </Elements>
          ) : (
            <div className="card">
              <div className="card-body text-center">
                <p>Ajoutez des articles à votre panier pour procéder au paiement</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ContainerStripe;