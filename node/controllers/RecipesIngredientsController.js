import RecipesIngredientsModel from "../models/RecipesIngredientsModel.js"

export const getAllRecipesIngredients = async (req, res) => {
    try {
        const recipesIngredients = await RecipesIngredientsModel.findAll()
        res.json(recipesIngredients)
    } catch (error) {
        res.json( {message: error.message} )
    }
}