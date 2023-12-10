import IngredientsModel from '../models/IngredientsModel.js';

//mostrar los ingredientes

export const getAllIngredientes = async (req, res) => {
    try {
        const ingredientes = await IngredientsModel.findAll()
        res.json(ingredientes)
    } catch (error) {
        res.json( {message: error.message} )
    }
}