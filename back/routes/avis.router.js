import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import { createAvis, getAllAvis, getAvisById, updateAvis, deleteAvis, getAvisByArticleId, getAvisByArticleName } from "../controllers/avis.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// ROUTES:

router.get("/get", getAllAvis);// ma route pour la recuperation de tous les avis

router.get("/get/:id", getAvisById);// ceci est ma route pour la recuperation d'un avis par son id

//route via article :
router.get("/article/name/:name", getAvisByArticleName);// ceci est ma route pour la recuperation d'un avis par le nom de l'article
router.get("/article/:id", getAvisByArticleId);// ceci est ma route pour la recuperation d'un avis par l'id de l'article

router.post("/create", createAvis);// ceci est ma route pour la creation d'un avis

router.put("/update/:id",verifyToken, updateAvis);// ceci est ma route pour la modification d'un avis par son id
//verification du token pour pouvoir modifier un avis par celui qui l'a fait

router.delete("/delete/:id", verifyToken, deleteAvis);// ceci est ma route pour la suppression d'un avis par son id

export default router;