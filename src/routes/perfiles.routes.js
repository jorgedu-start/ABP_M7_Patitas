import express from "express";
import * as perfilController from "../controllers/perfil.controller.js"
import validateBody from "../middlewares/validarBody.js";

const router = express.Router();

router.post("/",validateBody,perfilController.crearPerfil);
router.get("/:id",perfilController.obtenerPerfilPorId);
router.get("/",perfilController.obtenerPerfil);
router.put("/:id", validateBody, perfilController.actualizarPerfil);
router.delete("/:id",perfilController.eliminarPerfil);

export default router;
