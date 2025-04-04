import Commande from "../models/commande.model.js";


//FONCTION POUR RECUPERER TOUS LES COMMANDES

export const allCommandes = async (req, res) => {

    try {
        const commandes = await Commande.find().sort({ createdAt: -1 });
        if (!commandes || commandes.length === 0) {
            return res.status(404).json({ message: "Commandes non trouvées" });
        }
        res.status(200).json({ commandes, message: "Toutes les commandes ont bien été récupérées" });
    } catch (error) {
        console.log(error, "Erreur lors de la récupération des commandes");
        res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
};

//FONCTION POUR CREER UNE COMMANDE

export const createCommande = async (req, res) => {
    try {
        const newCommande = await Commande.create(req.body);
        res.status(201).json({ newCommande, message: "Commande créée avec succès" });

    } catch (error) {
        console.log(error, "Erreur lors de la création de la commande");
        res.status(500).json({ message: "Erreur lors de la création de la commande" });
    }
};

//FONCTION POUR RECUPERER UNE COMMANDE PAR SON ID

export const getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ commande, message: `Commande ${commande._id} récupérée` });
    } catch (error) {
        console.log(error, "Erreur lors de la récupération de la commande");
        res.status(500).json({ message: "Erreur lors de la récupération de la commande" });
    }
};

//FONCTION POUR METTRE A JOUR UNE COMMANDE

export const updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true });

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ commande, message: `Commande ${commande._id} modifiée avec succès` });

    } catch (error) {
        console.log(error, "Erreur lors de la modification de la commande");
        res.status(500).json({ message: "Erreur lors de la modification de la commande" });
    }
};

//FONCTION POUR SUPPRIMER UNE COMMANDE

export const deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ commande, message: `Commande ${commande._id} supprimée avec succès` });

    } catch (error) {
        console.log(error, "Erreur lors de la suppression de la commande");
        res.status(500).json({ message: "Erreur lors de la suppression de la commande" });
    }
};



