import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbSequelize.js";

class FichaMascota extends Model {}

FichaMascota.init(
    {
        vacunado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        esterilizado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        descripcion_salud: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "Fichas_Mascotas",
        timestamps: true,
        underscored: true
    }
);

export default FichaMascota;