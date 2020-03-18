const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

async function mongo() {
    // URL de connexion
    const url = 'mongodb://localhost:27017'

    // Nom de la base de donnée
    const dbName = 'nodejs'
    const client = new MongoClient(url)

    try {
        // Connexion au serveur
        await client.connect()
        const db = client.db(dbName)

        const collection = db.collection('dates')

        let r = await db.collection('dates').insertOne({date: new Date()})
        assert.equal(1, r.insertedCount)
    
        const docs = await collection.find({}).toArray()
        console.log(docs)
    }
    catch (err) {
        console.log(err.stack)
    }

    client.close()
}

mongo()