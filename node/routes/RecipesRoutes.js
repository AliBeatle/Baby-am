import express from "express";
import { getAllRecipes, generateRecipe, generateMenu } from '../controllers/RecipesController.js'
import { protectToken } from "../middlewares/protectToken.js";

const router = express.Router();

router.get('/', getAllRecipes);
router.post('/generate', generateRecipe);
router.post('/generateMenu',protectToken, generateMenu);

export default router;