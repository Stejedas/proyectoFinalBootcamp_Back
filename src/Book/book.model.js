
import { MongoClient } from "mongodb"
const { JW_BT } = process.env

const URI = `mongodb+srv://stejedas:${JW_BT}@cluster0.rj1pa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(URI);
const DATABASE_NAME = 'finalProyect'
const COLLECTION_NAME = 'books'

export const createBook = async (newBook) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(newBook); //insertOne para agragar un elemento a la BBDD
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const retrieveAllBooks = async () => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.find().toArray(); //insertOne para agragar un elemento a la BBDD
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}