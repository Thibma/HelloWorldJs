const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

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

app.post('/chat', function(req, res) {
    var msg = req.body.msg
    console.log(msg)
    if (msg == "ville") {
        res.send("Nous sommes à Paris.")
    }

    else if (msg == "meteo") {
        res.send("Il fait beau")
    }

    else if (msg.includes("=")) {
        const [ cle, valeur ] = req.body.msg.split(' = ')
        const valeursExistantes = readValuesFromFile()
        fs.writeFileSync('reponses.json', JSON.stringify({
            ...valeursExistantes,
            [cle]: valeur
        }))

        res.send("Merci pour cette information !")
    }

    else {
        var rawData = fs.readFileSync("reponses.json")
        var data = JSON.parse(rawData)
        if (data[msg] != null) {
            res.send(msg + " :" + data[msg])
        }
        else {
            res.send("Je ne connais pas " + msg + "...")
        }
    }
})

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})

function readValuesFromFile() {
    const reponses = fs.readFileSync('reponses.json', { encoding: 'utf8' });
    const valeursExistantes = JSON.parse(reponses);
    return valeursExistantes;
  }