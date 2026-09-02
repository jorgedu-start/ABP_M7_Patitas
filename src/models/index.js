import Usuario from "./Usuario.models.js";
import Perfil from "./Perfil.models.js";
import Mascota from "./Mascota.models.js";
import FichaMascota from "./FichaMascota.models.js";
import SolicitudAdopcion from "./SolicitudAdopcion.models.js";


// PERFIL 1:N USUARIO
Perfil.hasMany(Usuario, {
    foreignKey: { name: "perfil_id", allowNull: true },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});

Usuario.belongsTo(Perfil, {
    foreignKey: { name: "perfil_id", allowNull: true },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});


// USUARIO 1:N MASCOTA
Usuario.hasMany(Mascota, {
    foreignKey: { name: "usuario_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Mascota.belongsTo(Usuario, {
    foreignKey: { name: "usuario_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// MASCOTA 1:1 FICHA MASCOTA
Mascota.hasOne(FichaMascota, {
    as: "ficha",
    foreignKey: { name: "mascota_id", allowNull: false, unique: true },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

FichaMascota.belongsTo(Mascota, {
    as: "mascota",
    foreignKey: { name: "mascota_id", allowNull: false, unique: true },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// USUARIO 1:N SOLICITUD ADOPCIÓN
Usuario.hasMany(SolicitudAdopcion, {
    foreignKey: { name: "usuario_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAdopcion.belongsTo(Usuario, {
    as: "usuario",
    foreignKey: { name: "usuario_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// MASCOTA 1:N SOLICITUD ADOPCIÓN
Mascota.hasMany(SolicitudAdopcion, {
    foreignKey: { name: "mascota_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAdopcion.belongsTo(Mascota, {
    as: "mascota",
    foreignKey: { name: "mascota_id", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


export {
    Usuario,
    Perfil,
    Mascota,
    FichaMascota,
    SolicitudAdopcion
};