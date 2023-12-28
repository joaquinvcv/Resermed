import { Router } from "express";
import {
    getPagoUsuarioAuthenticado
} from '../controllers/pagoController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

//el id es de la cita que se quiere pagar
router.post("/pagoUsuario", getPagoUsuarioAuthenticado);

router.get("/success", (req, res) => res.send("Success"));

export default router;