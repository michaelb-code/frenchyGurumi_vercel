import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import mongoose, { Mongoose } from "mongoose";
import Article from "../models/article.model.js";
import Avis from "../models/avis.model.js";
import User from "../models/user.model.js";

//fonction pour la creation d'un avis
export const createAvis = async (req, res) => {
    try {
        let userId = req.body.user;
        let articleId = req.body.article;
        let user, article;

        console.log("données recues!", { userId, articleId, body: req.body })

        // Vérification de l'utilisateur
        if (mongoose.Types.ObjectId.isValid(userId)) {
            console.log("recherche par id:", userId);
            user = await User.findById(userId);
            console.log("user trouvé:", user);
            
        } else {
            const { prenom, email } = req.body.user;
            if (!prenom || !email) {
                return res.status(400).json({ message: "Utilisateur non trouvé" });
            }
            user = await User.findOne({ prenom, email });
        }

        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }
        console.log("Utilisateur trouvé:", user.prenom);

        // Vérification de l'article
        if (mongoose.Types.ObjectId.isValid(articleId)) {
            article = await Article.findById(articleId);
        } else {
            article = await Article.findOne({ nom: articleId });
        }
        
        if (!article) {
            return res.status(400).json({ message: "Article non trouvé" });
        }
        console.log("article trouvé", article.nom);

        //verification de la note
        const note = req.body.rating;
        if (note < 0 || note > 5) {
            return res.status(400).json({ message: "Note invalide / la note doit etre comprise entre 0 et 5" });
        }

        //creation de lavis
        const newAvis = await Avis.create({
            user: user._id,
            article: article._id,
            note: note,
            commentaire: req.body.comment
        });

        // ajouter lavis a l'article
        await Article.findByIdAndUpdate(article._id, { $push: { avis: newAvis._id } });

        const avisfull = await Avis.findById(newAvis._id)
            .populate("user", "prenom")
            .populate("article", "nom");

        res.status(201).json({ message: "Avis créé avec succés", data: avisfull });
    } catch (error) {
        console.log("Erreur lors de la création de l'avis", error);
        res.status(500).json({ message: "Erreur lors de la création de l'avis" });
    }
};

//Fonction pour recuperer tous les avis
export const getAllAvis = async (req, res) => {
    try {

        const avis = await Avis.find()
            .populate('user')
            .populate('article', 'nom');
        res.status(200).json({ avis, message: "Tous les avis ont bien été recupérés" });
    } catch (error) {
        console.log(error, "Erreur lors de la recuperation des avis");
        return res.status(500).json({ error: error.message });
    }
};

//Fonction pour recuperer un avis par son id
export const getAvisById = async (req, res) => {
    try {
        const avis = await Avis.findById(req.params.id)
            .populate('user')
            .populate('article', 'nom');
        if (!avis) {
            return res.status(404).json({ message: "avis non trouvé" });
        }
        res.status(200).json({ avis, message: "avis trouvé" });
    } catch (error) {
        console.log(error, "Erreur lors de la recuperation de l'avis");
        return res.status(500).json({ error: error.message });
    }
};

// fonction pour recuperer un avis par l'id de l'article
export const getAvisByArticleId = async (req, res) => {
    try {
        const avis = await Avis.find({ article: req.params.id })
            .populate('user')
            .populate('article', 'nom');
        if (!avis) {
            return res.status(404).json({ message: "avis non trouvé" });
        }
        res.status(200).json({ avis, message: "avis trouvé" });
    } catch (error) {
        console.log(error, "Erreur lors de la recuperation de l'avis");
        return res.status(500).json({ error: error.message });
    }
};

//fonction pour recuperer un avis grace au nom de l'article
export const getAvisByArticleName = async (req, res) => {
    try {
        //pour recuperer l'article par son nom
        const article = await Article.findOne({ nom: req.params.name });
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        //pour recuperer tous les avis d'un article
        const avis = await Avis.find({ article: article._id })
            .populate('user')
            .populate('article', 'nom');

        if (!avis || avis.length === 0) {
            return res.status(404).json({ message: "Aucun avis trouvé pour cette article" });
        }

        res.status(200).json({ avis, message: `${avis.length} avis trouvés pour l'article ${article.nom}` });
    } catch (error) {
        console.log(error, "Erreur lors de la recuperation de l'avis");
        return res.status(500).json({ error: error.message });
    }
};

// Fonction pour mettre a jour un avis
export const updateAvis = async (req, res) => {
    try {
        //recuperer l'avis existant
        const avisExist = await Avis.findById(req.params.id)
            .populate('user')
            .populate('article');

        if (!avisExist) {
            return res.status(404).json({ message: "avis non trouvé" });
        }

        //verification si user est bien celui qui a fait l'avis
        if (avisExist.user._id.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Vous ne pouvez pas modifier cet avis, seul son auteur peut le modifier." });
        }

        //si user == createur de lavis
        const updatedAvis = await Avis.findByIdAndUpdate(req.params.id, {
            rating: req.body.rating,
            comment: req.body.comment
        },
            { new: true })

            .populate({
                path: 'user',
                select: 'prenom'
            })
            .populate({
                path: 'article',
                select: 'nom'
            });

        if (!updatedAvis) {
            return res.status(404).json({ message: "avis non trouvé" });
        }

        res.status(200).json({
            updatedAvis, //objet avis complet mis a jour
            prenom: updatedAvis.user.prenom, //prenom de l'utilisateur qui a modifié l'avis
            name: updatedAvis.article.name, //nom de l'article qui a recu l'avis modifié
            message: "avis modifié avec succés"
        });
    } catch (error) {
        console.log(error, "Erreur lors de la modification de l'avis");
        return res.status(500).json({ error: error.message });
    }
};

// Fonction pour supprimer un avis
export const deleteAvis = async (req, res) => {
    try {
        console.log("Tentative de suppression d'avis. User:", req.user);
        console.log("ID de l'avis à supprimer:", req.params.id);

        if (!req.user) {
            return res.status(401).json({ message: "Authentification requise" });
        }
        //recuperartion de lavis avec les infos user et article
        const avis = await Avis.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'prenom'
            })
            .populate({
                path: 'article',
                select: 'nom'
            });
            console.log("Avis trouvé:", avis);
        if (!avis) {
            return res.status(404).json({ message: "avis non trouvé" });
        }
        
         //verification si user est bien celui qui a fait l'avis
        if (avis.user._id.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Vous ne pouvez pas supprimer cet avis, Seul son auteur peut le supprimer." });
        }
        
        //suppression de lavis
        await Avis.findByIdAndDelete(req.params.id);
        res.status(200).json({
            avis, //objet avis complet mis a jour
            prenom: avis.user.prenom, //prenom de l'utilisateur qui a modifié l'avis
            nom: avis.article.nom, //nom de l'article qui a recu l'avis modifié
            message: "votre avis a été supprimé avec succès"
        });
    } catch (error) {
        console.log(error, "Erreur lors de la suppression de l'avis");
        return res.status(500).json({ error: error.message });
    }
};