import mongoose from "mongoose"; // bibliotheque pour linteraction avec mongodb
import mongooseUniqueValidator from "mongoose-unique-validator";//plugin pour ameliorer la gestion des champs uniques

const userSchema = mongoose.Schema({
        //structure des champs user 
        //chaque user devra fournir les infos qui suit pour créer son compte
        // avatar: {
        //         type: String,
                
        // },
        nom: {
                type: String,
                required: true
        },
        prenom: {
                type: String,
                required: true
        },
        date_naissance: {
                type: Date,
                required: true
        },
        sexe: {
                type: String,
                enum: ["masculin", "feminin"],
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },
        adresse: {
                type: String,
                required: true
        },
        code_postal: {
                type: String,
                required: true
        },
        ville: {
                type: String,
                required: true
        },
        telephone: {
                type: String,
                required: true
        },
        role: {
                type: String,
                enum: ["admin", "user"],
                default: "user"
        },
        date_inscription: {
                type: Date,
                default: Date.now
        }
},
        { timestamps: { createdAt: true } }
)
userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model("User", userSchema)