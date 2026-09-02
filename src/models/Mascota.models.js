import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbSequelize.js";

class Mascota extends Model { }

Mascota.init(
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { notEmpty: { msg: "El nombre de la mascota no puede estar vacío." } }
        },
        especie: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: { notEmpty: { msg: "Debe indicar la especie." } }
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "Disponible"
        }
    },
    {
        sequelize,
        tableName: "Mascotas",
        timestamps: true,
        underscored: true
    }
);

export default Mascota;

