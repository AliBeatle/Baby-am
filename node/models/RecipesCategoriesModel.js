import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const RecipesCategoriesModel = db.define(
    'categoria_recetas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
);

export default RecipesCategoriesModel;