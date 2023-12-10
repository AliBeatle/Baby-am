import RecipesModel from "../models/RecipesModel.js";
import RecipesIngredientsModel from "../models/RecipesIngredientsModel.js";

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipesModel.findAll();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateRecipe = async (req, res) => {

    const { categoryId, excludedIngredients } = req.body;

    // Buscar las recetas que pertenezcan a la categoría deseada
    const recipes = await RecipesModel.findAll({
        where: { category_id: categoryId },
    });


    // Filtrar las recetas que no contengan los ingredientes excluidos
    const filteredRecipes = await Promise.all(
        recipes.map(async (recipe) => {
            const recipeId = recipe.id_Receta;

            // Consultar los ingredientes de la receta actual
            const recipeIngredients = await RecipesIngredientsModel.findAll({
                where: { id_receta: recipeId },
            });

            // Verificar si la receta actual contiene ingredientes excluidos
            const hasExcludedIngredients = recipeIngredients.some(
                (ingredient) => excludedIngredients.includes(ingredient.dataValues.id_ingrediente)
            );

            // Si la receta no tiene ingredientes excluidos, incluirla en los resultados
            if (!hasExcludedIngredients) {
                return recipe;
            }

            return null;
        })
    );

    const result = filteredRecipes.filter((recipe) => recipe !== null);

    if (result.length === 0) {
        res.status(404).json({ message: "No se encontraron recetas que cumplan los criterios" });
    } else {
        res.status(200).json({ result })
    }
};

export const generateMenu = async (req, res) => {

    const { excludedIngredients } = req.body;

    if (!excludedIngredients || excludedIngredients.length === 0) {
        const allRecipes = await RecipesModel.findAll();
        res.status(200).json({ result: allRecipes });
        return;
    }
    // Filtrar las recetas que no contengan los ingredientes excluidos
    const recipes = await RecipesModel.findAll(); 
    const filteredRecipes = await Promise.all(
        recipes.map(async (recipe) => {
            const recipeId = recipe.id_Receta;

            // Consultar los ingredientes de la receta actual
            const recipeIngredients = await RecipesIngredientsModel.findAll({
                where: { id_receta: recipeId },
            });

            const hasExcludedIngredients = recipeIngredients.some(
                (ingredient) => excludedIngredients.includes(ingredient.dataValues.id_ingrediente)
            );

            // Si la receta no tiene ingredientes excluidos, incluirla en los resultados
            if (!hasExcludedIngredients) {
                return recipe;
            }

            return null;
        })
    );

    const result = filteredRecipes.filter((recipe) => recipe !== null);

    if (result.length === 0) {
        res.status(404).json({ message: "No se encontraron recetas que cumplan los criterios" });
    } else {
        res.status(200).json({ result })
    }

};