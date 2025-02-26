import mongoose from "mongoose"; //bibliotheque pour linteraction avec mongodb

const SchemaAvis = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // relation avec le model user
            required: true,
        },
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article", // relation avec le model article
            required: true,
        },
        // avatar: {
        //     type: String,
        //     required: true,
        // },
        note: {
            type: Number,
            required: true,
        },
        commentaire: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Avis", SchemaAvis);
