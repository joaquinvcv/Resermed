import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Medico } from "./Medico.js";

export const Mantenedor = sequelize.define('Mantenedor', {
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
//un mantenedor puede tener muchos medicos
Mantenedor.hasMany(Medico, {
    foreingKey: 'id_mantenedor',
    sourceKey: 'id'
})
//muchas medicos pertenecen a un medico
Medico.belongsTo(Mantenedor, {
    foreingKey: 'id_mantenedor',
    targetId: 'id'
})