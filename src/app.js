import {} from "dotenv/config";
import express from 'express'
import cors from 'cors';
import authRouter from './Auth/auth.router.js';
import userRouter from './Users/users.router.js'
import ratingsRouter from './Ratings/ratings.router.js'
import bookRouter from './Book/book.router.js'
import { validateAuth } from './Auth/auth.middleware.js'
import offerRouter from './Offers/offers.router.js'



const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

// autentificacion y login 
app.get('/ping', (_req, res) => res.send('Pong'));
app.use('/auth', authRouter); // declaramos el router de autenticación
app.use('/users', validateAuth, userRouter); // declaramos el router de autenticación
app.use('/offer', validateAuth, offerRouter)
app.use('/book', validateAuth, bookRouter)
app.use('/ratings',validateAuth, ratingsRouter )
app.use('/static', express.static('public-static'))

// ponemos el servidor a escchar 
app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));