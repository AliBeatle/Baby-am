import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const IngredientsModel = db.define(
    'ingredientes',
    {
        id_ingrediente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false
    }
);

export default IngredientsModel;