import express from "express";
import * as solicitudAdopcionController from "../controllers/solicitudAdopcion.controller.js";
import validateBody from "../middlewares/validarBody.js";

const router = express.Router();

router.post("/",validateBody, solicitudAdopcionController.crearSolicitud);

router.get("/", solicitudAdopcionController.getAllSolicitudes);

router.get("/:id", solicitudAdopcionController.getSolicitudId);

router.put("/:id",validateBody, solicitudAdopcionController.updateSolicitud);

router.delete("/:id", solicitudAdopcionController.deleteSolicitud);

export default router;