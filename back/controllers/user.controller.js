import Model from "../models/user.model.js"; // Import du model user (schema)
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";

//fonction pour la creation de compte

export const signup = async (req, res) => {
    try {
        //verification des champs sont presents:
        const requiredFields = ["nom","prenom","email","password","sexe","date_naissance","adresse","code_postal","ville","telephone"];

        const FieldsMissing = requiredFields.find((field) => !req.body[field]);
        
        if (FieldsMissing) {    
            return res
                .status(400)
                .json({ message: `Champ ${FieldsMissing} manquant` }); //message erreur pour specifier que le champ précis qui est manquant
        }
        //verification que l'utilisateur n'existe pas deja via son email
        const userExists = await Model.findOne({ email: req.body.email });
        if (userExists) {
            res.status(400).json({ message: "Cet utilisateur existe déjà!" }); //message erreur pour specifier que l'utilisateur existe deja
        }

        //hashage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //permet le cryptage du mot de passe
        req.body.password = hashedPassword;

        //creation du compte
        await Model.create(req.body); //crée le compte avec les infos fournies par le user
        res.status(201).json({ message: `Création du compte de ${req.body.nom} ${req.body.prenom} créé avec succés!`}); //message de succes

    } catch (error) {
        console.log("Erreur lors de la création du compte", error);

        res.status(500).json({ message: "Erreur lors de la création du compte" });
    }
};

//fonction pour la connexion du user

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" }); //message erreur pour specifier que tous les champs sont obligatoires
        }
        const user = await Model.findOne({ email: req.body.email }).select(
            "+password"
        ); //findOne permet de trouver un user par son email
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" }); //message erreur pour specifier que l'utilisateur n'a pas ete trouver
        }
        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        ); //compare le mot de passe fourni par le user avec celui stocké dans la base de donnee
        if (!passwordValid) {
            return res
                .status(401)
                .json({ message: "Email ou Mot de passe incorrect" }); //message erreur pour specifier que le mot de passe est incorrect
        }
        const token = jwt.sign({ id: user._id, role: user.role }, env.TOKEN, { expiresIn: "24h" }); //sign permet de signer le token avec l'id du user

        const userObject = user.toObject();//permet de convertir le doc mongoose en objet js
        delete userObject.password;//supprime le mot de passe de l'objet user

        res.cookie('access_token', token, {
            httpOnly: true,
        });

        res.status(200).json({
            message: "Connexion reussie",
            token: token,
            data: userObject,
        }); //message de connexion reussie

    } catch (error) {
        console.log("Erreur lors de la connexion", error);
        res.status(500).json({ message: "Erreur lors de la connexion" })
        // next(error);
    }
};

//fonction pour recuperer tous les users

export const getUsers = async (req, res) => {
    try {
    
        const users = await Model.find(); //find permet de recuperer tous les users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Utilisateurs non trouvés" });
        }
        res
            .status(200)
            .json({
                message: "Tous les utilisateurs ont bien été recupérés",
                data: users,
            });
    } catch (error) {
        console.log("Erreur lors de la recuperation des utilisateurs", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la recuperation des utilisateurs" });
    }
};

// fonction pour recuperer un user par leur id

export const getUserById = async (req, res) => {
    try {
        // const userConnectedId = req.user.id;
        const userConnectedRole = req.user.role;

        //verifier des droits 
        const isAdmin = userConnectedRole === "admin";
        // const hisAccount = String(userConnectedId) === String(req.params.id);

        

        const user = await Model.findById(req.params.id); // le findbyid permet de recuperer un user par son id

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        } //message erreur pour spécifier que l'utilisateur n'a pas ete trouver

        const userObject = user.toObject(); //permet de convertir le doc mongoose en objet js

        //mot de passe non affiché
        req.user.password = undefined;

        if(!isAdmin) {
            delete userObject.role;
            delete userObject.isAdmin;
        }

        return res.status(200).json({ message: `Utilisateur${user.prenom} trouvé`, data: userObject });
    } catch (error) {

        console.log("Erreur lors de la récuperation de l'utilisateur", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récuperation de l'utilisateur" });
    }
};

// fonction pour modifier un user par son id

export const updateUser = async (req, res) => {
    try {
        const userConnectedId = req.user.id;
        const userConnectedRole = req.user.role;

        //verifier des droits 
        const isAdmin = userConnectedRole === "admin";
        const hisAccount = String(userConnectedId) === String(req.params.id);

        //si user ou admin nest pas le bon = message erreur 
        if (!isAdmin && !hisAccount) {
            return res.status(403).json({ message: "Vous n'avez pas les droits pour modifier cet utilisateur" });
        }

        // verif mdp update par son utilisateur
        if (req.body.password) {
            if(!hisAccount){
                return res.status(403).json({ message: "Vous n'avez pas les droits pour modifier le mot de passe de cet utilisateur" });
            }
            //hashage du mot de passe
            const newPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = newPassword;
        }

        //Empeche un admin de modifier le mot de passe
        if (isAdmin && !hisAccount && req.body.password) {
            return res.status(403).json({ message: "Vous n'avez pas les droits pour modifier le mot de passe de cet utilisateur" });
        }

        //empeche la modification de date_inscription
        if (req.body.date_inscription) {
            delete req.body.date_inscription;
        }

        //empeche la modification de role
        if (req.body.role || req.body.isAdmin) {
            return res.status(403).json({ message: "Vous n'avez pas les droits pour modifier le role de cet utilisateur" });
        }

        const user = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,//permet de retourner l'utilisateur mis a jour
        }); // le findbyidandupdate permet de modifier un user par son id

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        return res
            .status(200)
            .json({ message: `Les modifications de ${user.prenom} ont bien été apportées`, data: user });
    } catch (error) {
        console.log("Erreur lors de la modification de l'utilisateur", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalide" });
        }
        res
            .status(500)
            .json({ message: "Erreur lors de la modification de l'utilisateur" });
    }
};

//fonction pour supprimer un user avec son id

export const deleteUser = async (req, res) => {
    try {

        //verification (via le token)si le user est connecté
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: "Token manquant / Non autorisé" });
        }

        //info sur le token pour obtenir les infos du user connecté
        let tokenVerif;
        try{
        tokenVerif = jwt.verify(token, env.TOKEN);

    } catch (error) {
        return res.status(401).json({ message: "Token invalide / ou expiré" });
    }

        const userConnectedId = tokenVerif.id;
        const userConnectedRole = tokenVerif.role;

        //verification du role du user connecté pour savoir si il peut supprimer un user
        if (userConnectedRole !== "admin" && userConnectedId !== req.params.id) {
            return res.status(403).json({ message: "Vous n'avez pas les droits nécessaires pour effectuer cette action" });
        }

        const user = await Model.findByIdAndDelete(req.params.id); // le findbyidanddelete permet de supprimer un user par son id
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        return res
            .status(200)
            .json({
                message: `Utilisateur ${user.prenom} a bien été supprimé`, //j'utilise user.prenom pour specifier le prenom de l'utilisateur
                data: user,
            });
    } catch (error) {
        console.log("Erreur lors de la suppression de l'utilisateur", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalide" });
        }
        res
            .status(500)
            .json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};
