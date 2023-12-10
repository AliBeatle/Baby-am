import RecipesCategoriesModel from "../models/RecipesCategoriesModel.js"

export const getAllRecipesCategories = async (req, res) => {
    try {
        const recipesCategories = await RecipesCategoriesModel.findAll()
        res.json(recipesCategories)
    } catch (error) {
        res.json( {message: error.message} )
    }
}