import { Router } from "express";
import {
    getMantenedores,
    getMantenedorById,
    createMantenedor,
    updateMantenedor,
    deleteMantenedor,
} from "../controllers/mantenedorController.js";
import { getMedicosByIdManteiner } from "../controllers/medicoController.js";

const router = Router();

router.get('/mantenedores', getMantenedores);
router.get('/mantenedores/:id', getMantenedorById);
router.post('/mantenedores', createMantenedor);
router.put('/mantenedores/:id', updateMantenedor);
router.delete('/mantenedores/:id', deleteMantenedor);
router.get('/medicosByM/:id',getMedicosByIdManteiner);

export default router;