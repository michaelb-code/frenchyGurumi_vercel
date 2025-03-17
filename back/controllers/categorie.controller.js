import Categorie from "../models/categorie.model.js";


// Fonction pour récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "Categories non trouvées" });
        }
        res.status(200).json({ categories, message: "Toutes les catégories ont bien été récupérées" });
    } catch (error) {
        console.log(error, "Erreur lors de la récupération des catégories");
        res.status(500).json({ message: "Erreur lors de la récupération des catégories" });
    }
};

// Fonction pour créer une catégorie
export const createCategorie = async (req, res) => {
    try {
        const newCategorie = await Categorie.create(req.body);
        res.status(201).json({ newCategorie, message: "Catégorie créée avec succès" });
    } catch (error) {
        console.log(error, "Erreur lors de la création de la catégorie");
        res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
    }
};

// Fonction pour récupérer une catégorie par son ID
export const getCategoriesById = async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json({ categorie, message: `La catégorie ${categorie.nom}a été récupérée avec succès` });
    } catch (error) {
        console.log(error, "Erreur lors de la récupération de la catégorie");
        res.status(500).json({ message: "Erreur lors de la récupération de la catégorie" });
    }
};

// Fonction pour mettre à jour une catégorie
export const updateCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json({ categorie, message: `La catégorie ${categorie.nom} a été modifiée avec succès` });
    } catch (error) {
        console.log(error, "Erreur lors de la modification de la catégorie");
        res.status(500).json({ message: "Erreur lors de la modification de la catégorie" });
    }
};

// Fonction pour supprimer une catégorie
export const deleteCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByIdAndDelete(req.params.id);
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json({ categorie, message: `La catégorie ${categorie.nom} a été supprimée avec succès` });
    } catch (error) {
        console.log(error, "Erreur lors de la suppression de la catégorie");
        res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
    }
};