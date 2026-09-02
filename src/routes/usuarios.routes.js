import express from "express";
import * as usuariosController from "../controllers/usuario.controller.js";
import validateBody from "../middlewares/validarBody.js";

const router = express.Router();

router.post("/",validateBody, usuariosController.crearUsuario);

router.get("/", usuariosController.getAllUsuarios);

router.get("/:id", usuariosController.getUsuarioId);

router.put("/:id",validateBody, usuariosController.updateUsuario);

router.delete("/:id",usuariosController.deleteUsuario);



export default router;
