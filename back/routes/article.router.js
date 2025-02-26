import express from "express";
import { createArticle, allArticles, getArticleById, updateArticle, deleteArticle } from "../controllers/article.controller.js";
import {verifyToken} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", createArticle);// ceci est ma route pour la creation d'un article
router.get("/get", allArticles);// ma route pour la recuperation de tous les articles
router.get("/get/:id", getArticleById);// ceci est ma route pour la recuperation d'un article par son id

router.put("/update/:id", updateArticle);// ceci est ma route pour la modification d'un article par son id
//verification du token pour pouvoir modifier un article par celui qui l'a fait

router.delete("/delete/:id",  deleteArticle);// ceci est ma route pour la suppression d'un article par son id
//verification du token pour pouvoir supprimer un article par celui qui l'a fait

export default router; 