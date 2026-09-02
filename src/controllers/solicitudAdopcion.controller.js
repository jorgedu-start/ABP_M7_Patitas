import { SolicitudAdopcion, Usuario, Mascota } from "../models/index.js";

// CREAR SOLICITUD DE ADOPCIÓN
export const crearSolicitud = async (req, res) => {
    try {
        const { usuario_id, mascota_id, comentario } = req.body;

        if (!usuario_id || !mascota_id) {
            return res.status(400).json({
                message: "Debe indicar usuario y mascota."
            });
        }

        const solicitud = await SolicitudAdopcion.create({
            usuario_id,
            mascota_id,
            comentario
        });

        res.status(201).json({
            message: "Solicitud de adopción creada con éxito.",
            solicitud
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear la solicitud de adopción."
        });
    }
};

// CONSULTAR SOLICITUDES
export const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await SolicitudAdopcion.findAll({
            attributes: ["id", "fecha_solicitud", "estado", "comentario"],
            include: [
                {
                    model: Usuario,
                    as: "usuario",
                    attributes: ["id", "nombre", "email"]
                },
                {
                    model: Mascota,
                    as: "mascota",
                    attributes: ["id", "nombre", "especie", "estado"]
                }
            ]
        });

        res.json({ solicitudes });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al consultar las solicitudes de adopción."
        });
    }
};

// CONSULTAR SOLICITUD POR ID
export const getSolicitudId = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitud = await SolicitudAdopcion.findByPk(id, {
            attributes: ["id", "fecha_solicitud", "estado", "comentario"],
            include: [
                {
                    model: Usuario,
                    as: "usuario",
                    attributes: ["id", "nombre", "email"]
                },
                {
                    model: Mascota,
                    as: "mascota",
                    attributes: ["id", "nombre", "especie", "estado"]
                }
            ]
        });

        if (!solicitud) {
            return res.status(404).json({
                message: "No existe solicitud con id: " + id
            });
        }

        res.json({ solicitud });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al consultar la solicitud de adopción."
        });
    }
};

// ACTUALIZAR SOLICITUD
export const updateSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, comentario } = req.body;

        const solicitud = await SolicitudAdopcion.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({
                message: "No existe solicitud con id: " + id
            });
        }

        await solicitud.update({ estado, comentario });

        res.json({
            message: "Solicitud actualizada con éxito.",
            solicitud
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al actualizar la solicitud de adopción."
        });
    }
};

// ELIMINAR SOLICITUD
export const deleteSolicitud = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitud = await SolicitudAdopcion.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({
                message: "No existe solicitud con id: " + id
            });
        }

        await solicitud.destroy();

        res.json({
            message: "Solicitud eliminada correctamente."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al eliminar la solicitud de adopción."
        });
    }
};