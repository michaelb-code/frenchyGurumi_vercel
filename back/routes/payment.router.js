import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";


dotenv.config();
const router = express.Router();

// initialisation de stripe avec la clé secrete
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    console.log("Amount:", amount);
    console.log("Payment Method ID:", paymentMethodId);

    // creation du paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, //le montant est en centime
      currency: "eur",
      payment_method_types: ["card"],
      description: "Paiement pour l'achat d'un article",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ message: "paiement effectué", success: true });
  } catch (error) {
    console.log("Error ...:", error);

    res.status(500).json({ error: "paiement echoué", success: false });
  }
});

export default router;
