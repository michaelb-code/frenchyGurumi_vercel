import express from "express" 
import mongoose from "mongoose" //pour la connexion a la base de donnee mongo
import {env} from "./config/index.js"
import cookieParser from "cookie-parser"
import cors from "cors"

//ROUTES 
import userRoutes from "./routes/user.router.js" //ceci est mon import des routes user
import avisRoutes from "./routes/avis.router.js" //ceci est mon import des routes avis
import articleRoutes from "./routes/article.router.js" //ceci est mon import des routes article
import commandeRoutes from "./routes/commande.router.js" //ceci est mon import des routes commande
import categorieRoutes from "./routes/categorie.router.js" //ceci est mon import des routes categorie
//route pour recuperer les meilleurs ventes
import bestSellerRoutes from "./routes/bestSeller.router.js" //ceci est mon import des routes best-seller
//route pour recuperer les messages
import contactRoutes from "./routes/contact.router.js" //ceci est mon import des routes contact

// APP EXPRESS
const app = express() //crée une nouvelle application Express un genre de point de depart

// PORT
const PORT = process.env.PORT || 8080

// DATABASE MONGOOSE 
// connexion a la base de donnee
mongoose.connect(env.MONGO_URI)//connexion a la base de donnee mongo via l'uri stockée dans mes variables d'environnement
.then(() => console.log("Connexion à la base de donnée mongo DB réussie !"))// affiche le message de connexion dans la console
.catch((error) => console.log("Problème de connexion à la base de donnée mongo DB",error))// affiche le message d'erreur dans la  console 

//MIDDLEWARE

// const allowedOrigin = ["http://localhost:3000",
//     "https://frenchy-gurumi-vercel.vercel.app",
//     "https://frenchy-gurumi-vercel-ouak.vercel.app"];

// app.use(cors({
//     origin: function(origin, callback) {
//         if (!origin || allowedOrigin.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
    
//     // vercel permet de pouvoir accéder au backend depuis le front
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    
// }));
// en local (voir faire une condition)
// app.use(cors());
//pour production ligne

app.use(cors({
    origin: [`https://frenchy-gurumi-vercel-oauk.vercel.app`,
            'http://localhost:3000',
            `https://frenchy-gurumi-vercel.vercel.app`,
            ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// MIDDLEWARES pour gerer les requetes options
app.options("*", cors());

app.use(express.json());// permet de lire le corps de la requete en json
app.use(express.urlencoded({ extended: true })); // permet de lire le corps de la requete en urlencoded
app.use(cookieParser());// permet de lire les cookies enoyé par le navigateur

// Servir les fichiers statiques du dossier upload
app.use("/uploads", express.static("uploads"));

//PREFIX ROUTES
app.use("/api/user", userRoutes)// le préfixe pour toutes les routes user
app.use("/api/avis", avisRoutes) // le préfixe pour toutes les routes avis
app.use("/api/article", articleRoutes) // le préfixe pour toutes les routes article
app.use("/api/commande", commandeRoutes) // le préfixe pour toutes les routes commande
app.use("/api/categorie", categorieRoutes) // le préfixe pour toutes les routes categorie
app.use("/api/best-seller", bestSellerRoutes) // le préfixe pour toutes les routes best-seller
app.use("/api/contact", contactRoutes) // le préfixe pour toutes les routes contact


// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http: //localhost:${PORT}`)
})

