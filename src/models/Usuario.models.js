import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbSequelize.js";

class Usuario extends Model {}

Usuario.init(
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull:{msg: "Debe introducir un nombre"},
                notEmpty: {msg: "El nombre no puede estar vacío"}
            },
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate:{
                notNull: {msg: "Debe introducir un correo electrónico."},
                notEmpty: {msg: "El correo electrónico no puede estar vacío."},
                isEmail: {msg: "Debe introducir un email válido."},
            },
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe introducir una contraseña.",
                },
                len: {
                    args: [8, 200],
                    msg: "La contraseña debe tener al menos 8 caracteres y un máximo de 200",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "usuario",
        tableName: "Usuarios",
        timestamps: true,
        underscored: true,
    },
);

export default Usuario;
