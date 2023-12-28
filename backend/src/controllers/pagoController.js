import { Cita } from "../models/Cita.js";
import { Usuario } from "../models/Usuario.js";
import mercadopago from 'mercadopago';

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

function formatDate(date) {
    return date.toISOString().substring(0,10) + 'T' + date.toLocaleTimeString() + '.000'
        + date.toTimeString().substring(12,15) + ":" + date.toTimeString().substring(15,17);
}

export const getPagoUsuarioAuthenticado = async (req, res) => {
    
    const {idUser,idCita,redirection} = req.body;
    
    try {
        //Obtener usuario authenticado
        const usuario = await Usuario.findByPk(idUser);
        const citaExistente = await Cita.findOne({
            where: {
                UsuarioId: idUser,
                id: idCita,
            }
        });
        console.log(citaExistente);
        //Obtener Carrito de usuario authenticado
        if (usuario) {
            
            
                
                const preference = {
                    items: [
                        {
                           title: "Pago cita",
                           unit_price: parseInt(citaExistente.costo),
                           quantity: 1,
                           currency_id: 'CLP'
                        }
                    
                    ],
                    payer: {
                        "email": usuario.email
                    },
                    back_urls: {
                        "success": `${redirection}`
                        
                    },
                    auto_return: "approved",
                    payment_methods: {
                        "installments": 12
                    },
                    "binary_mode": true,
                    "expires": false
                };

                // Crear Preference
                console.log(preference);
                mercadopago.preferences.create(preference).then(function (response) {
                    console.log(response.body);
                    
                    res.status(201).json({ body: response.body.init_point });
                    
                }).catch(function (error) {
                    console.log(error);
                    console.log(error.message);
                    res.status(500).json({ message: "Error al obtener pago del producto" });
                });
            
        }else{
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al obtener pago del producto" });
    }
}
