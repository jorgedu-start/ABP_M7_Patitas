import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.query("SELECT NOW()")
    .then((result) => {
        console.log("Conexión con pg exitosa:", result.rows[0]);
    })
    .catch((error) => {
        console.error("Error de conexión con pg:", error.message);
    });

export default pool;