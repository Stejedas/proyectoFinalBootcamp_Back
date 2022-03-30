import { retrieveUserInfoByEmail } from "./users.model.js";
const { JWT_SECRET } = process.env


export const getUserInfo = async (req, res) => {
    try {
        console.log('entra aqui')
        const user = await retrieveUserInfoByEmail(req.email);
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}



export const getValidationUser = async (req, res) => {
    try {
        const tokenUser = jwt.verify(res.body.token, JWT_SECRET);

        const user = await retrieveUserInfoByEmail(req.email);
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}