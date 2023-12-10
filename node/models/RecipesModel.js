import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const RecipesModel = db.define(
    'recetas',
    {
        id_Receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        descripcon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false
    }
);

export default RecipesModel;