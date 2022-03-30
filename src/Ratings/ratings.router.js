import express from "express";
import { AddRatingsCtrl, GetAllRatesCrtl } from "./ratings.controller.js";

const router = express.Router()

router.post('/add', AddRatingsCtrl)
router.get('/', GetAllRatesCrtl)
export default router;