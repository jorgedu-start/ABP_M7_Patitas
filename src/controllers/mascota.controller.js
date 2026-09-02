import sequelize from "../config/dbSequelize.js";
import { Mascota, FichaMascota, Usuario } from "../models/index.js";

export const crearMascota = async (req, res) => {
    let t;

    try {
        t = await sequelize.transaction();

        const { nombre, especie, edad, sexo, estado, usuario_id, ficha } = req.body;

        if (!nombre || !especie || edad === undefined || !sexo || !usuario_id || !ficha) {
            await t.rollback();
            return res.status(400).json({
                message: "No se proporcionan todos los campos requeridos."
            });
        }

        const mascota = await Mascota.create(
            { nombre, especie, edad, sexo, estado, usuario_id },
            { transaction: t }
        );

        const fichaMascota = await FichaMascota.create(
            {
                vacunado: ficha.vacunado,
                esterilizado: ficha.esterilizado,
                descripcion_salud: ficha.descripcion_salud,
                mascota_id: mascota.id
            },
            { transaction: t }
        );

        await t.commit();

        res.status(201).json({
            message: "Mascota y ficha creadas con éxito.",
            mascota,
            fichaMascota
        });

    } catch (error) {
        if (t) await t.rollback();
        console.log(error);

        res.status(500).json({
            message: "Error al crear la mascota y su ficha."
        });
    }
};

// CONSULTAR MASCOTAS
export const getAllMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.findAll({
            attributes: ["id", "nombre", "especie", "edad", "sexo", "estado"],
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "email"]
                },
                {
                    model: FichaMascota,
                    as: "ficha",
                    attributes: ["id", "vacunado", "esterilizado", "descripcion_salud"]
                }
            ]
        });

        res.json({ mascotas });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al consultar las mascotas."
        });
    }
};

// CONSULTAR MASCOTA POR ID
export const getMascotaId = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await Mascota.findByPk(id, {
            attributes: ["id", "nombre", "especie", "edad", "sexo", "estado"],
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "email"]
                },
                {
                    model: FichaMascota,
                    as: "ficha",
                    attributes: ["id", "vacunado", "esterilizado", "descripcion_salud"]
                }
            ]
        });

        if (!mascota) {
            return res.status(404).json({
                message: "No existe mascota con id: " + id
            });
        }

        res.json({ mascota });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al consultar la mascota."
        });
    }
};

// ACTUALIZAR MASCOTA Y FICHA
export const updateMascota = async (req, res) => {
    let t;

    try {
        t = await sequelize.transaction();

        const { id } = req.params;
        const { nombre, especie, edad, sexo, estado, usuario_id, ficha } = req.body;

        const mascota = await Mascota.findByPk(id, { transaction: t });

        if (!mascota) {
            await t.rollback();
            return res.status(404).json({
                message: "No existe mascota con id: " + id
            });
        }

        await mascota.update(
            { nombre, especie, edad, sexo, estado, usuario_id },
            { transaction: t }
        );

        if (ficha) {
            await FichaMascota.update(
                {
                    vacunado: ficha.vacunado,
                    esterilizado: ficha.esterilizado,
                    descripcion_salud: ficha.descripcion_salud
                },
                {
                    where: { mascota_id: id },
                    transaction: t
                }
            );
        }

        const mascotaActualizada = await Mascota.findByPk(id, {
            attributes: ["id", "nombre", "especie", "edad", "sexo", "estado"],
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nombre", "email"]
                },
                {
                    model: FichaMascota,
                    as: "ficha",
                    attributes: ["id", "vacunado", "esterilizado", "descripcion_salud"]
                }
            ],
            transaction: t
        });

        await t.commit();

        res.json({
            message: "Mascota actualizada con éxito.",
            mascota: mascotaActualizada
        });

    } catch (error) {
        if (t) await t.rollback();
        console.log(error);

        res.status(500).json({
            message: "Error al actualizar la mascota."
        });
    }
};

// ELIMINAR MASCOTA
export const deleteMascota = async (req, res) => {
    let t;

    try {
        t = await sequelize.transaction();
        const { id } = req.params;

        const mascota = await Mascota.findByPk(id, { transaction: t });

        if (!mascota) {
            await t.rollback();
            return res.status(404).json({
                message: "No existe mascota con id: " + id
            });
        }

        const nombre = mascota.nombre;

        await mascota.destroy({ transaction: t });
        await t.commit();

        res.json({
            message: `Mascota ${nombre} eliminada correctamente.`
        });

    } catch (error) {
        if (t) await t.rollback();
        console.log(error);

        res.status(500).json({
            message: "Error al eliminar la mascota."
        });
    }
};