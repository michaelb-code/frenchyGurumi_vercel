import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Vous n'êtes pas authentifier!"));
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