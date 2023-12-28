
import { compareP, encryptP } from "../helpers/handleBcrypt.js";
import { Mantenedor } from "../models/Mantenedor.js";

export const getMantenedores = async (req, res) => {
    try {
        const mantenedores = await Mantenedor.findAll();
        res.status(200).json(mantenedores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mantenedores." });
    }
};

export const getMantenedorById = async (req, res) => {
    try {
        const mantenedor = await Mantenedor.findByPk(req.params.id);
        res.json(mantenedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el mantenedor.' });
    }
};

export const createMantenedor = async (req, res) => {
    //el mantenedor no se creara a menos que tenga un rut, email diferente

    try {
        const { rut, nombre, apellido, email, password, img_url, telefono } = req.body;
        const passwordHash = await encryptP(password)

        const newM = await Mantenedor.create({
            rut,
            nombre,
            apellido,
            email,
            password: passwordHash,
            img_url,
            telefono
        });


        console.log(newM)
        return res.status(201).json({ message: 'OK'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteMantenedor = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el mantenedor existe
        const mantenedorExistente = await Mantenedor.findByPk(id);

        if (!mantenedorExistente) {
            return res.status(404).json({ message: "Mantenedor no encontrado" });
        }

        // Eliminar el mantenedor
        await Mantenedor.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({ message: 'OK'});
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateMantenedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { rut, nombre, apellido, email, password, img_url, telefono } = req.body;
        const passwordHash = await encryptP(password)

        const mantenedorExistente = await Mantenedor.findOne({
            where: {
                id,
            },
        });
        if (!mantenedorExistente) {
            return res.status(404).json({ message: "Mantenedor no encontrado" });
        }

        await Mantenedor.update({
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




