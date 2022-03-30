import { sendValidationEmail } from "../adapters/email.js";
import { retrieveSuccessUserByEmailAndPassword, getUserByEmailNoStatus, validateUser, createUser } from "../Users/users.model.js";
import { createValidationToken, deleteValidationToken, retrieveValidationToken } from "./auth.model.js";
const {  JWT_SECRET  } = process.env
import jwt from 'jsonwebtoken'
import { encodePassword, generateValidationToken } from "./auth.utils.js";



/**
 * 1. Van a venir los datos de registro en el body. Habrá que validar el body
 * 2. Generar la entidad usuario y guardarla en BBDD
 * 3. Generar un token de validación y guardarlo en BBDD asociado al usuario
 * 4. Enviar un email con la URL de validación
 */
export const registerCtrl = async ( req, res ) => {
    try{
        // devuelve el usuario sin tener en cuenta el status o null si no existe
        const user = await getUserByEmailNoStatus(req.body.email); 
        // si el usuario no existe
        if (user === null){
            req.body.password = encodePassword(req.body.password);
            await createUser({...req.body, status: 'PENDING_VALIDATION'}) // PASO 2
            const token = generateValidationToken();
            await createValidationToken(token, req.body.email) // PASO 4 
           
            sendValidationEmail(req.body.email, `http://localhost:3000/validate?token=${token}`)
            res.sendStatus(201) } else {
            res.sendStatus(409)
        }
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }

}

/**
 * 1. Obtener el token
 * 2. Validar que existe en BBDD y obtener su usuario asociad
 * 3. Eliminar el token de la BBDD
 * 4. Actualizar el usuario cambiando el estado a SUCCESS
 */

 export const validateEmailCtrl = async (req, res) => {
    const {token} = req.query; 
    // paso 1
    const valToken = await retrieveValidationToken(token); // paso 2
    if (valToken !== null) {
        // existe token
        await deleteValidationToken(token); // paso 3
        await validateUser(valToken.user); // paso 4
        res.send(200);
    } else {
        res.sendStatus(404);
    }
}

/**
 * 1. verificar que existe el usuario con su pass y ademas tiene un estado
 *    SUCCESS
 *  a. encriptar la pass del body
 * 2. Generar un token JWT
 * 3. Devolverlo al usuario
 */
 
export const loginCtrl = async ( req, res ) => {
    const { email, password} = req.body;
        // vamos a ver si es valido el usuario y la clave // paso 1
    const user = await retrieveSuccessUserByEmailAndPassword(email, encodePassword(password))
   
    if(user !== null){
        // existe el usuario 
        const token = await jwt.sign({ email: user.email }, JWT_SECRET ) // paso 2
        res.status(201).json({ access_token: token }); // paso 3
        console.log('entrada login')
    } else {
        res.sendStatus(404);
    }
}
