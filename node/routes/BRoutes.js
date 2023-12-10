import express from "express";
import { getAllIngredientes } from "../controllers/IngredientsController.js";

const router = express.Router();

router.get('/', getAllIngredientes);

export default router;