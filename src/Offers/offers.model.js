
import { MongoClient } from "mongodb"
const { JW_BT } = process.env

const URI = `mongodb+srv://stejedas:${JW_BT}@cluster0.rj1pa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(URI);
const DATABASE_NAME = 'finalProyect'
const COLLECTION_NAME = 'offerCollection'

// creacion e insercion de la oferta en la base de datos
export const createdOffer = async (offer) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(offer); //insertOne para agragar un elemento a la BBDD
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const retrieveOffertsByToken = async (token) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);
        return await offerts.find({token: token}).toArray()
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const retrieveAllOferts = async () => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);
        return await offerts.find({status: 'PENDDING'}).toArray()
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }

}

export const retrieveOfferById = async (id) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);
        return await offerts.find({idOffer: id}).toArray()
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }

}
export const retrieveOffertsById = async (id) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);
  
        return  await offerts.find({idOffer: id}).toArray()
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const DeleteOfferById = async (id) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);

        const query = { idOffer: id }
        const resp =  await offerts.deleteOne(query)
        
        return resp
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const ChangeOffertById = async (id, values) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);

     
      const token = values.token
     
     
      const resp = await offerts.updateOne({"idOffer": id}, {$set:values}); 
        return resp ?? undefined;

    
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const changeStatusOfferBook = async (id, values) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const offerts = db.collection(COLLECTION_NAME);

        
     
        const resp = await offerts.updateOne({"idOffer": id}, {$set:values}); 
        return resp ?? undefined;

    
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}
