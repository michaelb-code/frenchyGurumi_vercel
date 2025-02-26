import express from "express"; // express framework pour la creation des routes et pour gerer les requetes
import { signup, signin, getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";




const router = express.Router();
router.post("/signup", signup);// ceci est ma route pour la creation de compte
router.post("/signin", signin);// ceci est ma route pour la connexion du user

router.get("/get", verifyToken, getUsers);// ma route pour la recuperation de tous les users
router.get("/get/:id",verifyToken, getUserById);// ceci est ma route pour la recuperation d'un user par son id

router.put("/update/:id", verifyToken, updateUser);// ceci est ma route pour la modification d'un user par son id

router.delete("/delete/:id", verifyToken, deleteUser);// ceci est ma route pour la suppression d'un user par son id

export default router;