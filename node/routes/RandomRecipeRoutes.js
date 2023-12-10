// randomRecipeRoute.js

import express from 'express';
import { Op } from 'sequelize';
import RecipesModel from '../models/RecipesModel.js';
import RecipesIngredientsModel from '../models/RecipesIngredientsModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { excludedIngredients, selectedCategory } = req.body;

    const randomRecipe = await RecipesModel.findOne({
      where: {
        category_id: selectedCategory,
      },
      include: [
        {
          model: RecipesIngredientsModel,
          where: {
            id_ingrediente: {
              [Op.notIn]: excludedIngredients,
            },
          },
        },
      ],
      order: Sequelize.literal('RAND()'), // Orden aleatorio
    });

    res.json(randomRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener la receta aleatoria.' });
  }
});

export default router;
