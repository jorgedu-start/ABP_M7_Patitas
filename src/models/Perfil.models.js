import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbSequelize.js";

class Perfil extends Model { }

Perfil.init(
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: "Debe introducir un nombre de perfil." },
                notEmpty: { msg: "El nombre del perfil no puede estar vacío" }
            }
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "Perfiles",
        timestamps: true,
        underscored: true
    }
)

export default Perfil;