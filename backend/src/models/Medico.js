import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Cita } from "./Cita.js";

export const Medico = sequelize.define('Medico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    rut: {
        type: DataTypes.STRING(12),
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
    },
    especialidad: {
        type: DataTypes.STRING,
    },
    img_url: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.INTEGER,
    },
    direccion: {
        type: DataTypes.STRING,
    }
},
    { timestamps: false }
);
//un medico puede tener muchas citas
Medico.hasMany(Cita, {
    foreingKey: 'id_medico',
    sourceKey: 'id'
})
//muchas citas pertenecen a un medico
Cita.belongsTo(Medico, {
    foreingKey: 'id_medico',
    targetId: 'id'
})
