import { MongoClient } from 'mongodb'
const { JW_BT } = process.env

const URI = `mongodb+srv://stejedas:${JW_BT}@cluster0.rj1pa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(URI);
const DATABASE_NAME = 'finalProyect'
const COLLECTION_NAME = 'usersCollection'

// creacion e insercion del usuario en la base de datos
export const createUser = async (user) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(user); //insertOne para agragar un elemento a la BBDD
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}


// devuelve el usuario sin tener en cuenta el status o null si no existe
export const getUserByEmailNoStatus = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.findOne({ email });
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// actualiza el usuario cambiando su estaso a success
export const validateUser = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            },
        };
        return await users.updateOne({ email }, updateDoc); // actualizacion de la BBDD, tiene esta estructura
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// devuelve el usuario de BBDDD que esté en estado succes y además coincida
// con el email y con password que me mandan. 
export const retrieveSuccessUserByEmailAndPassword = async (email, password) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// esta no se para que sirve realmente o donde se usa mejor dicho
export const retrieveUserInfoByEmail = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email };
        const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await users.findOne(query, options);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

