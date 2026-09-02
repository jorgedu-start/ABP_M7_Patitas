import express from "express";
import usuarioRoutes from "./routes/usuarios.routes.js";
import perfilRoutes from "./routes/perfiles.routes.js";
import mascotasRoutes from "./routes/mascotas.routes.js";
import solicitudAdopcion from "./routes/solicitudes.routes.js";
const app = express();


//MIDDLEWARES GLOBALES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//RUTAS DE CONSUMO
app.use("/usuarios", usuarioRoutes);
app.use("/perfiles",perfilRoutes);
app.use("/mascotas", mascotasRoutes);
app.use("/solicitudes", solicitudAdopcion);

export default app;