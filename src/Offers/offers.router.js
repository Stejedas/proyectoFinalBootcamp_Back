import express from "express";
import { AddOfferCtrl, DeleteOfferCtrl, GetOffertsByTokenCtrl, ChangeOfferCtrl, GetAllCtrl, GetOfferByIdCtrl } from "./offers.controller.js";
import { validateUser } from "../Users/users.model.js";
import { validateCreateOffer, validateDeleteOffer } from "./offers.middleware.js";
import { upload } from "../multer/index.js";


const router = express.Router();

// Endpoint para añadir ofertas por parte de los proveedores    
router.post('/add', validateCreateOffer, upload.single('file'), AddOfferCtrl)


router.delete('/delete/:id', validateDeleteOffer, DeleteOfferCtrl)

router.patch('/modificate/:id', upload.single('file'), ChangeOfferCtrl  )

router.get('/all', GetAllCtrl)

router.get('/:id', GetOfferByIdCtrl)

router.get('/sup/:token', GetOffertsByTokenCtrl)



export default router;