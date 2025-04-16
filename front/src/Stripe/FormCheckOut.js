import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import URL from "../constant/api";
import { useNavigate } from "react-router-dom";

const FormCheckOut = ({ amount = 1000, items = [] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe n'est pas encore chargé");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Erreur Stripe:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    console.log("Token Génére : ", paymentMethod);
    // envoi du token dans le backend
    try {
      const { id } = paymentMethod;
      const response = await fetch(`${URL.CREATE_PAYMENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: id,
          amount: amount,
          items: items.map(item => ({
            id: item._id,
            title: item.nom,
            price: item.prix,
            quantity: item.quantity
          }))
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        console.log("Paiement effectué avec succès");
        
        // Redirection après 2 secondes
        setTimeout(() => {
          navigate("/confirmation");
        }, 2000);
      } else {
        setError(data.error || "Erreur lors du paiement");
        console.log("Paiement échoué: " + (data.error || "erreur inconnue"));
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">Paiement sécurisé</h5>
        
        {success ? (
          <div className="alert alert-success">
            Paiement effectué avec succès! Redirection en cours...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="card-element" className="form-label">Informations de carte</label>
              <div className="p-3 border rounded">
                <CardElement
                  id="card-element"
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            {error && (
              <div className="alert alert-danger mb-3">{error}</div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={!stripe || loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Traitement en cours...
                </>
              ) : (
                `Payer ${(amount/100).toFixed(2)} €`
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormCheckOut;