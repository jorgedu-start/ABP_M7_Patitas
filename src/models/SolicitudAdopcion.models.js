import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbSequelize.js";

class SolicitudAdopcion extends Model {}

SolicitudAdopcion.init(
    {
        fecha_solicitud: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        estado: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "Pendiente"
        },
        comentario: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "Solicitudes_Adopcion",
        timestamps: true,
        underscored: true
    }
);

export default SolicitudAdopcion;