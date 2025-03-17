import express from "express";
import { getAllCategories, getCategoriesById, createCategorie, updateCategorie, deleteCategorie } from "../controllers/categorie.controller.js";

const router = express.Router();

router.get("/get", getAllCategories);
router.get("/get/:id", getCategoriesById);
router.post("/create", createCategorie);
router.put("/update/:id", updateCategorie);
router.delete("/delete/:id", deleteCategorie);

export default router;