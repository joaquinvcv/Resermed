import { Cita } from "../models/Cita.js";
import { Medico } from "../models/Medico.js";
import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

export const getCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Usuario,

                },
                {
                    model: Medico,
                }
            ]
        });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener citas." });
    }
};

export const getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id);
        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cita.' });
    }
};

export const getCitasById = async (req, res) => {
    let usId = req.params.id;
    try {
        const citasByIdMedico = await Cita.findAll({
            include: [Medico, Usuario],
            where: {
                UsuarioId: usId
            },
            attributes: ['id', 'Medico.id', 'Medico.nombre', 'Medico.apellido', 'Medico.especialidad', 'Medico.img_url', 'fecha', 'hora_inicio', 'hora_termino','Usuario.id' , 'Usuario.nombre', 'Usuario.apellido', 'Usuario.email'],
            order: [['fecha', 'ASC']]
        });
        res.status(200).json(citasByIdMedico)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
}
export const getCitasByIdMedico = async (req, res) => {
    let medId = req.params.id;
    try {
        const citasByIdMedico = await Cita.findAll({
            
            where: {
                MedicoId: medId,
                UsuarioId: {
                    [Op.ne]: null
                }
            },
            order: [['fecha', 'ASC']]
        });
        res.status(200).json(citasByIdMedico)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
}

export const createCita = async (req, res) => {

    try {
        const { fecha, hora_inicio, hora_termino, observacion, asiste, pagada, libre, costo, UsuarioId, MedicoId } = req.body;

        const newC = await Cita.create({
            fecha,
            hora_inicio,
            hora_termino,
            observacion,
            asiste,
            pagada,
            libre,
            costo,
            UsuarioId,
            MedicoId
        });


        console.log(newC)
        return res.status(200).json({ message: "oki :3" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteCita = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la cita existe
        const citaExistente = await Cita.findByPk(id);

        if (!citaExistente) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        // Eliminar la cita
        await Cita.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({ message: "oki :3" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const freeCitasOf = async (req, res) => {
    const {userType, userId} = req.body;

    try {
        let condicion = {};
        let valores = {}

        if(userType === 'usuario'){
            condicion = { UsuarioId: userId};
            valores = {libre: true, UsuarioId: null};

        }else{
            condicion = { MedicoId: userId};
            valores = {libre: true, MedicoId: null};

        }
        const result = await Cita.update(valores, { where: condicion });
        
        const [affectedRowsCount, affectedRows] = result;

        res.status(200).json({
          message: `Liberadas ${affectedRowsCount} cita(s) para usuario con id ${userId}`,
          citas: affectedRows,
        });
    } catch (error) {
        console.error('Error al liberar citas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }


}

export const updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, hora_inicio, hora_termino, observacion, asiste, pagada, libre, costo, UsuarioId, MedicoId } = req.body;

        const citaExistente = await Cita.findOne({
            where: {
                id,
            },
        });
        if (!citaExistente) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        await Cita.update({
            fecha,
            hora_inicio,
            hora_termino,
            observacion,
            asiste,
            pagada,
            libre,
            costo,
            UsuarioId,
            MedicoId

        }, {
            where: {
                id,
            },
        });

        return res.status(200).json({ message: "oki :3" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getCitasOcupadasById = async (req, res) => {

    const { rol, id } = req.params;

    let user;

    try {

        if (rol === "usuario") {
            user = await Cita.findAll({
                where: {
                    UsuarioId: id
                },
                include: [
                    {
                        model: Usuario,

                    },
                    {
                        model: Medico,
                    }
                ]
            })
        } else if (rol === "medico") {
            user = await Cita.findAll({
                where: {
                    UsuarioId: {
                        [Op.not]: null
                    },
                    MedicoId: id
                },
                include: [
                    {
                        model: Usuario,

                    },
                    {
                        model: Medico,
                    }
                ]
            })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const crarCitasSemana = async (req, res) => {
    try {
        const { id } = req.params;
        const { duracion, intervalo, protegido1, protegido2, jornadaI, jornadaT, costo } = req.body;

        if(jornadaI == "" || jornadaT == ""){
            return res.status(500).json({ message: "Error interno del servidor" });
        }

        const d = new Date();
        let day = d.getDay();
        let Inicio = new Date("07/06/2021 " + jornadaI);
        let Termino = new Date("07/06/2021 " + jornadaT);
        let ProtegidoI = new Date("07/06/2021 " + protegido1);
        let ProtegidoT = new Date("07/06/2021 " + protegido2);
        let citasMñn, citasTarde, dif, protec, minMñn, minTarde, jornada, citasDia;

        if(protegido1 != "nada" && protegido2 != "nada"){
            protec = minutesDiff(ProtegidoT, ProtegidoI);
            minMñn = minutesDiff(ProtegidoI, Inicio);
            minTarde = minutesDiff(Termino, ProtegidoT);
        }else{
            jornada = minutesDiff(Termino, Inicio);
        }


        if (parseInt(intervalo) == 0 && protegido1 != "nada") {
            citasMñn = Math.floor(minMñn / parseInt(duracion));
            citasTarde = Math.floor(minTarde / parseInt(duracion));
        } else if(parseInt(intervalo) != 0 && protegido1 != "nada"){
            citasMñn = Math.floor(minMñn / (parseInt(duracion) + parseInt(intervalo)));
            citasTarde = Math.floor(minTarde / (parseInt(duracion) + parseInt(intervalo)));
        } else if (parseInt(intervalo) == 0 && protegido1 == "nada"){
            citasDia = Math.floor(jornada / parseInt(duracion));
        } else if (parseInt(intervalo) != 0 && protegido1 == "nada"){
            citasDia = Math.floor(jornada / (parseInt(duracion) + parseInt(intervalo)));
        }
        var today = new Date();

        if(day == 0){
            today.setDate(today.getDate() + 1);
            day ++;
        }else if (day == 6){
            today.setDate(today.getDate() + 2);
            day +=2;
        }
        while (day != 0 && day != 6) {
            if (parseInt(intervalo) == 0 && protegido1 != "nada") {

                for (let i = 0; i < citasMñn; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }

                dif = minutesDiff(ProtegidoI, Inicio);

                addMinutes(Inicio, dif);

                addMinutes(Inicio, protec)


                for (let i = 0; i < citasTarde; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }

            } else if (parseInt(intervalo) != 0 && protegido1 != "nada"){

                for (let i = 0; i < citasMñn; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();

                    addMinutes(Inicio, parseInt(intervalo));

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }

                dif = minutesDiff(ProtegidoI, Inicio);

                addMinutes(Inicio, dif);

                addMinutes(Inicio, protec)

                for (let i = 0; i < citasTarde; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(intervalo));

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }
            }else if ( parseInt(intervalo) == 0 && protegido1 == "nada"){

                for (let i = 0; i < citasDia; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }

            }else if ( parseInt(intervalo) != 0 && protegido1 == "nada"){

                for (let i = 0; i < citasDia; i++) {
                    let inicio = Inicio.getHours() + ":" + Inicio.getMinutes();
                    addMinutes(Inicio, parseInt(duracion));
                    let termino = Inicio.getHours() + ":" + Inicio.getMinutes();

                    addMinutes(Inicio, parseInt(intervalo));

                    const newCita = await Cita.create({
                        fecha: today.toISOString().slice(0, 10),
                        hora_inicio: inicio,
                        hora_termino: termino,
                        asiste: false,
                        pagada: false,
                        costo: costo,
                        libre: true,
                        MedicoId: id
                    })
                }
            }

            Inicio = new Date("07/06/2021 " + jornadaI);
            Termino = new Date("07/06/2021 " + jornadaT);
            today.setDate(today.getDate() + 1);
            day++;

        }
        return res.status(200).json({ message: "Oki" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateCitaAsistencia = async (req,res) =>{
    const id = req.params.id;
    const updateBool = req.params.valor;
    console.log(updateBool);
    try {
        const cita = await Cita.update({
            asiste: updateBool
        },
        {
            where: {
                id
            }
        }
        );
        return res.status(200).json(cita);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

function addMinutes(date, minutes) {
    return date.setMinutes(date.getMinutes() + minutes);
}
function minutesDiff(dateTimeValue2, dateTimeValue1) {
    var differenceValue = (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
}