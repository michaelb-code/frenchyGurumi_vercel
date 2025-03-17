import mongoose from "mongoose";

const schemaCategorie = mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Categorie", schemaCategorie);