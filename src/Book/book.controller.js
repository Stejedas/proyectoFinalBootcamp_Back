import { sendConfirmBook } from "../adapters/emailBook.js"
import { sendRatingEmail } from "../adapters/emailRating.js"
import { changeStatusOfferBook } from "../Offers/offers.model.js"
import { createBook, retrieveAllBooks } from "./book.model.js"




export const AddBookCrtl = async (req, res) => {
    try{
        const change = {
            "status": 'COMPLETE'
        }
        const newBook = {...req.body}
        console.log(req.body.idOffer)
        await changeStatusOfferBook(req.body.idOffer, change)
        const book = await createBook(newBook)
        sendConfirmBook(req.body.emailUser, req.body)
        sendRatingEmail(req.body.emailUser, `https://clinquant-taffy-da618e.netlify.app/rate?nameRest=${req.body.emailRest}&idOffer=${req.body.idOffer}`)
        res.json(book)
    
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}


export const AllBookCrtl = async (req, res) => {
    try{
       
       
        const book = await retrieveAllBooks()

        res.json(book)
    
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}