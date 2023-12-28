
import { compareP, encryptP } from "../helpers/handleBcrypt.js";
import { Usuario } from "../models/Usuario.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios." });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario.' });
    }
};

export const createUsuario = async (req, res) => {
    //el usuario no se creara a menos que tenga un rut, email diferente

    try {
        const { rut, nombre, apellido, email, password, img_url, telefono} = req.body;
        const passwordHash = await encryptP(password)

        const newU = await Usuario.create({
            rut,
            nombre,
            apellido,
            email,
            password: passwordHash,
            img_url,
            telefono
        });


        console.log(newU)
        return res.status(201).json({ message: 'OK'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Eliminar el usuario
        await Usuario.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({ message: 'OK'});
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, rut, email, password, img_url, telefono} = req.body;

        const passwordHash = await encryptP(password)


        const usuarioExistente = await Usuario.findOne({
            where: {
                id,
            },
        });
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await Usuario.update({
            nombre,
            apellido,
            rut,
            email,
            password: passwordHash,
            img_url,
            telefono,
        }, {
            where: {
                id,
            },
        });

        return res.status(200).json({ message: 'OK'});
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}




