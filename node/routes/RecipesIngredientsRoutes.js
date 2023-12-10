import express from "express";
import { getAllRecipesIngredients } from '../controllers/RecipesIngredientsController.js'

const router = express.Router();

router.get('/', getAllRecipesIngredients);

export default router;