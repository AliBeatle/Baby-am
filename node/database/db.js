import { Sequelize } from 'sequelize';

const db = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: '',
    database: 'babyñam',
    logging: false,
})

export default db;