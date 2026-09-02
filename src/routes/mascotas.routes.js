import express from "express";
import * as mascotasController from "../controllers/mascota.controller.js";
import validateBody from "../middlewares/validarBody.js";

const router = express.Router();

//CREAR MASCOTA

router.post("/",validateBody, mascotasController.crearMascota);

router.get("/", mascotasController.getAllMascotas);

router.get("/:id",mascotasController.getMascotaId);

router.put("/:id", validateBody, mascotasController.updateMascota);

router.delete("/:id", mascotasController.deleteMascota);

export default router;