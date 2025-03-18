import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import Article from "../models/article.model.js";
import Avis from "../models/avis.model.js";
import User from "../models/user.model.js";


//Fonction pour recuperer tous les articles
export const allArticles = async (req, res) => {
    try{
        // if(req.user.role !== "admin"){
        //     return res.status(403).json({ message: "Vous n'avez pas les droits pour recuperer tous les articles" });
        // }

        const orderList = req.query.sort === 'desc' ? -1 : 1;//-1 pour decroissant et 1 pour croissant
        const articles = await Article.find().sort({price: orderList});
        
        const message = orderList === -1 
        //message pour indiquer l'ordre dans lequel sont triés les articles
        ? "Tous les articles ont bien été recupérés dans l'ordre décroissant" 
        : "Tous les articles ont bien été recupérés dans l'ordre croissant";

        res.status(200).json({articles,
            tri : orderList === -1 ? "desc" : "asc",
            message: message });
    } catch (error) {

        console.log(error, "Erreur lors de la recuperation des articles")

        return res.status(500).json({ error: error.message, message: "Erreur lors de la recuperation des articles" });
    }
}

//fontion pour créer un article:
export const createArticle = async (req, res) => {
    try{
        // if (req.user.role !== "admin"){
        //     return res.status(403).json({ message: "Vous n'avez pas les droits pour crée un article" });
        // }

        //verification des champs du corps de la requete
        const fieldsChecked = ["marque","nom","categorie","description","photo","prix","status","stock"];

        const fieldsMissing = fieldsChecked.find((field) => !req.body[field]);

        if (fieldsMissing) {
            return res.status(400).json({ message: `Le champ ${fieldsMissing} est obligatoire pour la création d'un article` });
        }

        //recuperation des fichiers immages depuis la requete
        const images = req.files;

        const PathImgExtrated = images.reduce((acc, file, index) => {
            if(acc[`img`]) acc[`img${index}`] = `/uploads/${file.filename}`;
            else acc[`img`]= `/uploads/${file.filename}`;
            return acc;
        }, {});

        
        const articleData = {...req.body, 
            photo: PathImgExtrated.img,
            avis: req.body.avis || []};


        const newArticle = await Article.create(articleData);
        res.status(201).json({message: "Article créé avec succés", data: newArticle});
    } catch (error){

        console.log("Erreur lors de la création de l'article", error)

        res.status(500).json({ message: "Erreur lors de la création de l'article",error: error.message });
    }

} 

//fonction pour recuperer un article par son id
export const getArticleById = async (req, res) => {
    try{
        // if (req.user.role !== "admin"){
        //     return res.status(403).json({ message: "Vous n'avez pas les droits pour recuperer cet article" });
        // }

        const article = await Article.findById(req.params.id)
        .populate('user')
        .populate('avis');
        if (!article){ 
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json({article, message: `Article  ${article.nom}  trouvé` });
    } catch (error) {
        console.log(error, "Erreur lors de la recuperation de l'article");
        return res.status(500).json({ error: error.message });
    }
}

//fonction pour mettre a jour un article
export const updateArticle = async (req, res) => {
    try{
        // if (req.user.role !== "admin"){
        //     return res.status(403).json({ message: "Vous n'avez pas les droits pour modifier cet article" });
        // }
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user')
        .populate('avis');
        if (!article){ 
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json({article,  message: `Article  ${article.nom}  modifié avec succés`});
    } catch (error) {
        console.log(error, "Erreur lors de la modification de l'article");
        return res.status(500).json({ error: error.message });
    }
}

//fonction pour supprimer un article
export const deleteArticle = async (req, res) => {
    try{
        // if (req.user.role !== "admin"){
        //     return res.status(403).json({ message: "Vous n'avez pas les droits pour supprimer cet article" });
        // }

        const article = await Article.findByIdAndDelete(req.params.id)
        .populate('user')
        .populate('avis');
        if (!article){ 
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json({article,  message: `Article  ${article.nom}  supprimé avec succés` });
    } catch (error) {
        console.log(error, "Erreur lors de la suppression de l'article");
        return res.status(500).json({ error: error.message });
    }
}