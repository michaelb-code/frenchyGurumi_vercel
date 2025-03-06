import mongoose from "mongoose"; //bibliotheque pour linteraction avec mongodb

const schemaArticle = mongoose.Schema({
    marque: {
        type: String,
        required: true,
        
    },

    nom: {
        type: String,
        required: true,
        unique: true,
    },

    categorie: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    // photo: {
    //     type: String, 
    //     required: true, 
    //     // img: {},
    //     // img1: {},
    //     // img2: {}
    // },

    prix: {
        type: Number,
        required: true,
    },

    avis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avis",
    }],
    
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    
    stock: {
        type: Number,
        required: true,
    },

    status: {
        type: Boolean,
        required: true,
    },
},
    {
        timestamps:{createdAt: true, updatedAt: true}
});

export default mongoose.model("Article", schemaArticle);


