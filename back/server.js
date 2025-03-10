import express from "express" 
import mongoose from "mongoose" //pour la connexion a la base de donnee mongo
import {env} from "./config/index.js"
import cookieParser from "cookie-parser"
import cors from "cors"

//ROUTES 
import userRoutes from "./routes/user.router.js" //ceci est mon import des routes user
import avisRoutes from "./routes/avis.router.js" //ceci est mon import des routes avis
import articleRoutes from "./routes/article.router.js" //ceci est mon import des routes article

// APP EXPRESS
const app = express() //crée une nouvelle application Express un genre de point de depart

// PORT
const PORT = process.env.PORT || 8080

// DATABASE MONGOOSE 
// connexion a la base de donnee
mongoose.connect(env.MONGO_URI)//connexion a la base de donnee mongo via l'uri stockée dans mes variables d'environnement
.then(() => console.log("Connexion à la base de donnée mongo DB réussie !"))// affiche le message de connexion dans la console
.catch((error) => console.log("Problème de connexion à la base de donnée mongo DB",error))// affiche le message d'erreur dans la console 

//MIDDLEWARE

app.use(cors({
    origin: ["http://localhost:3000","https://frenchy-gurumi-vercel.vercel.app","https://frenchy-gurumi-vercel-ouak.vercel.app"], 
    // vercel permet de pouvoir accéder au backend depuis le front
    credentials: true,
}));

app.use(express.json());// permet de lire le corps de la requete en json

app.use(cookieParser());// permet de lire les cookies enoyé par le navigateur


//PREFIX ROUTES
app.use("/api/user", userRoutes)// le préfixe pour toutes les routes user
app.use("/api/avis", avisRoutes) // le préfixe pour toutes les routes avis
app.use("/api/article", articleRoutes) // le préfixe pour toutes les routes article


// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http: //localhost:${PORT}`)
})

