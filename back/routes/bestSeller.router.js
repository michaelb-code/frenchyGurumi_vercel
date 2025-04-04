import express from "express";
// import { verifyToken } from "../middlewares/auth.js";
import Commande from "../models/commande.model.js";
import Article from "../models/article.model.js";

const router = express.Router();

// Route pour obtenir les 5 articles les plus vendus
router.get("/", async (req, res) => {
    try {
        // Vérifier d'abord si nous avons des commandes
        const commandes = await Commande.find();
        console.log("Nombre de commandes trouvées:", commandes.length);
        console.log("Structure d'une commande:", JSON.stringify(commandes[0], null, 2));

        // Vérifier si nous avons des articles
        const articles = await Article.find();
        console.log("Nombre d'articles trouvés:", articles.length);

        const bestSellers = await Commande.aggregate([
            { $unwind: "$articles" },
            {
                $group: {
                    _id: "$articles.article",  // Changé de articleId à article
                    totalVendus: { $sum: "$articles.quantite" }
                }
            },
            { $sort: { totalVendus: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "articles",
                    localField: "_id",
                    foreignField: "_id",
                    as: "detailsArticle"
                }
            },
            { $unwind: "$detailsArticle" },
            {
                $project: {
                    _id: 1,
                    totalVendus: 1,
                    nom: "$detailsArticle.nom",
                    prix: "$detailsArticle.prix",
                    description: "$detailsArticle.description",
                    photo: "$detailsArticle.photo"
                }
            }
        ]);
        console.log("Résultat de l'agrégation:", bestSellers);
        res.status(200).json(bestSellers);
    } catch (error) {
        console.error("Erreur lors de la récupération des meilleures ventes:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des meilleures ventes" });
    }
});

export default router;
