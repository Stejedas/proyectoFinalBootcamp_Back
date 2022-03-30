import express from "express";
import { validateUser } from "../Auth/auth.middleware.js"
import { AddBookCrtl, AllBookCrtl } from "./book.controller.js";



const router = express.Router();


router.post('/add', AddBookCrtl);

router.get('/', AllBookCrtl)




export default router;