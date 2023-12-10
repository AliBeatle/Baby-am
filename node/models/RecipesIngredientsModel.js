import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const RecipesIngredientsModel = db.define(
    'recetas_ingredientes',
    {
        id_ingrediente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        timestamps: false
    }
);

export default RecipesIngredientsModel;