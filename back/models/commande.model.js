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
            quantite: {
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
        default: Date.now
    },
    statut: {
        type: String,
        enum: ["en attente", "traitement", "livraison","annulée", "termine"],
        default: "en attente"
    },
    mode_de_paiement: {
        type: String,
        enum: ["card"],
        default: "card"
    },
}, { timestamps: true });

export default mongoose.model("Commande", SchemaCommande);