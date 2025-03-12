import mongoose from "mongoose"; //bibliotheque pour linteraction avec mongodb

const SchemaCommande = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // relation avec le model user
        required: true,
    },
    articles: [
        {
            article: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article", // relation avec le model article
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    statut: {
        type: String,
        enum: ["en attente", "traitement", "livraison", "termine"],
        default: "en attente"
    },
    mode_de_paiement: {
        type: String,
        enum: "card",
        default: "card"
    },
    timestamp: true
});

export default mongoose.model("Commande", SchemaCommande);