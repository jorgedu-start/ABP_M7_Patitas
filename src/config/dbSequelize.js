import { Sequelize } from "sequelize";

let database = process.env.DB_NAME;
let username = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let dialect = "postgres";


const sequelize = new Sequelize(database, username,dbPassword, {
    host,
    dialect,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
  }
);

export default sequelize;