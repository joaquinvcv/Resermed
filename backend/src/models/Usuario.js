import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Cita } from "./Cita.js";

export const Usuario = sequelize.define('Usuario', {
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
    img_url: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.INTEGER,
    }
},
    { timestamps: false }
);
//un usuario puede tener muchas citas
Usuario.hasMany(Cita, {
    foreingKey: 'id_usuario',
    sourceKey: 'id'
})
//muchas citas pertenecen a un usuario
Cita.belongsTo(Usuario, {
    foreingKey: 'id_usuario',
    targetId: 'id'
})