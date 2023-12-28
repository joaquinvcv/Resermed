import { enviarMailContacto, mailCancelarCita, mailReservarCita } from "../models/mailsClass/Mail.js";


export const enviarMailContac = async (req,res) =>{
    try {
        const {nombre,email,telefono,sobreMi} = req.body;
        enviarMailContacto(nombre,email,telefono,sobreMi);
        res.status(200);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const enviarMailCancelar = async (req,res) =>{
    try {
        const {nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2} = req.body;
        console.log(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2);

        mailCancelarCita(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2);
        res.status(200);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const enviarMailReservar = async (req,res) =>{
    try {
        const {nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2} = req.body;
        console.log(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2);

        mailReservarCita(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2);
        res.status(200);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

