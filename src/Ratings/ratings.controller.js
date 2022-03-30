import { createRate, retrieveAllRatings } from "./ratings.model.js";



export const AddRatingsCtrl = async (req, res) => {
    try{
        const newRate = {...req.body}
        console.log(newRate)
        const ratings = await createRate(newRate)
        res.json(ratings)
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

export const GetAllRatesCrtl = async (req, res) => {
    try{
        const ratings = await retrieveAllRatings()

        res.json(ratings)

    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}