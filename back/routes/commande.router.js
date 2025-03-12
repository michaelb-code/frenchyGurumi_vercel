import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import { allCommandes, createCommande, getCommandeById, updateCommande, deleteCommande } from "../controllers/commande.controller.js";

const router = express.Router();

router.get("/get", allCommandes);
router.get("/get/:id", getCommandeById);
router.post("/create", createCommande);
router.put("/update/:id", updateCommande);
router.delete("/delete/:id", deleteCommande);



export default router;