import express from "express";
import { validateUser } from "../Auth/auth.middleware.js"
import { loginCtrl, registerCtrl, validateEmailCtrl } from "./auth.controller.js";
import { upload } from "../multer/index.js";

const router = express.Router();


// enpoint par el registro del usuario
router.post('/register', validateUser, registerCtrl);

// enpoint par la validación del email del usuario
router.get('/validate', validateEmailCtrl);

// enpoint par el login del usuario
router.post('/login', loginCtrl);


export default router;