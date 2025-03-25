import jwt from "jsonwebtoken";// Bibliothèque pour créer et vérifier les tokens JWT
import { env } from "../config/index.js";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
    // Vérifier d'abord dans l'en-tête Authorization
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extraire le token de l'en-tête (format: "Bearer TOKEN")
        token = authHeader.split(' ')[1];

    } else {

        // Si pas dans l'en-tête, essayer les cookies (pour compatibilité)
        token = req.cookies?.access_token;
    }

    if (!token) {
        return next(createError(401, "Vous n'êtes pas authentifié!"));
    }

    jwt.verify(token, env.TOKEN, (err, user) => {

        if (err) {  
            return next(createError(403, "Token invalide!"));  //message erreur pour specifier que le token est invalide
        } else {  
            req.user = user;
            next(); //pour passer au middleware suivant
        }
    });
};