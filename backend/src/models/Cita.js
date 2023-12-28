import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Cita = sequelize.define('Cita', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY
    },
    hora_inicio: {
        type: DataTypes.TIME,
    },
    hora_termino: {
        type: DataTypes.TIME,
    },
    observacion: {
        type: DataTypes.STRING(255)
    },
    asiste: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pagada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    libre: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    costo: {
        type: DataTypes.FLOAT,
    },

},
    { timestamps: false }
);