import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import { allCommandes, createCommande, getCommandeById, updateCommande, deleteCommande } from "../controllers/commande.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get", allCommandes);
router.get("/get/:id", verifyToken, getCommandeById);
router.post("/create", createCommande);
router.put("/update/:id", verifyToken, updateCommande);
router.delete("/delete/:id", verifyToken, deleteCommande);



export default router;