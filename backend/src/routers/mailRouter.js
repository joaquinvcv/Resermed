import { Router } from "express";
import { enviarMailContac, enviarMailCancelar, enviarMailReservar } from "../controllers/mailController.js";

const router = Router();

router.post('/contacto',enviarMailContac);
router.post('/cancelar', enviarMailCancelar);
router.post('/mailReservar', enviarMailReservar);

export default router;