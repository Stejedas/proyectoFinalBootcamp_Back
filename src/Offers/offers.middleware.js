
import jwt from 'jsonwebtoken'
const { JWT_SECRET } = process.env
import { retrieveUserInfoByEmail } from '../Users/users.model.js';
import { retrieveOffertsById } from './offers.model.js';

export const  validateCreateOffer = async (req, res, next) => {
    try{
        const auth = req.header('Authorization'); // me devuelve el valor de la header
        // ¿Que estructura tiene la header? --> Bearer _token_jwt_
        let token = null;
         token = auth.split(' ')[1]; // obtenemos el token
        const payload = jwt.verify(token, JWT_SECRET);
        
        req.email = payload.email
        const user = await retrieveUserInfoByEmail(req.email);

        if(user.type === 'SUPPLIER') next()
        
    } catch(err){
         // el token NO es válido o no hay token
         console.log('error aqui')
         console.error(err);
         res.sendStatus(401);
    }
}

export const  validateDeleteOffer = async (req, res, next) => {
    try{
        const auth = req.header('Authorization'); // me devuelve el valor de la header
        // ¿Que estructura tiene la header? --> Bearer _token_jwt_
        let token = null;
         token = auth.split(' ')[1]; // obtenemos el token
        const payload = jwt.verify(token, JWT_SECRET);
        req.email = payload.email
      
        
        const user = await retrieveUserInfoByEmail(req.email);
        const id = req.params.id
        const verify = await retrieveOffertsById(id)
        if(user.type === 'SUPPLIER' && req.email === verify[0].token && verify[0].status=== 'PENDDING') next()
        
    } catch(err){
         // el token NO es válido o no hay token
         console.log('brooo')
         console.error(err);
         res.sendStatus(401);
    }
}