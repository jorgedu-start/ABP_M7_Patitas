import sequelize from "../config/dbSequelize.js";
import { Usuario, Perfil } from "../models/index.js";

// CREAR USUARIOS
export const crearUsuario = async (req, res) => {
    let t;
    
    try {
        t = await sequelize.transaction();
        let { nombre, email, password, perfil_id  } = req.body;
        if(!nombre || !email || !password) {
            await t.rollback();
            return res.status(400).json({message: "No se proporcionan los campos requeridos, revise la documentación."});
        }
        let usuario = await Usuario.create(
            { nombre, email, password, perfil_id },
            { transaction: t }
        );

        usuario = usuario.toJSON();

        delete usuario.password;

        await t.commit();

        res.status(201).json({message: "Usuario creado con éxito.", usuario});
    } catch (error) {
        await t.rollback();
        console.log(error)
        res.status(500).json({message:"Error al crear el usuario."})
    }
};

//CONSULTAR TODOS LOS USUARIOS

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: {exclude: ["password"]},
            include: {
                model: Perfil,
                attributes: ["id", "nombre", "descripcion"]
            }            
        });
        res.json({usuarios});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

//CONSULTAR USUARIO POR ID

export const getUsuarioId = async (req, res) => {
    try {
        let {id} = req.params;
        const usuario = await Usuario.findByPk(id,{
            attributes: { exclude: ["password"]},
            include: {
                model: Perfil,
                attributes: ["id", "nombre", "descripcion"]
            }
        });
        if(!usuario){
            return res.status(404).json({message: "No existe usuario con id:" + id});
        }

        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// ACTUALIZAR USUARIO

export const updateUsuario = async (req, res) => {
    let t;
    try {
        t = await sequelize.transaction();
        let { nombre, email, password, perfil_id } = req.body;
        let {id} = req.params;
        if(!nombre || !email || !password){
            await t.rollback();
            return res.status(400).json({message: "No se han proporcionados los campos necesarios para su actualización."});
        };    
            await Usuario.update({ nombre, email, password, perfil_id },
            {where: {id}, transaction: t },
        );

       const usuario = await Usuario.findByPk(id,{
        attributes: {exclude: ["password"]},
        transaction: t
       });

       await t.commit();
       res.status(201).json({message: "Usuario actualizado con éxito", usuario});
    } catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// ELIMINAR USUARIO

export const deleteUsuario = async (req, res) => {
    let t;
    try {
        t = await sequelize.transaction();
        let {id} = req.params;
        const usuario = await Usuario.findByPk(id);

        if(!usuario) {
            await t.rollback();
            return res.status(404).json({message: "No existe ningún usuario con ese id:" + id});
        }

        await usuario.destroy();
        
        await t.commit();
        
        res.json({message: `Se ha eliminado correctamente el usuario: ${usuario.nombre}`});
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.status(500).json({message: "Error interno del servidor"});
        
    }
};

