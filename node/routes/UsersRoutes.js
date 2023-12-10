import express from "express";
import { registrarUsuario, inicioSesionUsuario } from '../controllers/UsersController.js'

const router = express.Router();

router.post('/register', registrarUsuario)
router.post('/login', inicioSesionUsuario)


export default router;