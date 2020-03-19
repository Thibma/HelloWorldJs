const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const util = require('util')
const MongoClient  = require('mongodb').MongoClient
const assert = require('assert')

const app = express()

const dbName = 'chat-bot'
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true }, { useNewUrlParser: true })

try {
    databaseConnect()
}
catch (err) {
    res.send("Connection a la base de donnée échouée", err)
    return
}

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

var port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("Hello World !")
})

app.get('/hello', function(req, res) {
    var nom = req.query.nom
    if (nom == undefined) {
        res.send("Quel est votre nom ?")
    }
    
    else {
        res.send("Bonjour " + nom + " !")
    }
})

app.get('/messages/all', async function(req, res) {
    const db = client.db(dbName)

    const collection = db.collection('messages')

    const messages = await collection.find({}).toArray()
    console.log(messages)
    res.send(messages)
})

app.post('/chat', async function(req, res) {
    var msg = req.body.msg
    if (msg.includes("=")) {
        const [ cle, valeur ] = req.body.msg.split(' = ')
        let valeursExistantes
        try {
            valeursExistantes = await readValuesFromFile()
        }
        catch(err) {
            res.send('error while reading reponses.json', err)
            return
        }

        try {
            await writeFile('reponses.json', JSON.stringify({
                ...valeursExistantes,
                [cle]: valeur
            }))
            res.send("Merci pour cette information !")
        }
        catch(err) {
            console.error("Error while saving reponses.json", err)
            res.send("Il y a eu une erreur dans l\'enregistrement du fichier")
        } 
    }

    else {
        try {
            const data = await readValuesFromFile()
            if (data[msg] != null) {
                const db = client.db(dbName)
                const collection = db.collection('messages')
                let write = await collection.insertMany([{from: 'user', msg: msg}, {from: 'bot', msg: msg + " :" + data[msg]}])
                res.send(msg + " :" + data[msg])
            }
            else {
                res.send("Je ne connais pas " + msg + "...")
            } 
        }
        catch(err) {
            res.send('error while reading reponses.json', err)
        }
    }
})

app.delete('/messages/last', async function(req, res) {
    const db = client.db(dbName)

    const collection = db.collection('messages')

    var message = await collection.find().sort({ $natural: -1 }).limit(2).toArray()
    var notEmpty = message.length != 0
    if (notEmpty) {
        var ok = true
        message.forEach(message => {
            var del = collection.deleteOne(message)
            var ok = ok && del.deleteCount == 1
        })
        res.send(ok ? "Last message deleted" : "Error when delete")
    }
    else {
        res.send("No docuement to delete")
    }
})

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})

async function readValuesFromFile() {
    const reponses = await readFile('reponses.json', { encoding: 'utf8' })
    return JSON.parse(reponses)
}

async function databaseConnect() {
    try {
        await client.connect()
    }
    catch (err) {
        console.log(err.stack)
        return
    }
}