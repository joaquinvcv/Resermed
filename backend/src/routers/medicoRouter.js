import { Router } from "express";
import {
    getMedicos,
    getMedicoById,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicosLibres,
    updateIdMantenedorMedico,
    updateIdMantenedorNull
} from "../controllers/medicoController.js";

const router = Router();

router.get('/medicos', getMedicos);
router.get('/medicos/:id', getMedicoById);
router.get('/medicosLibres',getMedicosLibres);
router.post('/medicos', createMedico);
router.put('/medicos/:id', updateMedico);
router.put('/medicoIdMant/:idMedico/:idMantenedor',updateIdMantenedorMedico)
router.put('/medicoIdMant/:idMedico/',updateIdMantenedorNull);
router.delete('/medicos/:id', deleteMedico);

export default router;