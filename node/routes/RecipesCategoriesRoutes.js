import express from "express";
import { getAllRecipesCategories } from '../controllers/RecipesCategoriesController.js'

const router = express.Router();

router.get('/', getAllRecipesCategories);

export default router;