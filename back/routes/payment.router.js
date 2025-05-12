import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import Commande from "../models/commande.model.js";
import { envoyerEmailConfirmationCommande } from "../Service/email.service.js";
import User from "../models/user.model.js";

dotenv.config();

const router = express.Router();

// Initialiser Stripe avec la clé secrete
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @route POST /api/payment
 * @desc Traiter un paiement avec Stripe
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const { paymentMethodId, amount, items, userId } = req.body;
    console.log("Amount:", amount);
    console.log("Payment Method ID:", paymentMethodId);
    console.log("User ID:", userId);
    console.log("Items:", items);

    if (!paymentMethodId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Méthode de paiement et montant requis",
      });
    }

    // Créer un paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en centimes
      currency: "eur",
      payment_method_types: ["card"],
      description: `Commande Frenchy-Gurumi - ${new Date().toISOString()}`,
      payment_method: paymentMethodId,
      confirm: true,
    });

    console.log("Payment intent created:", paymentIntent.id);

    // Vérifier l'état du paiement
    if (paymentIntent.status === "succeeded") {
      // Créer une commande dans la base de données
      try {
        // Transformer les items du panier en format attendu par le modèle Commande
        const commandeItems = items.map((item) => ({
          article: item.id,
          quantite: item.quantity,
        }));

        // Calculer le total en euros (pas en centimes)
        const totalEuros = amount / 100;

        // Créer la commande
        const newCommande = await Commande.create({
          user: userId,
          articles: commandeItems,
          total: totalEuros,
          date: new Date(),
          statut: "En traitement",
          mode_de_paiement: "card",
        });

        console.log("Commande créée:", newCommande._id);

        // Récupérer les informations de l'utilisateur pour l'email
        const user = await User.findById(userId);

        if (user && user.email) {
          try {
            // Envoyer l'email de confirmation
            await envoyerEmailConfirmationCommande({
              email: user.email,
              nom: user.nom || user.prenom || "Client",
              commandeId: newCommande._id,
              articles: items,
              total: amount,
            });
            console.log("Email de confirmation envoyé à:", user.email);
          } catch (emailError) {
            console.error(
              "Erreur lors de l'envoi de l'email de confirmation:",
              emailError
            );
            // Ne pas bloquer le processus si l'email échoue
          }
        }

        return res.status(200).json({
          success: true,
          message: "Paiement réussi",
          paymentId: paymentIntent.id,
          commandeId: newCommande._id,
        });
      } catch (dbError) {
        console.error("Erreur lors de la création de la commande:", dbError);
        return res.status(200).json({
          success: true,
          message:
            "Paiement réussi, mais erreur lors de l'enregistrement de la commande",
          paymentId: paymentIntent.id,
        });
      }
    } else if (paymentIntent.status === "requires_action") {
      // Authentification 3D Secure requise
      return res.status(200).json({
        success: false,
        requires_action: true,
        client_secret: paymentIntent.client_secret,
        message: "Authentification supplémentaire requise",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Le paiement a echoué",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error("Erreur de paiement:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors du traitement du paiement",
    });
  }
});

/**
 * @route GET /api/payment/config
 * @desc Récupérer la clé publique Stripe pour le client
 * @access Public
 */
router.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.PUBLIC_KEY,
  });
});

export default router;
