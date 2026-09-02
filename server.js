import "dotenv/config";
import app from "./src/app.js";
import sequelize from "./src/config/dbSequelize.js";
// import moldelUsuario from "./src/models/Usuario.models.js";
// import modelPerfil from "./src/models/Perfil.models.js";

import "./src/models/index.js";

const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.sync(); //force: true, alter: true 
        console.log("Conectados a la base de datos...");
        app.listen(PORT, () => {
            console.log("Servidor escuchando en http://localhost:" + PORT);
        });
    } catch (error) {
        console.error("No fue posible conectarse a la base de datos:", error);
    }
};

main();

