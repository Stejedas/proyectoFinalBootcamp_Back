import jwt from 'jsonwebtoken'
import { createdOffer, DeleteOfferById, retrieveOffertsByToken, ChangeOffertById, retrieveAllOferts, retrieveOfferById } from './offers.model.js'
const { JWT_SECRET } = process.env
import { v4 as uuidv4 } from 'uuid';
import { Public } from '../multer/index.js';


export const AddOfferCtrl = async (req, res) => {
    try {
        // Sacamos el usuario que crea la oferta para poder luego diferenciarla



        const img = `${Public}${req.file.filename}`

        const newOffer = {
            "token": req.email,
            "day": req.body.day,
            "hour": req.body.hour,
            "diners": req.body.diners,
            "pUni": req.body.pUni,
            "FirstPlaEsp": req.body.FirstPlaEsp ? req.body.FirstPlaEsp: "",
            "SecondPlaEsp": req.body.SecondPlaEsp ? req.body.SecondPlaEsp: "",
            "CandyPlaEsp": req.body.CandyPlaEsp ? req.body.CandyPlaEsp: "",
            "DrinkPlaEsp": req.body.DrinkPlaEsp ? req.body.DrinkPlaEsp: "",
            "FirstPlaIng": req.body.FirstPlaIng ? req.body.FirstPlaIng: "",
            "SecondPlaIng": req.body.SecondPlaIng ? req.body.SecondPlaIng: "",
            "CandyPlaIng": req.body.CandyPlaIng ? req.body.CandyPlaIng : "",
            "DrinkPlaIng": req.body.DrinkPlaIng ? req.body.DrinkPlaIng : "",
            "status": "PENDDING",
            "idOffer": uuidv4(),
            "file": img? img: "",
            "typeFood": req.body.typeFood ? req.body.typeFood : "estandar",
            "addressRest": req.body.addressRest ? req.body.addressRest: "",
            "nameRest": req.body.nameRest ? req.body.nameRest : "",
            "townRest": req.body.townRest ? req.body.townRest : "",
            "postalRest": req.body.postalRest ? req.body.postalRest : "",
            "lat": req.body.lat ? req.body.lat  : "",
            "lon": req.body.lon ? req.body.lon : ""

        }
        const offer = await createdOffer(newOffer)
        res.json(offer) // devuelvo la info de la oferta

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const GetOffertsByTokenCtrl = async (req, res) => {
    try {
        
        const token = req.params.token
      
        const offerts = await retrieveOffertsByToken(token)
     
        res.json(offerts)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const GetAllCtrl = async (req, res) => {
    try {
       
        const offerts = await retrieveAllOferts()
        res.json(offerts)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const GetOfferByIdCtrl = async (req, res) => {
    try {
        
        const id = req.params.id
       
        const offer = await retrieveOfferById(id)
      
        res.json(offer)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const DeleteOfferCtrl = async (req, res) => {
    try {
        const id = req.params.id
   
        const offers = await DeleteOfferById(id)

        res.json(offers)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const ChangeOfferCtrl = async (req, res) => {
    try {
        const id = req.params.id
   
       
        
        const img = `${Public}${req.file.filename}`

        const newOfert = {
            "day": req.body.day ? req.body.day : "",
            "hour": req.body.hour ? req.body.hour : "",
            "diners": req.body.diners ? req.body.diners : "",
            "pUni": req.body.pUni ? req.body.pUni : "",
            "FirstPlaEsp": req.body.FirstPlaEsp ? req.body.FirstPlaEsp : "",
            "SecondPlaEsp": req.body.SecondPlaEsp ? req.body.SecondPlaEsp : "",
            "CandyPlaEsp": req.body.CandyPlaEsp ? req.body.CandyPlaEsp : "",
            "DrinkPlaEsp": req.body.DrinkPlaEsp ? req.body.DrinkPlaEsp : "",
            "FirstPlaIng": req.body.FirstPlaIng ? req.body.FirstPlaIng : "",
            "SecondPlaIng": req.body.SecondPlaIng ? req.body.SecondPlaIng : "",
            "CandyPlaIng": req.body.CandyPlaIng ? req.body.CandyPlaIng : "",
            "DrinkPlaIng": req.body.DrinkPlaIng ? req.body.DrinkPlaIng : "",
            "img": img ? img: "",
            "typeFood": req.body.typeFood ? req.body.typeFood : ""
            
        }
        const updatedOferts = await ChangeOffertById(id, newOfert)
        res.json(updatedOferts)

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}


